import { Container, Row, Col } from 'react-bootstrap';

const AboutGame = (props) => {
	return (
		<Container id='about-game-container'>
			<Row className=' inner'>
				<Col className='d-flex  flex-column '>
					<Row>
						<Col>
							<header>
								<h1>Cos'è Dungeons & Dragons ?</h1>
							</header>
						</Col>
					</Row>
					<Row>
						<Col>
							<section>
								<p>
									Dungeons & Dragons (D&D) è un gioco di ruolo fantasy creato da Gary Gygax
									e Dave Arneson, pubblicato per la prima volta nel 1974 dalla casa
									editrice TSR (Tactical Studies Rules). Il gioco è nato negli Stati Uniti,
									con le prime edizioni che hanno visto la luce nella città di Lake Geneva,
									Wisconsin.
								</p>
								<p>
									D&D ha rivoluzionato il mondo dei giochi di ruolo introducendo un sistema
									di regole flessibile che consente ai giocatori di creare e interpretare
									personaggi immaginari in un ambiente fantasy. Il gioco si svolge
									principalmente attraverso la narrazione guidata dal Dungeon Master, che
									crea e gestisce il mondo di gioco, compresi i personaggi non giocanti, le
									ambientazioni e le sfide che i giocatori affrontano durante le loro
									avventure.
								</p>
								<p>
									Nel corso degli anni, Dungeons & Dragons ha subito numerose revisioni e
									aggiornamenti, con diverse edizioni che hanno introdotto nuove regole,
									ambientazioni e meccaniche di gioco. Il gioco è diventato un'icona della
									cultura nerd e ha influenzato numerosi altri giochi di ruolo e opere di
									fantasia, tra cui libri, film e videogiochi.
								</p>
							</section>
						</Col>
					</Row>
					<Row>
						<Col>
							<footer id='about'>
								<h3>Something About Us...</h3>
								<p>
									Qui, tra le pagine virtuali del nostro forun, esploriamo mondi infiniti,
									popolati da eroi coraggiosi, malvagi signori delle tenebre e creature
									misteriose. Guidati dalla luce delle candele e dalla saggezza dei nostri
									esperti, viaggiamo attraverso il labirinto delle regole, scoprendo
									segreti nascosti, trucchi del mestiere e avventure straordinarie.
								</p>
								<p>
									Nel calderone delle nostre storie, mescoliamo ingredienti magici come
									articoli illuminanti, guide dettagliate, recensioni incantate e racconti
									epici delle gesta dei nostri compagni di viaggio. Ogni parola scritta è
									una promessa di emozioni forti, di battaglie epiche combattute sulle
									mappe disegnate a mano e di alleanze forgiare intorno a un tavolo carico
									di dadi e di sogni.
								</p>
							</footer>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default AboutGame;
