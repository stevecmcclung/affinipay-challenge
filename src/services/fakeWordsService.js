import uniqueId from "lodash/uniqueId";

const words = {
  latin: [
    "acumen",
    "agenda",
    "altruism",
    "ambiguous",
    "aplomb",
    "atrocity",
    "avarice"
  ],
  other: [
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
  ],
  spanish: ["hola", "delicioso", "esperando"]
};

export function getWords(lang) {
  if (!words[lang]) {
    throw new Error("No such language available");
  }

  const wordObjects = words[lang].map(word => {
    return {
      _id: uniqueId(),
      word
    };
  });

  return wordObjects;
}
