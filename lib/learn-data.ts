export type LearnMetric = {
  label: string;
  value: string;
  detail: string;
};

export type LearnExplainer = {
  title: string;
  tag: string;
  readTime: string;
  summary: string;
  bullets: string[];
  tone?: 'default' | 'accent';
};

export type LearnDisclosure = {
  title: string;
  tag: string;
  body: string;
  tone?: 'default' | 'accent';
};

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export type LearnFaq = {
  question: string;
  answer: string;
};

export const learnData = {
  greeting: 'Learn ORE',
  title: 'Understand the product ideas behind ORE in a few short reads.',
  subtitle:
    'This tab explains how the app concept frames ORE, mining, staking, privacy, supply, and risk. It is educational copy for new users, not research or financial advice.',
  overview: {
    title: 'What is ORE?',
    body:
      'In this product concept, ORE is treated as a digital reserve asset that users may mine, hold, stake, borrow against, and transfer privately. The app presents it first as reserve inventory, then as a working asset with visible tradeoffs.',
    note:
      'That framing is a product choice, not a guarantee about price, safety, or long-term value.',
    metrics: [
      {
        label: 'Topics',
        value: '7 core ideas',
        detail: 'Mining, staking, privacy, supply, and more.',
      },
      {
        label: 'Level',
        value: 'Beginner friendly',
        detail: 'Short reads designed for fast scanning.',
      },
      {
        label: 'Style',
        value: 'Demo education',
        detail: 'No live protocol data or formal research feed.',
      },
    ] satisfies LearnMetric[],
  },
  explainers: [
    {
      title: 'How mining works',
      tag: 'Mining',
      readTime: '2 min',
      summary:
        'Mining is shown here as a repeated process with rounds, effort, competition, and variable outcomes rather than a guaranteed payout machine.',
      bullets: [
        'Rounds repeat on a cadence, so each attempt has a clear start and finish.',
        'Success is not guaranteed, which is why the app highlights odds, pace, and strategy.',
        'Mining rewards may arrive in stages and may need later actions such as refining or redeployment.',
      ],
    },
    {
      title: 'How staking works',
      tag: 'Staking',
      readTime: '2 min',
      summary:
        'Staking is presented as committing ORE to an earning or security role in exchange for yield, with tradeoffs between liquidity and reward.',
      bullets: [
        'When ORE is staked, it may become less liquid for a period of time.',
        'Rewards can improve long-run holdings, but they do not remove asset risk.',
        'Liquid staking products can make a position more flexible, while adding extra structure to understand.',
      ],
    },
    {
      title: 'Why users compare ORE to store-of-value assets',
      tag: 'Context',
      readTime: '2 min',
      summary:
        'Users may compare ORE to store-of-value assets because they want to know whether it behaves more like reserve inventory than a pure utility token.',
      bullets: [
        'They look at supply discipline, issuance, liquidity, and how holders behave over time.',
        'They care about whether ownership stays concentrated or broadens out as the asset matures.',
        'A comparison is a framework for thinking, not proof that two assets deserve the same valuation.',
      ],
      tone: 'accent',
    },
    {
      title: 'Privacy education',
      tag: 'Privacy',
      readTime: '2 min',
      summary:
        'Privacy tools in this app are explained as ways to reduce exposed transfer details, not as a promise that activity becomes fully invisible.',
      bullets: [
        'Private balances may require a deposit step before funds are ready to send.',
        'Masked receipts can improve discretion for the owner without removing every trace of behavior.',
        'Counterparties, timing, and off-chain records can still reveal patterns even when on-screen history is quieter.',
      ],
    },
    {
      title: 'Supply and ownership education',
      tag: 'Supply',
      readTime: '2 min',
      summary:
        'Supply education helps users understand how much ORE exists, how much is circulating, and what their own balance means in context.',
      bullets: [
        'Circulating supply describes the amount currently moving in the market or network.',
        'Total supply describes the broader issuance picture, including units not yet liquid.',
        'Ownership share is only a rough framing tool, but it can help users see their position in context.',
      ],
    },
  ] satisfies LearnExplainer[],
  disclosures: [
    {
      title: 'ORE can still be volatile.',
      tag: 'Price risk',
      body:
        'A clearer interface does not change the fact that the asset itself may move sharply in value over short or long periods.',
      tone: 'accent',
    },
    {
      title: 'Mining and staking are operational choices, not passive magic.',
      tag: 'Execution risk',
      body:
        'They depend on rules, participation, timing, and product structure. A user should understand the mechanics before treating rewards as dependable.',
    },
    {
      title: 'Private modes have limits.',
      tag: 'Privacy risk',
      body:
        'Privacy tools may reduce visible detail, but they do not remove every source of metadata or every external record.',
    },
    {
      title: 'This screen is education, not advice.',
      tag: 'Disclaimer',
      body:
        'Nothing here is a recommendation to buy, mine, stake, lend, borrow, or transfer ORE. It is plain-language product education for a concept app.',
    },
  ] satisfies LearnDisclosure[],
  glossary: [
    {
      term: 'ORE',
      definition: 'The asset this app is built around and the unit used across balance, mining, staking, and privacy flows.',
    },
    {
      term: 'Mining round',
      definition: 'A single cycle or attempt in the mining process, usually measured against timing and probability.',
    },
    {
      term: 'Staking',
      definition: 'Committing ORE into a structure that may earn rewards while changing how liquid the position is.',
    },
    {
      term: 'Circulating supply',
      definition: 'The amount of ORE currently moving through the market or network.',
    },
    {
      term: 'Privacy pool',
      definition: 'A product layer used to separate a private balance from a public one before sending.',
    },
    {
      term: 'Ownership share',
      definition: 'A rough estimate of how a user balance compares with circulating supply.',
    },
  ] satisfies GlossaryTerm[],
  faqs: [
    {
      question: 'Is ORE presented here as cash or as an investment?',
      answer:
        'Neither in a strict sense. The app frames ORE as reserve inventory that can be held or used in several product flows, but it does not promise price stability or cash-like certainty.',
    },
    {
      question: 'Does mining guarantee rewards?',
      answer:
        'No. Mining is shown as probabilistic and round-based, which is why the app emphasizes status, timing, and strategy instead of guaranteed output.',
    },
    {
      question: 'Is staking risk-free?',
      answer:
        'No. Staking can earn rewards, but it still carries asset risk and may involve liquidity, timing, or structural tradeoffs.',
    },
    {
      question: 'Does privacy mode make transfers invisible?',
      answer:
        'No. It is better understood as a tool for reducing exposed information in routine product views, with real limits around metadata and counterparties.',
    },
    {
      question: 'Why does the app show supply and ownership?',
      answer:
        'Those ideas help users understand their balance in context instead of looking only at price or short-term account changes.',
    },
  ] satisfies LearnFaq[],
} as const;
