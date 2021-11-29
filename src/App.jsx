// reactstrap components
import {
  Row,
  Col
} from "reactstrap";
import './App.css';

import Table from "./helpers/components/PaginatedTable/components/Table";
import 'bootstrap/dist/css/bootstrap.min.css';
import {newRequest} from "./utils/request.js";
import ErrorScreen from "./helpers/components/ServerError.jsx"
import TopSection from "./helpers/components/TopSection.jsx"
import Sobre from "./helpers/components/Sobre.jsx"
import CardTop from "./helpers/components/CardTop.jsx"
import Footer from "./helpers/components/Footer.jsx"
import {bindAllMethods} from "./utils/component.js";
import React, { Component } from "react";

class App extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            error: false,
            empresas: [],
            equipamentos: [],
            chamados: [],
            topEquipamento: null,
            topEmpresa: null
        }

        bindAllMethods(this);
    }

    componentDidMount(){
        this.getEmpresas()  
        this.getEquipamentos()
        this.getChamados();
        this.getTopEmpresa();
        this.getTopEquipamento();      
    }

    /** Request responsável por pegar todas empresas */
    getEmpresas(){
        var currentComponent = this;

        
        var config = {
            method: 'GET',
            url: '/list-empresas'
        }
        
        newRequest(config).then((r) => {
            if(!r.success){
                currentComponent.setState({
                    error: true,
                    isLoading: false
                });
            }
            else {
                var empresas = [].concat.apply([], r.response.empresas);

                currentComponent.setState({
                    isLoading: false,
                    empresas: empresas
                });
            }
        })
    }

    /** Request responsável por pegar todos equipamentos */
    getEquipamentos(){
        var currentComponent = this;

        var config = {
            method: 'GET',
            url: '/list-equipamentos'
        }
        
        newRequest(config).then((r) => {
            if(!r.success){
                currentComponent.setState({
                    error: true,
                    isLoading: false
                });
            }
            else {
                var equipamentos = [].concat.apply([], r.response.equipamentos);

                currentComponent.setState({
                    isLoading: false,
                    equipamentos: equipamentos
                });
            }
        })
    }

    /** Request responsável por pegar todos chamados */
    getChamados(){
        var currentComponent = this;

        var config = {
            method: 'GET',
            url: '/list-chamados'
        }
        
        newRequest(config).then((r) => {
            if(!r.success){
                currentComponent.setState({
                    error: true,
                    isLoading: false
                });
            }
            else {
                var chamados = [].concat.apply([], r.response.chamados);

                currentComponent.setState({
                    isLoading: false,
                    chamados: chamados
                });
            }
        })
    }

    /** Request responsável por buscar informações na API externa da ArkMeds dev e popular o banco*/
    popularBanco(){
        var currentComponent = this;

        
        var config = {
            method: 'POST',
            url: '/popular-banco'
        }
        
        newRequest(config).then((r) => {
            if(!r.success){
                currentComponent.setState({
                    error: true,
                    isLoading: false,
                    isPopulandoBanco: false
                });
            }
            else {
                currentComponent.setState({
                    isLoading: false,
                    isPopulandoBanco: false
                });
            }
        })
    }

    /** Request responsável por pegar a empresa com mais equipamentos */
    getTopEmpresa(){
        var currentComponent = this;

        var config = {
            method: 'GET',
            url: '/get-empresa-mais-equipamentos'
        }
        
        newRequest(config).then((r) => {
            if(!r.success){
                currentComponent.setState({
                    error: true,
                    isLoading: false
                });
            }
            else {
                currentComponent.setState({
                    topEmpresa: r.response.empresa
                });
            }
        })
    }

    /** Request responsável por pegar o equipamento com mais chamados */
    getTopEquipamento(){
        var currentComponent = this;

        var config = {
            method: 'GET',
            url: '/get-equipamento-mais-chamados'
        }
        
        newRequest(config).then((r) => {
            if(!r.success){
                currentComponent.setState({
                    error: true,
                    isLoading: false
                });
            }
            else {
                currentComponent.setState({
                    topEquipamento: r.response.equipamento
                });
            }
        })
    }

    render(){

        const colsEmpresa = [
            {
                label: "Id",
                accessor: "id"
            },
            {
                label: "Id Ref",
                accessor: "id_ref"
            },
            {
                label: "Tipo",
                accessor: "tipo"
            },
            {
                label: "Nome",
                accessor: "nome"
            },
            {
                label: "CNPJ",
                accessor: "cnpj"
            },
            {
                label: "Equipamentos",
                accessor: "count_equipamentos"
            },
        ]

        const colsEquipamentos = [
            {
                label: "Id",
                accessor: "id"
            },
            {
                label: "Id Ref",
                accessor: "id_ref"
            },
            {
                label: "Tipo",
                accessor: "tipo"
            },
            {
                label: "Fabricante",
                accessor: "fabricante"
            },
            {
                label: "Número de série",
                accessor: "numero_serie"
            },
            {
                label: "ID do Proprietário",
                accessorIsDict: true,
                accessor: "proprietario",
                accessor2: "id"
            },
            {
                label: "Chamados",
                accessor: "count_chamados"
            },
        ]

        const colsChamados = [
            {
                label: "Id",
                accessor: "id"
            },
            {
                label: "Id Ref",
                accessor: "id_ref"
            },
            {
                label: "Numero",
                accessor: "numero"
            },
            {
                label: "Proprietario",
                accessor: "equipamento",
                accessor2: "proprietario",
                accessor3: "nome"
            },
            {
                label: "Equipamento ID",
                accessor: "equipamento",
                accessor2: "id"
            },
            {
                label: "Modelo Equipamento",
                accessor: "equipamento",
                accessor2: "modelo"
            }
        ]

        return( this.state.error ?
            /** Tela de erro */
            <>
                <ErrorScreen/>
            </> : this.state.isLoading ?
            /** Tela de carregamento */
            <>
                <img src={"https://c.tenor.com/28DFFVtvNqYAAAAC/loading.gif"}/>
            </> :
            /** Conteudo Main */
            <>
                <TopSection/>
                <div className="App container">
                    <Sobre/>
                    <div class="row">
                        <div class="col">
                            {this.state.topEmpresa ?
                                <CardTop
                                    title={"Empresa com mais equipamentos"}
                                    subtitle={"Número de equipamentos:"}
                                    id={this.state.topEmpresa.id}
                                    idRef={this.state.topEmpresa.id_ref}
                                    nome={this.state.topEmpresa.nome}
                                    quant={this.state.topEmpresa.count_equipamentos}
                                />
                                :
                                <></>
                            }
                        </div>
                        <div class="col">
                            {this.state.topEquipamento ?
                                <CardTop
                                    title={"Equipamento com mais chamados"}
                                    subtitle={"Número de chamados:"}
                                    id={this.state.topEquipamento.id}
                                    idRef={this.state.topEquipamento.id_ref}
                                    nome={this.state.topEquipamento.modelo}
                                    quant={this.state.topEquipamento.count_chamados}
                                />
                                :
                                <></>
                            }
                        </div>
                    </div>
                    <div className="tabela">
                        <p className="titulo">Tabela das empresas cadastradas</p>
                        <Table data={this.state.empresas} rowsPerPage={4} cols={colsEmpresa}/>
                    </div>
                    <div className="tabela">
                        <p className="titulo">Tabela dos equipamentos cadastrados</p>
                        <Table data={this.state.equipamentos} rowsPerPage={4} cols={colsEquipamentos}/>
                    </div>
                    <div className="tabela">
                        <p className="titulo">Tabela dos chamados cadastrados</p>
                        <Table data={this.state.chamados} rowsPerPage={4} cols={colsChamados}/>
                    </div>
                </div>
                <Footer/>
            </>
        );
    }
}

export default App;