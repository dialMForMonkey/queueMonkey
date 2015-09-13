var Fila = function (context, timeout){
	
	this.timeout = timeout;
	if(context){
		this.addContext(context);
	}
	
};
Fila.prototype.addContext = function(json){
	var self = this, 
		keys = Object.getOwnPropertyNames(json);
	for (var i = 0;  i < keys.length; i++) {
		self[keys[i]] = json[keys[i]];
	}
};
Fila.prototype.resetSelf = function(){
	delete this ;
};
Fila.prototype.go = function (array){
	
	var self = this,
		arrayCache = array,
		objName = getArrayName(array),
		i =0,
		exec = function(x){
			
			i = objName[x] || x || i;

			if(arrayCache[i]){
				var aux = arrayCache[i];
				i++;
				if(checkeTypeOf(aux).isObject()){
						if(aux.paralelo)
							controlParallel(aux);
						else if(aux.fluxo)
							aux.fluxo.call(self, controlFluxo);
					}
				
				else
					aux.call(self, exec);
				
			} else{
				self.resetSelf();
			}
	},
	controlFluxo = function(proxFluxo){
		var index = (i -1),
			obj = arrayCache[index][proxFluxo],
			nameFunction = (function(){
			if(checkeTypeOf(obj).isFunction()){
				return	obj.name ;
			}
			return new Error("Fluxo nao encontrado");
		})();
	
		exec(nameFunction);
	},
	controlParallel = function(aux){
		var obj 	  = aux,
			arrayFunc = obj.paralelo,
			lengthArray = arrayFunc.length,
			count	  = function(){
				lengthArray--;
				if(!lengthArray){
					if(obj.complete){
						obj.complete.call(self,exec);
					}
					else{
						exec();
					}
				}
			};
		
		for(var a = lengthArray -1 ; a > -1 ; a-- ){
			
			arrayFunc[a].call(self, count);
		}
	};
	exec();
};
function checkeTypeOf(param){
	return {
		isArray : function(){
			return Object.prototype.toString.call(param) === "[object Array]";
		},
		isObject : function(){
			return Object.prototype.toString.call(param) === "[object Object]";

		},
		isFunction : function(){
			return Object.prototype.toString.call(param) === "[object Function]";

		}
	}
}


function getArrayName(array){
	var objNamePos = {};
	for (var a =0, max = array.length; a < max ; a++) {
		if(array[a].name)
			objNamePos[array[a].name ] = a;
		else if(array[a].nome){
			objNamePos[array[a].nome ] = a;
		}
		else 
			objNamePos[a] = a;
	};
	return objNamePos;
};

module.exports = Fila;