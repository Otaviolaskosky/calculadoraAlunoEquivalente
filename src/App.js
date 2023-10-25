import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

function App() {



  document.title = 'CAEMO'; // Set your title here


  const alunosIngressantesRef = useRef();
  const alunosDiplomadosRef = useRef();
  var valorPadraoResultadoAnoCriacao = 'DIGITE O ANO DE CRIAÇÃO DO CURSO';
  const [selectValue, setSelectValue] = useState('');
  const [fatorRetencao, setFatorRetencao] = useState('');
  const [duracao, setDuracao] = useState('');
  const [peso, setPeso] = useState('');
  const [areaSesu, setAreaSesu] = useState('');
  const [anoCriacao, setAnoCriacao] = useState('');
  const [resultadoAnoCriacao, setResultadoAnoCriacao] = useState('');
  const [alunosIngressantes, setAlunosIngressantes] = useState('');
  const [alunosDiplomados, setAlunosDiplomados] = useState('');
  const [alunosMatriculados, setAlunosMatriculados] = useState('');
  const [ingressantesMenosDiplomados, setIngressantesMenosDiplomados] = useState('');
  const [noturno, setNoturno] = useState('');
  const [resultadoNoturno, setResultadoNoturno] = useState('');
  const [foraSede, setForaSede] = useState('');
  const [resultadoForaSede, setResultadoForaSede] = useState('');
  const [resultadoFinal, setResultadoFinal] = useState('');

  

  function changeAreaSesu(event) {

    const selectedOption = event.target.selectedOptions[0];
    const dataRetencaoAtual = selectedOption.getAttribute('data-retencao');
    const dataDuracaoAtual = selectedOption.getAttribute('data-duracao');
    const dataPesoAtual = selectedOption.getAttribute('data-peso');

    setFatorRetencao(dataRetencaoAtual)
    setDuracao(dataDuracaoAtual)
    setPeso(dataPesoAtual)    
  }

  function changeAnoCriacaoCurso(event){
    const anoCriacaoCursoAtual = event.target.value;

    setAnoCriacao(anoCriacaoCursoAtual)

    const tamanhoAnoCriacaoCursoAtual = anoCriacaoCursoAtual.length
    if(tamanhoAnoCriacaoCursoAtual == 4){
      const anoCriacaoCursoCalculado = 2022-anoCriacaoCursoAtual
      if(anoCriacaoCursoCalculado > 10){
        setResultadoAnoCriacao('Consolidado')
      }else{
        setResultadoAnoCriacao('Novo')
      }
      
    }else{
      setResultadoAnoCriacao('')
    }
    
  }

  function changeCalculoAlunos(event){
    var quantidadealunosIngressantes = alunosIngressantesRef.current.value
    var quantidadealunosDiplomados = alunosDiplomadosRef.current.value

    console.log(quantidadealunosIngressantes-quantidadealunosDiplomados)

    if(quantidadealunosIngressantes-quantidadealunosDiplomados == 0){
      setIngressantesMenosDiplomados('')
    }else{
      setIngressantesMenosDiplomados(quantidadealunosIngressantes-quantidadealunosDiplomados)
    }

  }

  function selecaoNutorna(event){
    var noturnoSelecionado = event.target.value;

    if(noturnoSelecionado == 'sim'){
      setResultadoNoturno('15%')
    }else{
      setResultadoNoturno('0')
    }

  }

  function selecaoForaSede(event){
    var foraSedeSelecionado = event.target.value;

    if(foraSedeSelecionado == 'sim'){
      setResultadoForaSede('10%')
    }else{
      setResultadoForaSede('0')
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setResultadoFinal('tesssssste')
    var quantidadealunosIngressantes = parseFloat(alunosIngressantesRef.current.value)
    var quantidadealunosDiplomados = parseFloat(alunosDiplomadosRef.current.value)
    //Capturando resultado de um campo desabilitado

    var numeroFatorRetencao = document.getElementById('fatorRetencao').value;
    numeroFatorRetencao = numeroFatorRetencao.replace(',', '.')
    numeroFatorRetencao = parseFloat(numeroFatorRetencao)
   
    var numeroDuracao = document.getElementById('duracao').value;
    numeroDuracao = numeroDuracao.replace(',', '.')
    numeroDuracao = parseFloat(numeroDuracao)

    var numeroPeso = document.getElementById('peso').value;
    numeroPeso = numeroPeso.replace(',', '.')
    numeroPeso = parseFloat(numeroPeso)

    if(quantidadealunosIngressantes < quantidadealunosDiplomados){
      var resultado = quantidadealunosIngressantes * numeroFatorRetencao * numeroPeso * numeroDuracao
      setResultadoFinal(resultado)
    }


    // Processar os dados aqui
    console.log({
      areaSesu,
      anoCriacao,
      alunosIngressantes,
      alunosDiplomados,
      alunosMatriculados,
      noturno,
      foraSede,
    });

  };

  return (
    <Container className="mt-5">
      <Helmet>
      <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAD1JREFUWMPt2EsOgCAMQ1HwE5jYAhCJFuM4zCIjIk3IJkEERllxCVGiZTbqyLY7x4YK01ct39jlv5AwXD7fwHrt1u72c3eg1gJ/DLVFRsvU8vgAAAABJRU5ErkJggg==" />      </Helmet>
      <h2 className="text-center mb-4">📟CALCULADORA DO ALUNO EQUIVALENTE DA MATRIZ OCC📟</h2>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Row controlId="areaSesu">
          <Col md={6}>
          <Form.Label className="text-center mb-2" >Área Sesu</Form.Label>
          <Form.Control as="select" onChange={changeAreaSesu}>
            <option value="" data-retencao="" data-duracao="" data-peso="">Selecione a Área Sesu</option>
            <option value="A" data-retencao="0,1500" data-duracao="4" data-peso="1,5">Artes</option>
            <option value="CA" data-retencao="0,0500" data-duracao="5" data-peso="2,0">Ciências Agrárias</option>
            <option value="CB" data-retencao="0,1250" data-duracao="4" data-peso="2,0">Ciências Biológicas</option>
            <option value="CET" data-retencao="0,1325" data-duracao="4" data-peso="2,0">Ciências Exatas e da Terra</option>
            <option value="CH" data-retencao="0,1000" data-duracao="4" data-peso="1,0">Ciências Humanas</option>
            <option value="CH1" data-retencao="0,1000" data-duracao="5" data-peso="1,0">Psicologia</option>
            <option value="CS1" data-retencao="0,0650" data-duracao="6" data-peso="4,5">Medicina</option>
            <option value="CS2" data-retencao="0,0650" data-duracao="5" data-peso="4,5">Veterinária, Odontologia, Zootecnia</option>
            <option value="CS3" data-retencao="0,0660" data-duracao="5" data-peso="2,0">Nutrição, Farmácia</option>
            <option value="CS4" data-retencao="0,0660" data-duracao="5" data-peso="1,5">Enfermagem, Fisio, Fono, Ed Física</option>
            <option value="CSA" data-retencao="0,1200" data-duracao="4" data-peso="1,0">Ciências Sociais Aplicadas</option>
            <option value="CSB" data-retencao="0,1200" data-duracao="5" data-peso="1,0">Direito</option>
            <option value="ENG" data-retencao="0,0820" data-duracao="5" data-peso="2,0">Engenharias</option>
            <option value="LL" data-retencao="0,1150" data-duracao="4" data-peso="1,0">Linguística e Letras</option>
            <option value="M" data-retencao="0,1150" data-duracao="4" data-peso="1,5">Música</option>
            <option value="TEC" data-retencao="0,0820" data-duracao="3" data-peso="2,0">Tecnólogos</option>
            <option value="CE1" data-retencao="0,1325" data-duracao="4" data-peso="1,5">Ciências Exatas - Mat, Comp, Est</option>
            <option value="CSC" data-retencao="0,1200" data-duracao="4" data-peso="1,5">Arquitetura/Urbanismo</option>
            <option value="CH2" data-retencao="0,1000" data-duracao="4" data-peso="1,0">Formação de Professor</option>
            <option value="CH2" data-retencao="0,1000" data-duracao="4" data-peso="1,0">Formação de Professor</option>
            <option value="CH2" data-retencao="0" data-duracao="2" data-peso="2,0">Mestrado</option>
            <option value="CH2" data-retencao="0" data-duracao="2" data-peso="2,0">Doutorado</option>
            {/* Adicione mais opções conforme necessário */}
          </Form.Control>
          </Col>
          <Col md={2}>
          <Form.Label>Fator de Retenção</Form.Label>
          <Form.Control id="fatorRetencao" type="text" value={fatorRetencao} onChange={(e) => setFatorRetencao(e.target.value)} placeholder='FATOR DE RETENÇÃO' disabled/>
          </Col>
          <Col md={2}>
          <Form.Label>Duração</Form.Label>
          <Form.Control id="duracao" type="text" value={duracao} onChange={(e) => setDuracao(e.target.value)} placeholder='DURAÇÃO' disabled/>
          </Col>
          <Col md={2}>
          <Form.Label>Peso</Form.Label>
          <Form.Control id="peso" type="text" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder='PESO' disabled/>
          </Col>
        </Row>
        <br></br>
        <Row controlId="anoCriacao">
          <Col md={6}>
          <Form.Label>Ano de Criação do Curso</Form.Label>
          <Form.Control type="text" value={anoCriacao} onChange={changeAnoCriacaoCurso} placeholder='ANO DE CRIAÇÃO DO CURSO'/>
          </Col>
          <Col md={6}>
            <Form.Label>Resultado Ano de Criação do Curso</Form.Label>
            <Form.Control type="text" value={resultadoAnoCriacao} onChange={(e) => setResultadoAnoCriacao(e.target.value)} placeholder={valorPadraoResultadoAnoCriacao} disabled/>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={3}>
            <Form.Label>Nº de Alunos Ingressantes</Form.Label>
            <Form.Control ref={alunosIngressantesRef} type="number" onChange={changeCalculoAlunos} placeholder='Nº DE ALUNOS INGRESSANTES'/>
          </Col>
          <Col md={3}>
            <Form.Label>Nº de Alunos Diplomados</Form.Label>
            <Form.Control ref={alunosDiplomadosRef} type="number" onChange={changeCalculoAlunos} placeholder='Nº DE ALUNOS DIPLOMADOS'/>
          </Col>
          <Col md={3}>
            <Form.Label>Nº de Alunos Matriculados</Form.Label>
            <Form.Control type="number" onChange={(e) => setAlunosMatriculados(e.target.value)} placeholder='Nº DE ALUNOS MATRICULADOS' />
          </Col>
          <Col md={3}>
            <Form.Label>Ingressantes - Diplomados</Form.Label>
            <Form.Control type="text" value={ingressantesMenosDiplomados} onChange={(e) => setIngressantesMenosDiplomados(e.target.value)} placeholder='INGRESSANTES - DIPLOMADOS' disabled/>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={3}>
          <Form.Label>Noturno </Form.Label>
          <Form.Check
            inline
            label="Sim"
            name="noturno"
            type="radio"
            value="sim"
            id="noturno-sim"
            onChange={selecaoNutorna}
          />
          <Form.Check
            inline
            label="Não"
            name="noturno"
            type="radio"
            value="nao"
            id="noturno-nao"
            onChange={selecaoNutorna}
          />
          </Col>
          <Col md={1}>
            <Form.Control type="text" value={resultadoNoturno} onChange={(e) => setResultadoNoturno(e.target.value)} disabled/>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Form.Label>Fora da Sede </Form.Label>
            <Form.Check
              inline
              label="Sim"
              name="foraSede"
              type="radio"
              id="foraSede-sim"
              value="sim"
              onChange={selecaoForaSede}
            />
            <Form.Check
              inline
              label="Não"
              name="foraSede"
              type="radio"
              id="foraSede-nao"
              value="nao"
              onChange={selecaoForaSede}
            />
          </Col>
          <Col md={1}>
            <Form.Control type="text" value={resultadoForaSede} onChange={(e) => setResultadoForaSede(e.target.value)} disabled/>
          </Col>
        </Row>
        <br></br>
         <Button variant="primary" type="submit">
          Calcular
        </Button>
        <br></br>
        <br></br>
        <hr></hr>
        <h4>RESULTADO:</h4>
        <br></br>
        <Row controlId="anoCriacao">
          <Col md={12}>
            <Form.Control type="text" value={resultadoFinal} onChange={(e) => setResultadoFinal(e.target.value)} placeholder="RESULTADO" disabled/>
          </Col>
        </Row>
        <br></br>
        <br></br>
      </Form>

      <footer className="bg-dark text-light">
      <Container>
        <Row>

        </Row>
      </Container>
    </footer>
    </Container>
  );
}

export default App;
