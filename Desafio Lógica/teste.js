
function QuestaoUm(nums, alvo){
    return new Promise( resolve => {
        nums.forEach( (A, indexA) => {
            nums.forEach( (B, indexB) => {
                if( A + B == alvo) resolve([indexA, indexB])
            })  
        })
        resolve("Sem correspondencia")
    })
}

function QuestaoDois( brackets ){
    brackets = brackets.split("")
    const relacao = { "{":"}", "(":")", "[":"]" }
    for( let p = 0, f = brackets.length-1; p < brackets.length/2; p++, f--){
        if( relacao[brackets[p]] != brackets[f] ) return "NÃO"
    }
    return "SIM"
}

function QuestaoTres( historico ){
    let Transacao = {
        compra: {
            valor: 1^40,
            dia: null
        },
        venda: {
            valor: 0,
            dia: null
        }
    }
    historico.forEach( ( valor, dia ) => {
        if( valor < Transacao.compra.valor ) Transacao.compra = { valor, dia: dia+1 }
    })
    for( let dia = Transacao.compra.dia; dia < historico.length; dia++ ){
        const valor = historico[dia]
        if( valor > Transacao.venda.valor ) Transacao.venda = { valor, dia: dia+1 }
    }

    if( !Transacao.venda.dia || !Transacao.venda.valor ) 
        return '0 (Nesse caso nenhuma transação deve ser feita, lucro máximo igual a 0 )'
    else {
        const lucroMax = Transacao.venda.valor - Transacao.compra.valor
        return `${lucroMax} ` +
            `(Comprou no dia ${Transacao.compra.dia} (preço igual a ${Transacao.compra.valor}) e ` +
            `vendeu no dia ${Transacao.venda.dia} (preço igual a ${Transacao.venda.valor}), ` +
            `lucro foi de ${Transacao.venda.valor} – ${Transacao.compra.valor} = ${lucroMax}`
    }

}

function QuestaoQuatro( elevacao ) {
    const PegarAltura = () => {
        let max = 0;
        for(let index = 0; index < elevacao.length; index++){
            if( max < elevacao[index] ) max = elevacao[index];
        }
        return max
    };
    const MontarGrade = (altura) => {
        let result = []
        for( let y = 1; y <= altura; y++){            
            result.push(
                elevacao.reduce( (acc, item) => {
                    acc.push( item >= y ? 1 : 0 )
                    return acc
                }, [])
            ) 
        }
        return result.reverse()
    };
    const ExisteOcorrenciaDeParedeADireita = ( item, indiceInicial ) => {
        if( item.length == indiceInicial ) return false
        for(let linhaIndex = indiceInicial; linhaIndex < item.length; linhaIndex++){
            if( item[linhaIndex] == 1 ) return true
        }
        return false
    };
    const ExisteOcorrenciaDeParedeAEsquerda = ( item, indiceInicial ) => {
        if( !indiceInicial ) return false
        for(let linhaIndex = indiceInicial; linhaIndex >= 0; linhaIndex--){
            if( item[linhaIndex] == 1 ) return true
        }
        return false
    };
    const SimularReservatorio = ( grade ) => {
        return grade.reduce( (acc, item, itemGrade) => {
            acc.push( 
                item.reduce( (itemAcc, ponto, indexPonto) => {
                    if( ponto == 0 ){
                        const anterior = ExisteOcorrenciaDeParedeAEsquerda( item, indexPonto )
                        const proximo = ExisteOcorrenciaDeParedeADireita( item, indexPonto )
                        itemAcc.push( anterior && proximo ? 2 : ponto )
                    }else itemAcc.push(ponto)
                    return itemAcc
                }, []) 
            )
            return acc
        }, [])
    };
    const ContarReservatorios = ( grade ) => {
        return grade.reduce( ( acc, item ) => {
            return acc + item.filter( i => i == 2).length
        }, 0)
    };

    const altura = PegarAltura()
    let grade = MontarGrade( altura )
    let gradeSimulada = SimularReservatorio( grade )

    // console.log(gradeSimulada)

    return ContarReservatorios(gradeSimulada)
}


(async () => {
    console.log( "Resposta questão Um:" )
    console.log( [1,1,2,3,5,8,13], 21, await QuestaoUm( [1,1,2,3,5,8,13], 21 ) )
    console.log( [2, 7, 11, 15], 9,  await QuestaoUm( [2, 7, 11, 15], 9 ) )
    console.log( "--------------------------------------")
    
    console.log( "Resposta questão Dois:" )
    console.log( "{[()]}",QuestaoDois( "{[()]}" ) )
    console.log("{[(])}", QuestaoDois( "{[(])}" ) )
    console.log("{{[[(())]]}}", QuestaoDois( "{{[[(())]]}}" ) )
    console.log( "--------------------------------------")
    
    
    console.log( "Resposta questão tres:" )
    console.log([7,1,5,3,6,4], QuestaoTres( [7,1,5,3,6,4] )  )
    console.log([7,6,4,3,1], QuestaoTres( [7,6,4,3,1] ) )
    console.log( "--------------------------------------")

    console.log( "Resposta questão quatro:" )
    console.log([0,1,0,2,1,0,1,3,2,1,2,1], QuestaoQuatro( [0,1,0,2,1,0,1,3,2,1,2,1] ) )
    console.log([0,4,0,2,5,0,3,3,2,4,2,1,5,0,0,5], QuestaoQuatro( [0,4,0,2,5,0,3,3,2,4,2,1,5,0,0,5] ) )
    

    
})();
