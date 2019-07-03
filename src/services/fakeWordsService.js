import uniqueId from "lodash/uniqueId";

const words = [
  "acumen",
  "agenda",
  "altruism",
  "ambiguous",
  "aplomb",
  "atrocity",
  "avarice",
  "bibulous",
  "celibate",
  "chivalrous",
  "condign",
  "conglomerate",
  "crepuscular",
  "cull",
  "debilitate",
  "dirigible",
  "facsimile",
  "ferrous",
  "flux",
  "futile",
  "garrulity",
  "impecunious",
  "incalculable",
  "incommunicado",
  "indefatigability",
  "insipid",
  "introspection",
  "languid",
  "lucubration",
  "malfeasance",
  "modicum",
  "moribund",
  "mundane",
  "naive",
  "obeisance",
  "obvious",
  "parvenu",
  "perpetuate",
  "perturb",
  "plausible",
  "precarious",
  "puerile",
  "pulchritude",
  "pusillanimity",
  "rapport",
  "rapprochement",
  "recalcitrant",
  "renegade",
  "reprisal",
  "sacrosanct",
  "simulacrum",
  "stipend",
  "stultify",
  "succumb",
  "taunt",
  "tentative",
  "turpitude",
  "ubiquity"
];

export function getWords() {
  const wordObjects = words.map(word => {
    return {
      _id: uniqueId(),
      term: word,
      definition: null
    };
  });

  return wordObjects;
}
