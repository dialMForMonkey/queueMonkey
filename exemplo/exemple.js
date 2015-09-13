/*
	exemplo 1 :
	mostrando o compartilhamento do contexto(this) 
	da funcao fila, para as outras funcoes do f.go
	
	Obs.: para usar as funcoes no f.go , as funcoes prescisao estar nomeadas
*/

var fila = require("queuemonkey");
	var contexto ={
		query:null
	};
	var f = new fila(contexto);
	f.go([funcUno, funcDos, funcTres]);
	
	function funcUno(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query={"funcUno":"OK"};
			//quando finalizar a funcao chame o next
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
			next();
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
	
	