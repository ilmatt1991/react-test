import React, {Component} from 'react';

	
class App extends Component {

	constructor() {
		super();
		this.state = {
			newjoke:"",
			myjokeslist: JSON.parse(localStorage.getItem("list"))       /*carico le barzellette salvate in local storage*/
		}
	}
	
	componentDidMount() {            /* Genera barzelletta */
        const url = "https://api.chucknorris.io/jokes/random";

        fetch(url)
            .then(result => result.json())
            .then(result => {
                this.setState({
                    newjoke: result.value 
                })
            });
    }
    render() {
		return (
            <div className="container">
				<h1 className="title"> Test </h1>
				<button onClick={this.generate}> Genera barzelletta</button>
				<p>{this.state.newjoke}</p>
				<button onClick={this.add}> Salva barzelletta</button>
				<hr></hr>
				<h2>Le mie barzellette : </h2>
				<h6> {this.state.myjokeslist.length} barzellette salvate </h6>
				<table>
					<tbody>
						{this.state.myjokeslist.map((item,index) => {
					  return (
					  <div className="joke">
						<th> {item} </th>
						<th> <button className="removebutton" onClick = {this.removejoke.bind(this,index)}>
							Remove
						  </button> </th>
						</div>
					  );
					})}
					</tbody>
				</table>
			</div>
        );
    }
	add = () =>{          										/* aggiunge barzelletta alla mia lista di barzellette */
		var item = this.state.newjoke;
		var myArray = this.state.myjokeslist.slice();           /*creo una copia dell'array*/
		if (!myArray.includes(item) && item!=""){				/* se l'array non contiene la nuova barzelletta allora la aggiungo alla lista*/
			myArray.push(item);									/* altrimenti (se la barzelletta è già presente) non la aggiungo */
		}
		this.setState({myjokeslist: myArray})
		localStorage.setItem("list",JSON.stringify(myArray))
	}
	generate = () =>{       /* richiamo il metodo ComponentDidMount per scaricare una nuova barzelletta */
		const random_joke = this.componentDidMount();
		this.setState({newjoke: random_joke})
	}
	
	removejoke = (index,e) => {     											/* rimuovo una barzelletta dalla mia lista */
		const myjokeslistcopy = Object.assign([],this.state.myjokeslist);     	/*creo una copia dell'oggetto myjokeslist */
		myjokeslistcopy.splice (index,1);                 						/*elimino dall'array il valore relativo all'indice passato come parametro */
		this.setState({
			myjokeslist:myjokeslistcopy                            				/*aggiorno lo stato*/
		})
		localStorage.setItem ("list",[]);										/*"svuoto" l'array salvato in local storage*/
		localStorage.setItem ("list",JSON.stringify(myjokeslistcopy))			/*ricreo il nuovo array in local storage */
	}
	
}


export default App;