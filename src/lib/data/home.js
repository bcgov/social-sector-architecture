// Home page content. See CONTRACT.md for the writing rules.
// Compare answers come only from ARC-001-RSCH-005 §2, §5, §6 (S and H)
// and target-architecture-v2 A.2, A.3, A.8 (E).

export const hero = {
  title: 'Three ways to replace ICM',
  lede:
    'ICM supports employment assistance, disability assistance and child protection. ' +
    'This site shows three ways it could be replaced, in plain words, so you can see what each would mean.'
};

export const why = {
  heading: 'Why ICM needs replacing',
  paragraphs: [
    'ICM works, but it takes a lot of effort to keep it working. ' +
      'Staff move between several systems to finish one task, and they type the same numbers more than once. ' +
      'The rules that decide what people get are spread across six places, including spreadsheets.',
    'Running ICM costs more each year as support and licence fees grow. ' +
      'The last project replaced only about a third of the older systems. ' +
      'The most important older system is still running beside ICM.'
  ]
};

export const optionsIntro = {
  heading: 'The three options',
  text:
    'Salesforce S puts everything on Salesforce and runs it the way ICM runs today. ' +
    'Salesforce H uses Salesforce for case work and rules, and keeps money, evidence and records on the ministry\'s own servers. ' +
    'Event-driven has the ministry build in parts, buy or reuse common parts, and link them by passing messages ' +
    'whenever something happens, such as a payment being issued.'
};

export const compare = {
  heading: 'The options side by side',
  rows: [
    {
      question: 'Who controls when it changes?',
      s: 'Salesforce. It sets three major updates a year, and the ministry cannot pause them.',
      h: 'Salesforce for case work and rules. The ministry for the payment run.',
      e: 'The ministry. It runs the parts on its own servers and sets its own timing.'
    },
    {
      question: 'What happens if the supplier cuts us off?',
      s: 'A copy of records can be kept. Payments fall back to a manual procedure.',
      h: 'A ministry copy keeps intake, case viewing and repeats of the last payments running.',
      e: 'Data stays on ministry servers. Open source parts limit reliance on one supplier.'
    },
    {
      question: 'Where does the money run?',
      s: 'On Salesforce, in a monthly batch run.',
      h: 'On the ministry\'s own servers, with the ministry\'s own ledger.',
      e: 'In payment and finance parts built for the ministry, on its own servers.'
    },
    {
      question: 'How much custom work?',
      s: 'A lot. 346 of 481 requirements need building on top of Salesforce.',
      h: 'The same as S, plus the parts kept off Salesforce.',
      e: 'Custom building only for work unique to the ministry. Open source elsewhere.'
    },
    {
      question: 'What are the yearly licence costs?',
      s: 'About US$31M to $56M a year at list price, before any discount.',
      h: 'About US$31M to $56M a year at list price, before any discount.',
      e: 'Not yet estimated'
    },
    {
      question: 'Is it worse than today anywhere?',
      s: 'Yes. The ministry loses its change freeze around the monthly cheque run.',
      h: 'Less so. The payment run keeps its freeze; work on Salesforce does not.',
      e: 'Not yet estimated'
    },
    {
      question: 'When could people use something new?',
      s: 'About month 13 in our timeline sketch, after the licences are bought.',
      h: 'About month 13 in our timeline sketch, after the licences are bought.',
      e: 'About month 9 in our timeline sketch, with a read-only worker view.'
    }
  ]
};

export const howToRead = {
  heading: 'How to read the diagrams',
  steps: [
    'Each option has a diagram. Boxes are grouped by who runs them, such as Salesforce or the ministry.',
    'Click or tap any box to learn what it is, what it does and why it matters.',
    'Look for the coloured notes. They show where an option falls short or fixes a problem.'
  ]
};

export const cta = {
  heading: 'Start with an option',
  text:
    'Pick an option to see its diagram and what it would mean for staff, clients and money. ' +
    'Nothing here is a decision. The ministry has not chosen an option.'
};
