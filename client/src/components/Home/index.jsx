import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardImg, CardBody, CardDeck } from 'reactstrap';

const CardDiv = (props) => {
    return (
        <CardDeck>
          <Card>
            <CardImg top width="100%" src="https://media-cdn.sygictraveldata.com/media/800x600/612664395a40232133447d33247d383335393439323831" alt="Card image cap" />
            <CardBody>
                <p className="lead">Elementos de Evaluación</p>
                <hr className="my-2" />
                <p>En esta sección podrá ver y editar la lista de alumnos, información de los alumnos, materias y términos de evaluación.</p>
              <Button href="/Elements" >Entrar</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src="https://media-cdn.sygictraveldata.com/media/800x600/612664395a40232133447d33247d383335393439323831" alt="Card image cap" />
            <CardBody>
                <p className="lead">Evaluación de Término por Materia</p>
                <hr className="my-2" />
                <p>En esta sección podrá ver cada rubro que compone la calificación de un término de ciclo escolar. También podrá ver y editar las calificaciones de los alumnos en cada uno de los rubros. La evaluación es por término y materia, usted podrá navegar entre los distintos términos y materias disponibles en el curso.</p>
              <Button href="/Grading" >Entrar</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src="https://media-cdn.sygictraveldata.com/media/800x600/612664395a40232133447d33247d383335393439323831" alt="Card image cap" />
            <CardBody>
                <p className="lead">Reportes y Estadísticas Generales</p>
                <hr className="my-2" />
                <p >En esta sección podrá ver reportes y estadísticas sobre el desempeño de los alumnos. Encontrará los reportes principales como la tabla de promedios generales y más.</p>
              <Button>Entrar</Button>
            </CardBody>
          </Card>
        </CardDeck>
      );
};

const Home = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3" style={{ textAlign: "center" }}>Sistema de Evaluación para Primaria</h1>
        <hr className="my-2" />
        <CardDiv/>
        <hr className="my-2" />
        <p>You can find the whole code of this web application on its Github repository by clicking the link below</p>
        <p className="lead">
            <Button color="primary" href="https://github.com/ArthArenas/ClassManager">See Github Repo</Button>
        </p>
      </Jumbotron>
      
    </div>
  );
};

export default Home;