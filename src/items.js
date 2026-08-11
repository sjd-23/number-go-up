export const ITEMS = {
    basicAdditive: {
        id: 'basicAdditive',
        name: 'Basic Additive Incrementor',
        description: '+{X} magnitude every 1 second',
        type: 'incrementor',
        produces: 'magnitude',
        basePrice: { magnitude: 15 },
        priceScale: 1.15,
        amount: 1,
        interval: 1,
        toReveal: { type: 'amount', resource: 'magnitude', amount: 0}
    },
    basicClickPower: {
        id: 'basicClickPower',
        name: 'Basic Click Power Increaser',
        description: "+{X} to magnitude per click",
        type: 'clickPower',
        basePrice: { magnitude: 100 },
        priceScale: 1.4,
        amount: 1,
        percent: 1,
        toReveal: { type: 'amount', resource: 'magnitude', amount: 40 }
    },
    basicMultiplicative: {
        id: 'basicMultiplicative',
        name: 'Basic Multiplicative Multiplier',
        description: '*{X} to all magnitude output',
        type: 'multiplier',
        basePrice: { magnitude: 300 },
        priceScale: 1.5,
        amount: 1.25,
        toReveal: { type: 'amount', resource: 'magnitude', amount: 175 }
    }
}