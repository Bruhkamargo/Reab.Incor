import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Relatorio from '../../Api/Relatorio';

import GraficoTotal from './GraficoTotal';
import GraficoDominios from './GraficoDominios';

import Logo from '../../assets/LogoNome.png'
import './App.css'

function App() {
  const baseUrl = 'https://incor-update.vercel.app';
  // const baseUrl = 'http://192.168.3.50:3001';

  const { id, StrName } = useParams(); // Parametros passados pelo Link

  // Variaveis React
  const [Question01, SetQuestion01] = useState(0)
  const [Question02, SetQuestion02] = useState(0)
  const [Question03, SetQuestion03] = useState(0)
  const [Question04, SetQuestion04] = useState(0)
  const [Question05, SetQuestion05] = useState(0)
  const [CtrlQuestion06, SetCtrlQuestion06] = useState('____')
  const [Question06, SetQuestion06] = useState(0)
  const [CtrlQuestion07, SetCtrlQuestion07] = useState('')
  const [Question07, SetQuestion07] = useState(0)
  const [CtrlQuestion08, SetCtrlQuestion08] = useState('____')
  const [Question08, SetQuestion08] = useState(0)
  const [Question09, SetQuestion09] = useState(0)
  const [Question10, SetQuestion10] = useState(0)
  const [Question11, SetQuestion11] = useState(0)
  const [Question12, SetQuestion12] = useState(0)
  const [Question13, SetQuestion13] = useState(0)
  const [Question14, SetQuestion14] = useState(0)
  const [StrNameAVA, SetStrNameAVA] = useState(StrName)

  const today = new Date();

  // Obtenha o ano, mês e dia
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se for menor que 10
  const day = String(today.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se for menor que 10
  const [StrDate, SetStrDate] = useState(`${year}-${month}-${day}`)

  // Variaveis de Resultados
  const [NumTotal, SetNumTotal] = useState(0)
  const [NumPhysicalActivity, SetNumPhysicalActivity] = useState(0)
  const [NumNutrition, SetNumNutrition] = useState(0)
  const [NumAddictions, SetNumAddictions] = useState(0)
  const [NumSleep, SetNumSleep] = useState(0)
  const [NumStress, SetNumStress] = useState(0)
  const [NumRelationships, SetNumRelationships] = useState(0)

  const [SaveButton, SetSaveButton] = useState(false); // Para permitir salvar 1x o pdf

  /** Use Effect */
  /**Total */
  useEffect(() => {
    let total = Number(Question01) + Number(Question02) + Number(Question03) + Number(Question04) + Number(Question05) + Number(Question06) + Number(Question07) + Number(Question08) + Number(Question09) + Number(Question10) + Number(Question11) + Number(Question12) + Number(Question13) + Number(Question14);
    SetNumTotal(total);
  }, [Question01, Question02, Question03, Question04, Question05, Question06, Question07, Question08, Question09, Question10, Question11, Question12, Question13, Question14]);

  /**Atividade Física */
  useEffect(() => {
    let total = Number(Question01) + Number(Question02) + Number(Question03);
    SetNumPhysicalActivity(total);
  }, [Question01, Question02, Question03]);

  /**Nutrição */
  useEffect(() => {
    let total = Number(Question04) + Number(Question05) + Number(Question06);
    SetNumNutrition(total);
  }, [Question04, Question05, Question06]);

  /**Álcool e Tabaco */
  useEffect(() => {
    let total = Number(Question07) + Number(Question08);
    SetNumAddictions(total);
  }, [Question07, Question08]);

  /**Sono */
  useEffect(() => {
    let total = Number(Question09) + Number(Question10);
    SetNumSleep(total);
  }, [Question09, Question10])

  /**Estresse */
  useEffect(() => {
    let total = Number(Question11) + Number(Question12);
    SetNumStress(total);
  }, [Question11, Question12]);

  /**Relacionamentos */
  useEffect(() => {
    let total = Number(Question13) + Number(Question14);
    SetNumRelationships(total);
  }, [Question13, Question14]);

  /**useEffect para teste */
  /*useEffect(() => {
    console.log(id);
  }, []) <- array vazio faz com que essa função seja chamada ao carregar a pagina
  */

  /*Funções Internas */

  /**
   * @description Função para exportar a imagem dos graficos para o relatorio
   */
  const exportAsImage = async () => {
    let grafico = document.getElementById('Grafico01')
    await html2canvas(grafico).then(
      (canvas) => {
        sessionStorage.setItem('imagem', canvas.toDataURL('image/png'));
      }
    )
    let grafico2 = document.getElementById('Grafico02')
    await html2canvas(grafico2).then(
      (canvas) => {
        sessionStorage.setItem('imagem2', canvas.toDataURL('image/png'));
      }
    )
  };

  const CallRelatorio = async () => {
    await exportAsImage();
    var img1 = sessionStorage.getItem('imagem');
    var img2 = sessionStorage.getItem('imagem2');
    let TotalArray = [NumTotal, NumPhysicalActivity, NumNutrition, NumAddictions, NumSleep, NumStress, NumRelationships,]
    Relatorio(StrNameAVA, StrDate, img1, img2, TotalArray);
  }

  const SaveAssessments = async (e) => {
    e.preventDefault();

    try {
      if (NumTotal == 0) {
        alert('Realize a avaliação');
        return;
      };
      let data = {
        Total: NumTotal,
        PhysicalActivity: NumPhysicalActivity,
        Nutrition: NumNutrition,
        Addictions: NumAddictions,
        Sleep: NumSleep,
        Stress: NumStress,
        Relationships: NumRelationships
      };
      let response = await axios.post(`${baseUrl}/setassessments`, data);
      if ( response.status == 200) {
        SetSaveButton(true);
        CallRelatorio();
      };

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <header id='Home'>
        <span className='SpanLogo'>
          <img src={Logo} alt="" />
        </span>
        <nav>
          <ul className='TopMenu'>
            <li><Link to={'/'}>Início</Link></li>
            <li><a href='#Avaliacao'> Avaliação </a></li>
            <li><a href='#Resultados'> Resultados </a></li>
            <li><a href='#Contato'> Contato </a></li>
          </ul>
        </nav>
      </header>

      <div id='Avaliacao' className='DivBody' >
        <div className='EstiloDeVida'>
          <h2>Questionário de Avaliação do Estilo de Vida para Adultos com Doenças Cardiovasculares</h2>
          <span><h4><span>Instruções:</span> Selecione a alternativa que melhor descreve o seu comportamento ou situação no último mês.</h4></span>

          {/*Atividade Física*/}
          {/*Pergunta 1*/}
          <div className='Card'>
            <h2 style={{ color: "white" }}>Atividade Física</h2>
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Pratico mais de 150 minutos de atividade física moderada a vigorosa por semana.</p>
                <p>Ex.: Andar rapidamente, correr, dançar, nadar, pedalar, entre outras atividade de intensidade equivalente.</p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question01 === 0}
                    onChange={() => { SetQuestion01(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question01 === 1}
                    onChange={() => { SetQuestion01(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question01 === 2}
                    onChange={() => { SetQuestion01(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question01 === 3}
                    onChange={() => { SetQuestion01(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question01 === 4}
                    onChange={() => { SetQuestion01(4) }}
                  />
                </div>
              </div>
            </div>

            {/*Pergunta 2*/}
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Pratico atividades de fortalecimento muscular pelo menos 2 dias na semana.</p>
                <p>Ex.: Musculação, Treinamento Funcional, Pilates, Entre outras atividade equivalentes.</p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question02 === 0}
                    onChange={() => { SetQuestion02(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question02 === 1}
                    onChange={() => { SetQuestion02(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question02 === 2}
                    onChange={() => { SetQuestion02(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question02 === 3}
                    onChange={() => { SetQuestion02(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question02 === 4}
                    onChange={() => { SetQuestion02(4) }}
                  />
                </div>
              </div>
            </div>

            {/*Pergunta 3*/}
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>No dia a dia, procuro ser ativo nos meus momentos de lazer e demais afazeres.</p>
                <p>Ex.: Atividades domésticas, Passeio com cachorro, Deslocamento a pé, escadas, Entre outras atividade equivalentes.</p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question03 === 0}
                    onChange={() => { SetQuestion03(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question03 === 1}
                    onChange={() => { SetQuestion03(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question03 === 2}
                    onChange={() => { SetQuestion03(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question03 === 3}
                    onChange={() => { SetQuestion03(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question03 === 4}
                    onChange={() => { SetQuestion03(4) }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*Nutrição*/}
          {/*Pergunta 4*/}
          <div className='Card'>
            <h2 style={{ color: "white" }}>Nutrição</h2>
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Consumo pelo menos 5 porções* de frutas ou legumes e verduras ao dia.</p>
                <p>*1 porção padrão = aproximadamente 80g ou 1 xícara</p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question04 === 0}
                    onChange={() => { SetQuestion04(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question04 === 1}
                    onChange={() => { SetQuestion04(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question04 === 2}
                    onChange={() => { SetQuestion04(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question04 === 3}
                    onChange={() => { SetQuestion04(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question04 === 4}
                    onChange={() => { SetQuestion04(4) }}
                  />
                </div>
              </div>
            </div>

            {/*Pergunta 5*/}
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Evito consumir <span title='Presunto, Mortadela, Salsicha, Salame...'>carnes processadas </span>, frituras, bebidas adoçadas, molhos e temperos prontos, <span title='Salgadinhos, Bolachas Recheadas'>lanches industrializados</span>.</p>
                <p></p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question05 === 0}
                    onChange={() => { SetQuestion05(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question05 === 1}
                    onChange={() => { SetQuestion05(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question05 === 2}
                    onChange={() => { SetQuestion05(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question05 === 3}
                    onChange={() => { SetQuestion05(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question05 === 4}
                    onChange={() => { SetQuestion05(4) }}
                  />
                </div>
              </div>
            </div>

            {/*Pergunta 6*/}
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Preciso perder ou ganhar <span>{CtrlQuestion06}</span> quilos para me aproximar do peso que considero saudável.</p>
                <p></p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Mais de 8Kg</p>
                  <input
                    type="radio"
                    value='Mais de 8Kg'
                    checked={CtrlQuestion06 === 'Mais de 8Kg'}
                    onChange={() => { SetCtrlQuestion06('Mais de 8Kg'); SetQuestion06(0) }}
                  />
                </div>
                <div>
                  <p>6 - 8 Kg</p>
                  <input
                    type="radio"
                    value='6 - 8 Kg'
                    checked={CtrlQuestion06 === '6 - 8 Kg'}
                    onChange={() => { SetCtrlQuestion06('6 - 8 Kg'); SetQuestion06(1) }}
                  />
                </div>
                <div>
                  <p>4 - 6 Kg</p>
                  <input
                    type="radio"
                    value='4 - 6 Kg'
                    checked={CtrlQuestion06 === '4 - 6 Kg'}
                    onChange={() => { SetCtrlQuestion06('4 - 6 Kg'); SetQuestion06(2) }}
                  />
                </div>
                <div>
                  <p>2 - 4 Kg</p>
                  <input
                    type="radio"
                    value='2 - 4 Kg'
                    checked={CtrlQuestion06 === '2 - 4 Kg'}
                    onChange={() => { SetCtrlQuestion06('2 - 4 Kg'); SetQuestion06(3) }}
                  />
                </div>
                <div>
                  <p>0 - 2 Kg</p>
                  <input
                    type="radio"
                    value='0 - 2 Kg'
                    checked={CtrlQuestion06 === '0 - 2 Kg'}
                    onChange={() => { SetCtrlQuestion06('0 - 2 Kg'); SetQuestion06(4) }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*Álcool e Tabaco*/}
          <div className='Card'>
            <h2 style={{ color: "white" }}>Álcool e Tabaco</h2>

            {/*Pergunta 7*/}
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Eu fumo cigarros, dispositivos eletrônicos com nicotina ou narguilé.</p>
                <p></p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Mais de 10 por dia</p>
                  <input
                    type="radio"
                    value='Mais de 10 por dia'
                    checked={CtrlQuestion07 === 'Mais de 10 por dia'}
                    onChange={() => { SetCtrlQuestion07('Mais de 10 por dia'); SetQuestion07(0) }}
                  />
                </div>
                <div>
                  <p>1 a 10 por dia</p>
                  <input
                    type="radio"
                    value='1 a 10 por dia'
                    checked={CtrlQuestion07 === '1 a 10 por dia'}
                    onChange={() => { SetCtrlQuestion07('1 a 10 por dia'); SetQuestion07(1) }}
                  />
                </div>
                <div>
                  <p>Nenhum nos últimos 6 meses</p>
                  <input
                    type="radio"
                    value='Nenhum nos últimos 6 meses'
                    checked={CtrlQuestion07 === 'Nenhum nos últimos 6 meses'}
                    onChange={() => { SetCtrlQuestion07('Nenhum nos últimos 6 meses'); SetQuestion07(2) }}
                  />
                </div>
                <div>
                  <p>Nenhum no último ano</p>
                  <input
                    type="radio"
                    value='Nenhum no último ano'
                    checked={CtrlQuestion07 === 'Nenhum no último ano'}
                    onChange={() => { SetCtrlQuestion07('Nenhum no último ano'); SetQuestion07(3) }}
                  />
                </div>
                <div>
                  <p>Nenhum nos últimos 5 anos ou mais</p>
                  <input
                    type="radio"
                    value='Nenhum nos últimos 5 anos ou mais'
                    checked={CtrlQuestion07 === 'Nenhum nos últimos 5 anos ou mais'}
                    onChange={() => { SetCtrlQuestion07('Nenhum nos últimos 5 anos ou mais'); SetQuestion07(4) }}
                  />
                </div>
              </div>
            </div>

            {/*Pergunta 8*/}
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>A minha ingestão média por semana de álcool é: <span>{CtrlQuestion08}</span> doses.</p>
                <p>Ex.: 1 dose = 1 lata de cerveja ou 1 taça de vinho (142ml) ou 1 dose de destilado (42ml).</p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Mais de 20</p>
                  <input
                    type="radio"
                    value='Mais de 20'
                    checked={CtrlQuestion08 === 'Mais de 20'}
                    onChange={() => { SetCtrlQuestion08('Mais de 20'); SetQuestion08(0) }}
                  />
                </div>
                <div>
                  <p>13 - 20</p>
                  <input
                    type="radio"
                    value='13 - 20'
                    checked={CtrlQuestion08 === '13 - 20'}
                    onChange={() => { SetCtrlQuestion08('13 - 20'); SetQuestion08(1) }}
                  />
                </div>
                <div>
                  <p>11 - 12</p>
                  <input
                    type="radio"
                    value='11 - 12'
                    checked={CtrlQuestion08 === '11 - 12'}
                    onChange={() => { SetCtrlQuestion08('11 - 12'); SetQuestion08(2) }}
                  />
                </div>
                <div>
                  <p>8 - 10</p>
                  <input
                    type="radio"
                    value='8 - 10'
                    checked={CtrlQuestion08 === '8 - 10'}
                    onChange={() => { SetCtrlQuestion08('8 - 10'); SetQuestion08(3) }}
                  />
                </div>
                <div>
                  <p>0 - 7</p>
                  <input
                    type="radio"
                    value='0 - 7'
                    checked={CtrlQuestion08 === '0 - 7'}
                    onChange={() => { SetCtrlQuestion08('0 - 7'); SetQuestion08(4) }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*Sono*/}
          {/*Pergunta 9*/}
          <div className='Card'>
            <h2 style={{ color: "white" }}>Sono</h2>
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Durmo bem e me sinto descansado.</p>
                <p> </p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question09 === 0}
                    onChange={() => { SetQuestion09(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question09 === 1}
                    onChange={() => { SetQuestion09(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question09 === 2}
                    onChange={() => { SetQuestion09(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question09 === 3}
                    onChange={() => { SetQuestion09(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question09 === 4}
                    onChange={() => { SetQuestion09(4) }}
                  />
                </div>
              </div>
            </div>

            {/*Pergunta 10*/}
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Durmo bem entre 7 e 9 horas por noite.</p>
                <p> </p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question10 === 0}
                    onChange={() => { SetQuestion10(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question10 === 1}
                    onChange={() => { SetQuestion10(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question10 === 2}
                    onChange={() => { SetQuestion10(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question10 === 3}
                    onChange={() => { SetQuestion10(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question10 === 4}
                    onChange={() => { SetQuestion10(4) }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*Estresse*/}
          {/*Pergunta 11*/}
          <div className='Card'>
            <h2 style={{ color: "white" }}>Estresse</h2>
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Reservo ao menos 5 minutos todo dia para relaxar.</p>
                <p>Ex.: Ouvir música, respiração lenta, meditação, oração, Entre outras atividade equivalentes.</p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question11 === 0}
                    onChange={() => { SetQuestion11(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question11 === 1}
                    onChange={() => { SetQuestion11(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question11 === 2}
                    onChange={() => { SetQuestion11(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question11 === 3}
                    onChange={() => { SetQuestion11(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question11 === 4}
                    onChange={() => { SetQuestion11(4) }}
                  />
                </div>
              </div>
            </div>

            {/*Pergunta 12*/}
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Consigo equilibrar meu tempo de trabalho com o de lazer</p>
                <p> </p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question12 === 0}
                    onChange={() => { SetQuestion12(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question12 === 1}
                    onChange={() => { SetQuestion12(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question12 === 2}
                    onChange={() => { SetQuestion12(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question12 === 3}
                    onChange={() => { SetQuestion12(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question12 === 4}
                    onChange={() => { SetQuestion12(4) }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*Relacionamentos*/}
          {/*Pergunta 13*/}
          <div className='Card'>
            <h2 style={{ color: "white" }}>Relacionamentos</h2>
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Procuro cultivar amizades e estou satisfeito com meus relacionamentos.</p>
                <p> </p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question13 === 0}
                    onChange={() => { SetQuestion13(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question13 === 1}
                    onChange={() => { SetQuestion13(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question13 === 2}
                    onChange={() => { SetQuestion13(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question13 === 3}
                    onChange={() => { SetQuestion13(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question13 === 4}
                    onChange={() => { SetQuestion13(4) }}
                  />
                </div>
              </div>
            </div>

            {/*Pergunta 14*/}
            <div className='Dominios'>
              <div className='Pergunta'>
                <p>Meu lazer inclui reunião com amigos, atividades em grupos, participações em associações ou comunidades religiosas ou espirituais, entre outras atividades equivalentes.</p>
                <p> </p>
              </div>

              <div className='Escala'>
                <div>
                  <p>Nunca</p>
                  <input
                    type="radio"
                    value={0}
                    checked={Question14 === 0}
                    onChange={() => { SetQuestion14(0) }}
                  />
                </div>
                <div>
                  <p> Raramente</p>
                  <input
                    type="radio"
                    value={1}
                    checked={Question14 === 1}
                    onChange={() => { SetQuestion14(1) }}
                  />
                </div>
                <div>
                  <p>Algumas Vezes</p>
                  <input
                    type="radio"
                    value={2}
                    checked={Question14 === 2}
                    onChange={() => { SetQuestion14(2) }}
                  />
                </div>
                <div>
                  <p>Frequentemente</p>
                  <input
                    type="radio"
                    value={3}
                    checked={Question14 === 3}
                    onChange={() => { SetQuestion14(3) }}
                  />
                </div>
                <div>
                  <p>Sempre</p>
                  <input
                    type="radio"
                    value={4}
                    checked={Question14 === 4}
                    onChange={() => { SetQuestion14(4) }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div id='Resultados'>
          <div className='Card'>
            <h2 style={{ color: "white" }}>Resultados</h2>
            <span className='SpanCard'>
              <div className='DivResults'>
                <span>
                  <p>Nome:</p>
                  <input type="text" value={StrNameAVA} onChange={(e) => { SetStrNameAVA(e.target.value) }} className='ResultTextInput' />
                </span>
                <span>
                  <p>Data:</p>
                  <input type="date" value={StrDate} onChange={(e) => { SetStrDate(e.target.value) }} className='ResultTextInput' />
                </span>
                <span>
                  {/* <button className={SaveButton ? 'SaveButtonDisable' : 'SaveButton'} disabled={SaveButton} onClick={() => { CallRelatorio(); SetSaveButton(true); }}>Salvar</button> */}
                  <button className={SaveButton ? 'SaveButtonDisable' : 'SaveButton'} disabled={SaveButton} onClick={(e) => { SaveAssessments(e); }}>Salvar</button>
                </span>
              </div>

              <div className='DivResults'>
                <div className='Pontos'>
                  <h3>Estilo de Vida</h3>
                  <p>Máximo: 56</p>
                  <p>Paciente: <span>{NumTotal}</span></p>
                </div>
                <div id='Grafico01' className='Graficos'>
                  <GraficoTotal NumTotal={NumTotal} />
                </div>
              </div>

              <div className='DivResults'>
                <div className='Pontos'>
                  <h3>Pontuação</h3>
                  <p>Atividade Física: <span>{NumPhysicalActivity}</span>/12</p>
                  <p>Nutrição: <span>{NumNutrition}</span>/12</p>
                  <p>Álcool e Tabaco: <span>{NumAddictions}</span>/8</p>
                  <p>Sono: <span>{NumSleep}</span>/8</p>
                  <p>Estresse: <span>{NumStress}</span>/8</p>
                  <p>Relacionamentos: <span>{NumRelationships}</span>/8</p>
                </div>

                <div id='Grafico02' className='Graficos'>
                  <GraficoDominios ArrayPrams={[NumPhysicalActivity, NumNutrition, NumAddictions, NumSleep, NumStress, NumRelationships]} />
                </div>

              </div>
            </span>
          </div>
        </div>

      </div>

      <footer id='Contato'>
        <div className="frase">
          <p>O essencial é invisível aos olhos.</p>
          <p>Antoine de Saint-Exupéry</p>
        </div>

        <div className="social">
          <a href="https://www.instagram.com/reab.incor_update/"> <i className="fab fa-instagram"></i> </a>
          <a href="https://github.com/Bruhkamargo"> <i className="fab fa-github"></i> </a>
          <a href="https://wa.me/5549998193608"> <i className="fab fa-whatsapp"></i> </a>
        </div>
        <p>Copyright By <a href='https://bruhkamargo.github.io/HealthTec'><span className='Health'>Health</span>&<span className='Tec'>Tec</span></a></p>
      </footer>
    </>
  )
}

export default App