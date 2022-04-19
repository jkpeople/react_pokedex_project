export function getKnownAttributes(list) {
    let agg = list.reduce(
        (agg, pokemon) => {
            agg.types.push(...pokemon.type);
            agg.weaknesses.push(...pokemon.weaknesses);
            return agg;
        },
        { types: [], weaknesses: [] }
    );

    return {
        types: [...new Set(agg.types)],
        weaknesses: [...new Set(agg.weaknesses)],
    };
}