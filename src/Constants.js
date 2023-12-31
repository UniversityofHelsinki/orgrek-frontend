//-------------Attributes-------------
export const nameFi = 'name_fi';
export const nameSv = 'name_sv';
export const nameEn = 'name_en';
export const type = 'type';
export const abbreviation = 'lyhenne';
export const upperUnitAbbreviation = 'emo_lyhenne';
export const hrAbbreviation = 'hr_lyhenne';
export const hrId = 'hr_tunnus';
export const researchId = 'tutkimus_tunnus';
export const profitCenterId = 'talous_tunnus';
export const disciplineId = 'oppiaine_tunnus';
export const billingId = 'laskutus_tunnus';
export const mainariId = 'mainari_tunnus';
export const successorHierarchy = 'history';

export const defaultHierarchy = 'virallinen';

export const queryParams = {
  hierarchies: 'hierarchies',
  uniqueId: 'uid',
};

export const notOtherAttributes = [
  nameFi,
  nameSv,
  nameEn,
  type,
  abbreviation,
  upperUnitAbbreviation,
  hrAbbreviation,
  mainariId,
  hrId,
  billingId,
  disciplineId,
  profitCenterId,
  researchId,
];

export const codeAttributes = [
  abbreviation,
  upperUnitAbbreviation,
  hrAbbreviation,
  mainariId,
  hrId,
  billingId,
  disciplineId,
  profitCenterId,
  researchId,
  successorHierarchy,
];

export const languageCodes = {
  fi: 'fi',
  en: 'en',
  sv: 'sv-FI',
  ia: 'fi',
};

export const attributeLangCodes = {
  name_fi: languageCodes['fi'],
  name_sv: languageCodes['sv'],
  name_en: languageCodes['en'],
  // we default to fi
  null: languageCodes['fi'],
  undefined: languageCodes['fi'],
};
