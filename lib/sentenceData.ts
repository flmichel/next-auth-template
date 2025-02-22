type BaseWord = {
  type: string;
  word: string;
  furigana: string;
  translation: string;
};

type WithPrefix = {
  prefix?: string;
};

type Noun = BaseWord &
  WithPrefix & {
    type: 'noun';
    category: string;
  };

type Verb = BaseWord &
  WithPrefix & {
    type: 'verb';
    dictionary_form: string;
    current_form: string;
    emphasis?: string;
    form_usage: VerbFormUsage;
  };

type Adjective = BaseWord &
  WithPrefix & {
    type: 'adjective';
  };

type Adverb = BaseWord & {
  type: 'adverb';
};

type Particle = BaseWord & {
  word: ParticleWord;
  usage: ParticleUsage;
  type: 'particle';
  particleType:
    | 'kaku-joshi'
    | 'heiritsu-joshi'
    | 'shū-joshi'
    | 'kantō-joshi'
    | 'fuku-joshi'
    | 'kakari-joshi'
    | 'setsuzoku-joshi'
    | 'juntai-joshi';
};

type Conjunction = BaseWord & {
  type: 'conjunction';
};

type SymbolType = BaseWord & {
  type: 'symbol';
};

type Filler = BaseWord & {
  type: 'filler';
};

type Other = BaseWord & {
  type: 'other';
};

export type Word =
  | Noun
  | Verb
  | Adjective
  | Adverb
  | Particle
  | Conjunction
  | SymbolType
  | Filler
  | Other;

