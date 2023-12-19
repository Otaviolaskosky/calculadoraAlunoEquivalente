import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import { Container, Form, Button, Row, Col,OverlayTrigger, Tooltip } from 'react-bootstrap';
import $ from 'jquery';

function App() {

  document.title = 'CAEMO'; // Set your title here

  const alunosIngressantesRef = useRef();
  const alunosDiplomadosRef = useRef();
  const alunosMatriculadosRef = useRef();
  const anoCriacaoRef = useRef();
  const anoCriacaoBaseCalculoRef = useRef();
  var valorPadraoResultadoAnoCriacao = 'DIGITE O ANO DE CRIAÇÃO DO CURSO';
  const [selectValue, setSelectValue] = useState('');
  const [fatorRetencao, setFatorRetencao] = useState('');
  const [duracao, setDuracao] = useState('');
  const [peso, setPeso] = useState('');
  const [areaSesu, setAreaSesu] = useState('');
  const [anoCriacao, setAnoCriacao] = useState('');
  const [anoCriacaoBaseCalculo, setAnoCriacaoBaseCalculo] = useState('');
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
    // Zera o ano de criação e seu resultado porque quando é mestrado e doutorado a base de calculo do ano de criação muda para 4 ou 8:    
    setAnoCriacao('')
    setResultadoAnoCriacao('')
  }

  function changeAnoCriacaoCurso(event){
    const anoCriacaoCursoAtual = anoCriacaoRef.current.value
    const nAnoCriacaoBaseCalculo = anoCriacaoBaseCalculoRef.current.value
    var valAreaSesu = document.getElementById('areaSesu').value;
    var baseCalculoAnoCriacao = 10;

    if(valAreaSesu == 'ME'){
      baseCalculoAnoCriacao = 4
    }else if(valAreaSesu == 'DO'){
      baseCalculoAnoCriacao = 8
    }

    setAnoCriacao(anoCriacaoCursoAtual)
    setAnoCriacaoBaseCalculo(nAnoCriacaoBaseCalculo)

    const tamanhoAnoCriacaoCursoAtual = anoCriacaoCursoAtual.length
    const tamanhoAnoCriacaoBaseCalculo = nAnoCriacaoBaseCalculo.length
    if(tamanhoAnoCriacaoCursoAtual == 4 && tamanhoAnoCriacaoBaseCalculo == 4){
      const anoCriacaoCursoCalculado = nAnoCriacaoBaseCalculo-anoCriacaoCursoAtual
      if(anoCriacaoCursoCalculado > baseCalculoAnoCriacao){
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
    var resultado = '';
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
    
    var numeroResultadoNoturno = document.getElementById('resultadoNoturno').value;

    if(numeroResultadoNoturno.length > 0){
      numeroResultadoNoturno = numeroResultadoNoturno.replace(',', '.')
      numeroResultadoNoturno = parseFloat(numeroResultadoNoturno)
      numeroResultadoNoturno = numeroResultadoNoturno /100
    }else{
      numeroResultadoNoturno = 0
    }

    var numeroResultadoForaSede = document.getElementById('resultadoForaSede').value;

    if(numeroResultadoForaSede.length > 0){
      numeroResultadoForaSede = numeroResultadoForaSede.replace(',', '.')
      numeroResultadoForaSede = parseFloat(numeroResultadoForaSede)
      numeroResultadoForaSede = numeroResultadoForaSede /100
    }else{
      numeroResultadoForaSede = 0
    }

    var numeroAlunosIngressantes = alunosIngressantesRef.current.value
    var numeroAlunosDiplomados = alunosDiplomadosRef.current.value
    var numeroAlunosMatriculados = alunosMatriculadosRef.current.value

    var valResultadoAnoCriacao = document.getElementById('resultadoAnoCriacao').value;

    var valAreaSesu = document.getElementById('areaSesu').value;

    ////////////////////////////
    //     CONDIÇÕES:
    ////////////////////////////

    /*Para mestrado e doutorado:
      Consolidado - Nº de alunos Diplomados x Duração do curso x Peso do curso
      Novo - Nº de alunos matriculados x Peso do curso*/
  if(valAreaSesu == 'ME' || valAreaSesu == 'DO'){
      
      if(valResultadoAnoCriacao == 'Consolidado'){
        resultado = numeroAlunosDiplomados * numeroDuracao * numeroPeso 
      }else if(valResultadoAnoCriacao == 'Novo'){
        resultado = numeroAlunosMatriculados * numeroPeso
      }

    /*Para quando o nº de alunos ingressantes for menor que o nº de alunos diplomados:
    Nº de alunos Diplomados x (1 + Fator de retenção) x Peso de curso x Duração do curso
    x Bônus noturno x Bônus fora da sede (somente se houver bônus, não multiplica por 0 quando não houver):*/
      }else if(quantidadealunosIngressantes < quantidadealunosDiplomados){
      resultado = quantidadealunosDiplomados
      resultado *=  (1+numeroFatorRetencao)
      resultado *= numeroPeso 
      resultado *= numeroDuracao

      if(numeroResultadoNoturno.length > 0 || numeroResultadoNoturno != 0 ){
        var resultadoNoturno = resultado * numeroResultadoNoturno;
      }else{
        var resultadoNoturno = 0;
      }

      if(numeroResultadoForaSede.length > 0 || numeroResultadoForaSede != 0 ){
        var resultadoForaSede = resultado * numeroResultadoForaSede;
      }else{
        var resultadoForaSede = 0;
      }

      resultado += resultadoNoturno + resultadoForaSede;
      
      /*Para curso consolidado:
      Nº de alunos Diplomados x (1 + Fator de retenção) + (Nº de alunos ingressantes – Número de alunos Diplomados) / 4 x Peso de Curso x Duração do Curso
      x Bônus noturno x Bônus fora da sede (somente se houver bônus, não multiplica por 0 quando não houver)*/
    }else if(valResultadoAnoCriacao == 'Consolidado'){

      resultado = numeroAlunosDiplomados 
      resultado *= (1 + numeroFatorRetencao) 
      resultado += ((numeroAlunosIngressantes - numeroAlunosDiplomados)/4) 
      resultado *= numeroPeso 
      resultado *= numeroDuracao

      if(numeroResultadoNoturno.length > 0 || numeroResultadoNoturno != 0 ){
        var resultadoNoturno = resultado * numeroResultadoNoturno;
      }else{
        var resultadoNoturno = 0;
      }

      if(numeroResultadoForaSede.length > 0 || numeroResultadoForaSede != 0 ){
        var resultadoForaSede = resultado * numeroResultadoForaSede;
      }else{
        var resultadoForaSede = 0;
      }

      resultado += resultadoNoturno + resultadoForaSede;

      /*Para curso novo:
      Nº de alunos Matriculados x Peso do Curso
      x Bônus noturno x Bônus fora da sede (somente se houver bônus, não multiplica por 0 quando não houver)*/
    }else if(valResultadoAnoCriacao == 'Novo'){

      resultado = numeroAlunosMatriculados * numeroPeso

      if(numeroResultadoNoturno.length > 0 || numeroResultadoNoturno != 0 ){
        var resultadoNoturno = resultado * numeroResultadoNoturno;
      }else{
        var resultadoNoturno = 0;
      }

      if(numeroResultadoForaSede.length > 0 || numeroResultadoForaSede != 0 ){
        var resultadoForaSede = resultado * numeroResultadoForaSede;
      }else{
        var resultadoForaSede = 0;
      }

      resultado += resultadoNoturno + resultadoForaSede;

    }

    resultado = resultado.toFixed(2);

    resultado = resultado.toString();

    resultado = resultado.replace('.', ',')

    

    setResultadoFinal(resultado)

  };

  function handleClearFields(event){
    $('#create-course-form')[0].reset();
    setFatorRetencao('');
    setDuracao('');
    setPeso('');
    setAnoCriacao('');
    setAnoCriacaoBaseCalculo('');
    setResultadoAnoCriacao('');
    setResultadoFinal('');
  };

  const years = Array.from({ length: 151 }, (_, index) => 1900 + index);

  const hiddenStyle = {
    display: 'none',
  };

  return (
    <Container className="mt-5">
      <Helmet>
      <link rel="icon" type="image/png" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAD1JREFUWMPt2EsOgCAMQ1HwE5jYAhCJFuM4zCIjIk3IJkEERllxCVGiZTbqyLY7x4YK01ct39jlv5AwXD7fwHrt1u72c3eg1gJ/DLVFRsvU8vgAAAABJRU5ErkJggg==" />      </Helmet>
      <h2 className="text-center mb-4">📟CALCULADORA DO ALUNO EQUIVALENTE DA MATRIZ OCC📟</h2>
      <br></br>
      <Form onSubmit={handleSubmit} id="create-course-form">
        <Row controlId="areaSesu">
          <Col md={6}>
          <Form.Label className="text-center mb-2" >Área Sesu</Form.Label>
          <Form.Control id="areaSesu" as="select" onChange={changeAreaSesu} required>
          <option value="" data-retencao="" data-duracao="" data-peso="">Selecione a Área Sesu</option>
          <option value="A" data-retencao="0,1500" data-duracao="4" data-peso="1,5">A - Artes</option>
          <option value="CA" data-retencao="0,0500" data-duracao="5" data-peso="2,0">CA - Ciências Agrárias</option>
          <option value="CB" data-retencao="0,1250" data-duracao="4" data-peso="2,0">CB - Ciências Biológicas</option>
          <option value="CET" data-retencao="0,1325" data-duracao="4" data-peso="2,0">CET - Ciências Exatas e da Terra</option>
          <option value="CH" data-retencao="0,1000" data-duracao="4" data-peso="1,0">CH - Ciências Humanas</option>
          <option value="CH1" data-retencao="0,1000" data-duracao="5" data-peso="1,0">CH1 - Psicologia</option>
          <option value="CS1" data-retencao="0,0650" data-duracao="6" data-peso="4,5">CS1 - Medicina</option>
          <option value="CS2" data-retencao="0,0650" data-duracao="5" data-peso="4,5">CS2 - Veterinária, Odontologia, Zootecnia</option>
          <option value="CS3" data-retencao="0,0660" data-duracao="5" data-peso="2,0">CS3 - Nutrição, Farmácia</option>
          <option value="CS4" data-retencao="0,0660" data-duracao="5" data-peso="1,5">CS4 - Enfermagem, Fisio, Fono, Ed Física</option>
          <option value="CSA" data-retencao="0,1200" data-duracao="4" data-peso="1,0">CSA - Ciências Sociais Aplicadas</option>
          <option value="CSB" data-retencao="0,1200" data-duracao="5" data-peso="1,0">CSB - Direito</option>
          <option value="ENG" data-retencao="0,0820" data-duracao="5" data-peso="2,0">ENG - Engenharias</option>
          <option value="LL" data-retencao="0,1150" data-duracao="4" data-peso="1,0">LL - Linguística e Letras</option>
          <option value="M" data-retencao="0,1150" data-duracao="4" data-peso="1,5">M - Música</option>
          <option value="TEC" data-retencao="0,0820" data-duracao="3" data-peso="2,0">TEC - Tecnólogos</option>
          <option value="CE1" data-retencao="0,1325" data-duracao="4" data-peso="1,5">CE1 - Ciências Exatas - Mat, Comp, Est</option>
          <option value="CSC" data-retencao="0,1200" data-duracao="4" data-peso="1,5">CSC - Arquitetura/Urbanismo</option>
          <option value="CH2" data-retencao="0,1000" data-duracao="4" data-peso="1,0">CH2 - Formação de Professor</option>
          <option value="ME" data-retencao="0" data-duracao="2" data-peso="2,0">ME - Mestrado</option>
          <option value="DO" data-retencao="0" data-duracao="4" data-peso="2,0">DO - Doutorado</option>

          </Form.Control>
          </Col>
          <Col md={2}>
          <Form.Label>Fator de Retenção</Form.Label>
          <Form.Control id="fatorRetencao" type="text" value={fatorRetencao} onChange={(e) => setFatorRetencao(e.target.value)} placeholder='FATOR DE RETENÇÃO' disabled/>
          </Col>
          <Col md={2}>
          <Form.Label>Duração Média</Form.Label>
          <Form.Control id="duracao" type="text" value={duracao} onChange={(e) => setDuracao(e.target.value)} placeholder='DURAÇÃO' disabled/>
          </Col>
          <Col md={2}>
          <Form.Label>Peso</Form.Label>
          <Form.Control id="peso" type="text" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder='PESO' disabled/>
          </Col>
        </Row>
        <br></br>
        <Row controlId="anoCriacao">
          <Col md={4}>
          <Form.Label>Ano de Criação do Curso</Form.Label>
          {/* <Form.Control type="number" ref={anoCriacaoRef} value={anoCriacao} onChange={changeAnoCriacaoCurso} placeholder='ANO DE CRIAÇÃO DO CURSO'/> */}
          {/* Use the map function to create the dropdown options */}
          <Form.Control as="select" ref={anoCriacaoRef} value={anoCriacao} onChange={changeAnoCriacaoCurso} placeholder='ANO DE CRIAÇÃO DO CURSO'>
            <option value="">Selecione o Ano de Criação do Curso</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Form.Control>
          </Col>
          <Col md={4}>
          <Form.Label>Ano Base de Calculo</Form.Label>
          {/* <Form.Control type="number" ref={anoCriacaoBaseCalculoRef} value={anoCriacaoBaseCalculo} onChange={changeAnoCriacaoCurso} placeholder='ANO BASE DE CALCULO'/> */}
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-ano-base-calculo">
                O ano base de cálculo é o ano que se pretende saber o aluno equivalente.
                Exemplo: o usuário pretende saber o aluno equivalente de determinado
                curso em 2015, então, o ano base de cálculo será 2015.
              </Tooltip>
            }
          >
            <Form.Control as="select" ref={anoCriacaoBaseCalculoRef} value={anoCriacaoBaseCalculo} onChange={changeAnoCriacaoCurso} placeholder='ANO BASE DE CALCULO'>
              <option value="">Selecione o Ano Base de Calculo</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Control>
          </OverlayTrigger>
          </Col>
          <Col md={4}>
            <Form.Label>Resultado Ano de Criação do Curso</Form.Label>
            <Form.Control id="resultadoAnoCriacao" type="text" value={resultadoAnoCriacao} onChange={(e) => setResultadoAnoCriacao(e.target.value)} placeholder={valorPadraoResultadoAnoCriacao} disabled/>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md={4}>
            <Form.Label>Nº de Alunos Ingressantes</Form.Label>
            <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-ano-base-calculo">
                Do ano anterior ao ano base de cálculo.
              </Tooltip>
            }
          >
            <Form.Control  ref={alunosIngressantesRef} type="number" onChange={changeCalculoAlunos} placeholder='Nº DE ALUNOS INGRESSANTES'/>
            </OverlayTrigger>
          </Col>
          <Col md={4}>
            <Form.Label>Nº de Alunos Diplomados</Form.Label>
            <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-ano-base-calculo">
                Do ano anterior ao ano base de cálculo.
              </Tooltip>
            }
          >
            <Form.Control  ref={alunosDiplomadosRef} type="number" onChange={changeCalculoAlunos} placeholder='Nº DE ALUNOS DIPLOMADOS'/>
            </OverlayTrigger>
          </Col>
          <Col md={4}>
            <Form.Label>Nº de Alunos Matriculados</Form.Label>
            <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip-ano-base-calculo">
                Do ano anterior ao ano base de cálculo.
              </Tooltip>
            }
          >
            <Form.Control  type="number" ref={alunosMatriculadosRef} onChange={(e) => setAlunosMatriculados(e.target.value)} placeholder='Nº DE ALUNOS MATRICULADOS' />
            </OverlayTrigger>
          </Col>
          {/* <Col md={3}>
            <Form.Label>Ingressantes - Diplomados</Form.Label>
            <Form.Control style={hiddenStyle} type="text" value={ingressantesMenosDiplomados} onChange={(e) => setIngressantesMenosDiplomados(e.target.value)} placeholder='INGRESSANTES - DIPLOMADOS' disabled/>
          </Col> */}
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
            <Form.Control id="resultadoNoturno" type="text" value={resultadoNoturno} onChange={(e) => setResultadoNoturno(e.target.value)} disabled/>
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
            <Form.Control id="resultadoForaSede" type="text" value={resultadoForaSede} onChange={(e) => setResultadoForaSede(e.target.value)} disabled/>
          </Col>
        </Row>
        <br></br>
        <Row>
        <Col md={1}>
         <Button variant="primary" type="submit">
          Calcular
        </Button>
        </Col>
        <Col md={1}>
        <Button variant="info" onClick={handleClearFields}>
          Limpar
        </Button>
        </Col>
        </Row>
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
