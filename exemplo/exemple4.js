/*
	exemplo 4 :
	mostrando como usar recursividade em funcaoes paralelas ate a propriedade count atinja um numero maior que 2 
	Obs.: para usar as funcoes no f.go , as funcoes prescisao estar nomeadas
*/

var fila = require("queuemonkey");
	//contexto de acordo com a sua necessidade
	var contexto ={
		query:null
	};
	var f = new fila(contexto);
	//alteracao de fluxo
	f.go([funcUno,{paralelo:[paraleloUno, paraleloDos], complete:completo, name:"paralelo1"} ,funcDos, funcTres]);
	function paraleloUno(complete){
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.paraleloUno="OK";
			console.log("function paraleloUno");
			console.log("function paraleloUno Vezes:"+self.query.count);
			console.log(self.query);
			//quando finalizar a funcao chame o complete
			//no complete nao temos controle do fluxo
			complete();
		},2000);
		
	}
	function paraleloDos(complete){
		var self = this;
		setTimeout(function(){
			self.query.paraleloDos="OK";
			console.log("function paraleloDos");
			console.log("function paraleloDos Vezes:"+self.query.count);
			console.log(self.query);
			//quando finalizar a funcao chame o complete
			//no complete nao temos controle do fluxo
			complete();
		},200);
		
	}
	
	function completo(next){
		this.query.count++;
		next();
	}
	
	function funcUno(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		self.query={};
		self.query.count =0;
		setTimeout(function(){
			self.query.funcUno="OK";
			console.log("function Uno");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			//alterado do proximo, sem passar pela funcaoDos
			next();
		},400);
		
	}
	
	function funcDos(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.funcDos="OK";
			console.log("function Dos");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			if(self.query.count > 2)
				next();
			else{
				next("paralelo1");
			}
		},400);
	}
	
	function funcTres(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.funcTres="OK";
			console.log("function Tres");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			next();
		},400);
	}
	
	