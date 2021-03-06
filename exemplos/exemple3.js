/*
	exemplo 3 :
	mostrando como usar funcao paralelas e sua funcao de complete
	Obs.: para usar as funcoes no f.go , as funcoes prescisao estar nomeadas
*/

var fila = require("queuemonkey");
	//contexto de acordo com a sua necessidade
	var contexto ={
		query:null
	};
	var f = new fila(contexto);
	//alteracao de fluxo
	f.go([funcaoUm,{paralelo:[funcaoParalelaUm, funcaoParalelaDois], complete:completo} ,funcaoDois, funcaoTres]);
	function funcaoParalelaUm(complete){
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.funcaoParalelaUm="OK";
			console.log("function funcaoParalelaUm");
			console.log(self.query);
			//quando finalizar a funcao chame o complete
			//no complete nao temos controle do fluxo
			complete();
		},2000);

	}
	function funcaoParalelaDois(complete){
		var self = this;
		setTimeout(function(){
			self.query.funcaoParalelaDois="OK";
			console.log("function funcaoParalelaDois");
			console.log(self.query);
			//quando finalizar a funcao chame o complete
			//no complete nao temos controle do fluxo
			complete();
		},200);

	}

	function completo(next){
		next();
	}

	function funcaoUm(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos

		setTimeout(function(){
			self.query={"funcaoUm":"OK"};
			console.log("function Uno");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			//alterado do proximo, sem passar pela funcaoDos
			next();
		},400);

	}

	function funcaoDois(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.funcaoDois="OK";
			console.log("function Dos");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			next();
		},400);
	}

	function funcaoTres(next){
		//self igual ao this do new fila();
		var self = this;
		//setTimeout, para simular eventos assincronos
		setTimeout(function(){
			self.query.funcaoTres="OK";
			console.log("function Tres");
			console.log(self.query);
			//quando finalizar a funcao chame o next
			next();
		},400);
	}
