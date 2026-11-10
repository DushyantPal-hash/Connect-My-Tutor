export const courseTracks = [
  {
    slug: 'ib',
    title: 'IB',
    category: 'International curriculum',
    summary: 'Personalized support for IB learners across subjects, projects and exams.',
    description: 'Build deeper understanding and confidence across the International Baccalaureate. Lessons can support your subject coursework, revision, and the study habits that help you manage a demanding programme.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Economics'],
    focus: 'Subject understanding, coursework planning, revision strategies and exam practice.',
    art: 'academic-illustration.svg',
    related: ['igcse', 'aqa', 'pearson-edexcel']
  },
  {
    slug: 'igcse',
    title: 'IGCSE',
    category: 'International curriculum',
    summary: 'Cambridge curriculum support with clear concepts and focused exam practice.',
    description: 'Strengthen subject knowledge and get comfortable with the style of IGCSE assessments. One-to-one lessons are shaped around your syllabus, current topics and goals.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'],
    focus: 'Syllabus-based learning, topic review, past-paper practice and exam confidence.',
    art: 'exam-illustration.svg',
    related: ['ib', 'aqa', 'pearson-edexcel']
  },
  {
    slug: 'sat',
    title: 'SAT',
    category: 'Global test prep',
    summary: 'Build test skills and a focused study plan for the SAT.',
    description: 'Prepare for the SAT with a clear plan built around your strengths and areas to improve. Work through concepts, pacing and practice questions with a tutor who can keep your preparation focused.',
    subjects: ['Math', 'Reading and Writing'],
    focus: 'Diagnostic review, targeted practice, pacing and a consistent study routine.',
    art: 'exam-illustration.svg',
    related: ['act', 'aps', 'ib']
  },
  {
    slug: 'act',
    title: 'ACT',
    category: 'Global test prep',
    summary: 'Structured preparation for ACT subjects, timing and test strategy.',
    description: 'Build confidence across ACT sections with tailored tutoring and regular practice. Your learning plan can focus on the subjects, question types and timing goals that need the most attention.',
    subjects: ['English', 'Math', 'Reading', 'Science'],
    focus: 'Section-by-section practice, accuracy, pacing and test-day readiness.',
    art: 'exam-illustration.svg',
    related: ['sat', 'aps', 'ib']
  },
  {
    slug: 'aps',
    title: 'APs',
    category: 'Global test prep',
    summary: 'Advanced learning across STEM, humanities and more.',
    description: 'Get subject-specific support for Advanced Placement courses. Strengthen core concepts throughout the year and prepare for AP assessments with a tutor matched to your subject.',
    subjects: ['Calculus', 'Biology', 'Chemistry', 'Physics', 'English', 'Economics'],
    focus: 'Course concepts, free-response practice, revision and exam preparation.',
    art: 'science-illustration.svg',
    related: ['sat', 'act', 'ib']
  },
  {
    slug: 'aqa',
    title: 'AQA',
    category: 'International curriculum',
    summary: 'Subject-specific support, revision and exam confidence.',
    description: 'Make steady progress through AQA topics with lessons tailored to your course and current priorities. Ask questions, practise applying ideas and build confidence for assessments.',
    subjects: ['Mathematics', 'Biology', 'Chemistry', 'Physics', 'English'],
    focus: 'Topic teaching, assessment practice, revision planning and subject confidence.',
    art: 'academic-illustration.svg',
    related: ['igcse', 'pearson-edexcel', 'ib']
  },
  {
    slug: 'pearson-edexcel',
    title: 'Pearson Edexcel',
    category: 'International curriculum',
    summary: 'Strengthen understanding and practical exam skills.',
    description: 'Get focused support for Pearson Edexcel courses, from working through difficult topics to practising exam questions. Your tutor can adapt each lesson to your course and pace.',
    subjects: ['Mathematics', 'Biology', 'Chemistry', 'Physics', 'English'],
    focus: 'Clear explanations, exam-question practice and structured revision.',
    art: 'exam-illustration.svg',
    related: ['aqa', 'igcse', 'ib']
  },
  {
    slug: 'jee',
    title: 'JEE',
    category: 'Indian competitive exams',
    summary: 'Master Physics, Chemistry and Mathematics concepts for JEE.',
    description: 'Prepare for JEE with a strong foundation in core concepts and a deliberate approach to problem solving. One-to-one support can help you identify gaps and practise challenging questions.',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    focus: 'Concept mastery, guided problem solving, revision and mock-test review.',
    art: 'science-illustration.svg',
    related: ['neet', 'foundation', 'boardprep']
  },
  {
    slug: 'neet',
    title: 'NEET',
    category: 'Indian competitive exams',
    summary: 'Focused preparation in Biology, Chemistry and Physics.',
    description: 'Prepare for NEET with clear explanations, topic-by-topic revision and practice that builds confidence. Focus your lessons on the subjects and concepts where you need the most support.',
    subjects: ['Biology', 'Chemistry', 'Physics'],
    focus: 'Concept review, question practice, revision planning and exam readiness.',
    art: 'science-illustration.svg',
    related: ['jee', 'foundation', 'boardprep']
  },
  {
    slug: 'foundation',
    title: 'Foundation',
    category: 'School foundation',
    summary: 'Build strong fundamentals and lasting confidence.',
    description: 'Develop a secure understanding of essential school topics before moving on to more advanced work. Lessons are paced to the learner and encourage curiosity, confidence and good learning habits.',
    subjects: ['Mathematics', 'English', 'Science'],
    focus: 'Core skills, clear explanations, confidence and a positive learning routine.',
    art: 'academic-illustration.svg',
    related: ['boardprep', 'jee', 'neet']
  },
  {
    slug: 'boardprep',
    title: 'BoardPrep',
    category: 'Board preparation',
    summary: 'Targeted preparation for CBSE, ICSE and state boards.',
    description: 'Prepare for board exams with a personal plan for your subjects and syllabus. Review key concepts, practise questions and build a revision routine that feels manageable.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
    focus: 'Syllabus review, exam-style questions, revision plans and confidence.',
    art: 'exam-illustration.svg',
    related: ['foundation', 'jee', 'neet']
  }
];