type ParticleWord =
  | 'が'
  | 'の'
  | 'を'
  | 'に'
  | 'へ'
  | 'と'
  | 'で'
  | 'から'
  | 'より'
  | 'か'
  | 'や'
  | 'なり'
  | 'だの'
  | 'な'
  | 'わ'
  | 'とも'
  | 'かしら'
  | 'さ'
  | 'よ'
  | 'ね'
  | 'ばかり'
  | 'まで'
  | 'だけ'
  | 'ほど'
  | 'くらい'
  | 'など'
  | 'は'
  | 'も'
  | 'こそ'
  | 'でも'
  | 'しか'
  | 'さえ'
  | 'だに'
  | 'ば'
  | 'て'
  | 'のに'
  | 'ので'
  | 'ところが'
  | 'けれども'
  | 'くせに';

  type ParticleUsage =
  // が (ga)
  | "が: Subject Marker"
  | "が: Emphasis Marker"

  // の (no)
  | "の: Noun Modifier"
  | "の: Possessive Marker"
  | "の: Nominalizer"
  | "の: Explanatory Particle"

  // を (wo)
  | "を: Direct Object Marker"
  | "を: Place of Action Marker"

  // に (ni)
  | "に: Direction Marker"
  | "に: Time Marker"
  | "に: Purpose Marker"

  // へ (e)
  | "へ: Direction Marker"

  // と (to)
  | "と: Quotation Marker"
  | "と: With Marker"
  | "と: Conditional Marker"

  // で (de)
  | "で: Location Marker"
  | "で: Means Marker"
  | "で: Reason Marker"

  // から (kara)
  | "から: Starting Point Marker"
  | "から: Reason Marker"

  // より (yori)
  | "より: Comparison Marker"
  | "より: Starting Point Marker"

  // か (ka)
  | "か: Question Marker"
  | "か: Or Marker"

  // や (ya)
  | "や: Listing Marker"

  // なり (nari)
  | "なり: Listing Marker"

  // だの (dano)
  | "だの: Listing Marker"

  // な (na)
  | "な: Adjective Ending"
  | "な: Explanatory Particle"

  // わ (wa)
  | "わ: Sentence Ending Particle"

  // とも (tomo)
  | "とも: With Marker"
  | "とも: Even Marker"

  // かしら (kashira)
  | "かしら: Question Marker"

  // さ (sa)
  | "さ: Sentence Ending Particle"

  // よ (yo)
  | "よ: Sentence Ending Particle"

  // ね (ne)
  | "ね: Sentence Ending Particle"

  // ばかり (bakari)
  | "ばかり: Only Marker"
  | "ばかり: Just Marker"

  // まで (made)
  | "まで: Until Marker"

  // だけ (dake)
  | "だけ: Only Marker"

  // ほど (hodo)
  | "ほど: Extent Marker"

  // くらい (kurai)
  | "くらい: Extent Marker"

  // など (nado)
  | "など: Etcetera Marker"

  // は (wa)
  | "は: Topic Marker"
  | "は: Contrast Marker"

  // も (mo)
  | "も: Also Marker"
  | "も: Even Marker"

  // こそ (koso)
  | "こそ: Emphasis Marker"

  // でも (demo)
  | "でも: Even Marker"

  // しか (shika)
  | "しか: Only Marker"

  // さえ (sae)
  | "さえ: Even Marker"

  // だに (dani)
  | "だに: Even Marker"

  // ば (ba)
  | "ば: Conditional Marker"

  // て (te)
  | "て: Te-form Connector"

  // のに (noni)
  | "のに: Despite Marker"

  // ので (node)
  | "ので: Because Marker"

  // ところが (tokoroga)
  | "ところが: However Marker"

  // けれども (keredomo)
  | "けれども: However Marker"

  // くせに (kuseni)
  | "くせに: Despite Marker"

  type VerbFormUsage =
  // 〜た (Past, Plain)
  | "〜た (Past, Plain): Indicates a completed action in an informal context."

  // 〜ない (Negative, Plain)
  | "〜ない (Negative, Plain): Indicates a negative action in an informal context."

  // て Form
  | "て Form: Connects verbs to indicate sequential actions or to form compound verbs."
  | "て Form: Used to make requests when combined with 'ください' (kudasai)."
  | "て Form: Indicates permission or possibility when combined with 'もいい' (mo ii)."
  | "て Form: Expresses a reason or cause when combined with 'から' (kara)."
  | "て Form: Forms the conditional 'if' when combined with 'ば' (ba)."
  | "て Form: Indicates a suggestion or invitation when combined with 'か' (ka)."
  | "て Form: Forms the volitional 'let's' when combined with 'しよう' (shiyou)."

  // 〜ている (Continuous)
  | "〜ている (Continuous): Indicates an ongoing action or state."
  | "〜ている (Continuous): Expresses a habitual action."
  | "〜ている (Continuous): Describes a resultant state from a completed action."

  // 〜そう (Looks Like)
  | "〜そう (Looks Like): Indicates that something appears to be a certain way based on visual cues."
  | "〜そう (Looks Like): Used with adjectives to express 'seems' or 'looks like'."

  // 〜たい (Desire)
  | "〜たい (Desire): Expresses a desire to do something."
  | "〜たい (Desire): Used to indicate that the speaker wants to perform the action of the verb."

  // 〜たがる (Wants to)
  | "〜たがる (Wants to): Indicates that someone else wants to do something."
  | "〜たがる (Wants to): Used to express the desires of others."

  // 〜ながら (Simultaneous)
  | "〜ながら (Simultaneous): Indicates that two actions are happening simultaneously."
  | "〜ながら (Simultaneous): Used to express 'while' doing something."

  // 〜なさい (Polite Command)
  | "〜なさい (Polite Command): A polite imperative form used to give commands or instructions."
  | "〜なさい (Polite Command): Often used by superiors to subordinates."

  // Command Form
  | "Command Form: Direct imperative form used to give commands."
  | "Command Form: Used in informal contexts to instruct someone to do something."

  // 〜やすい (Easy To)
  | "〜やすい (Easy To): Indicates that something is easy to do."
  | "〜やすい (Easy To): Used to describe actions that are easy to perform."

  // 〜にくい (Hard To)
  | "〜にくい (Hard To): Indicates that something is hard to do."
  | "〜にくい (Hard To): Used to describe actions that are difficult to perform."

  // 〜させる (Causative)
  | "〜させる (Causative): Indicates that someone is made to do something."
  | "〜させる (Causative): Used to express causation, making someone perform an action."

  // 〜ば (Conditional)
  | "〜ば (Conditional): Indicates a conditional 'if' statement."
  | "〜ば (Conditional): Used to express hypothetical situations or conditions."

  // 〜れる (Potential)
  | "〜れる (Potential): Indicates the potential or ability to do something."
  | "〜れる (Potential): Used to express that something can be done."

  // 〜られる (Passive)
  | "〜られる (Passive): Indicates that the subject is the recipient of an action."
  | "〜られる (Passive): Used to express passive voice, where the subject is acted upon."

  // 〜よう (Volitional)
  | "〜よう (Volitional): Indicates intention or suggestion, similar to 'let's'."
  | "〜よう (Volitional): Used to express a will or desire to do something."

  type ConstituentTypes = 
  | "Subject"
  | "Object"
  | "Predicate"
  | "Complement"
  | "Modifier"
  | "Adverbial"
  | "Conjunction"
  | "Interjection"
  | "Vocative"
  | "Topic"
  | "PostpositionalPhrase"
  | "NounPhrase"
  | "VerbPhrase"
  | "AdjectivePhrase"
  | "Clause";

export type Constituent = {
  type: 'constituent',
  original: string;
  translation: string;
  constituentType: ConstituentTypes;
  parts: Part[];
};

export type Part = Constituent | Word;

export type Sentence = {
  original: string;
  translation: string;
  parts: Part[];
}

export type WordList = Word[];
