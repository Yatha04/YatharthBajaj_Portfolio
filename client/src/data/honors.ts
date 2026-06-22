export interface HonorsExperience {
    title: string;
    role: string;
    description: string;
    longDescription?: string;
    image?: string;
    icon?: string;
}

export interface YearReview {
    year: string;
    title: string;
    content: string;
    images?: string[];
}

export const honorsData = {
    aboutMe: {
        text: `My name is Yatharth Bajaj, I was born in a small town called Panipat in North India. I belong to a family of five, which includes my parents, my sister, and our dog. I love travelling and being active, I play a lot of sports and love to take part in adventure sports. I think my wish to explore the world and new cultures got me to choose a college in a new country this far from home.

In my time studying in the US, my journey has been a whirlwind of unforgettable adventures and learning experiences. I've not only explored various landscapes and cities but also delved into the vibrant campus life here. I joined several clubs that caught my interest and aligned with my passions, such as the Solar Car UC, where we work on designing and building solar-powered cars, and Revolution UC, a tech club that hosts hackathons. I also became a member of Alpha Lambda Delta (ALD), an honor society that recognizes academic excellence.

One of my most profound experiences was undertaking a co-op in South Carolina. Venturing out alone, this opportunity pushed me out of my comfort zone and allowed me to apply my academic knowledge in a real-world setting, enhancing both my professional and personal growth. Each of these experiences has broadened my understanding of the world and helped me forge lasting friendships with people from diverse backgrounds. Through these engagements, I've learned more about teamwork, innovation, and the importance of community, all while nurturing my adventurous spirit.`,
        images: [
            "/yatha01.png", // College/University vibe
            "/yatha02.png", // Travel/Adventure
            "/yatha03.png"  // Coding/Tech
        ]
    },

    yearReviews: [
        {
            year: "Year 1",
            title: "First Year Experience",
            content: `Adjusting to a new country, culture, and education system as an international student all in a few months was a rollercoaster. It had its ups and downs, I faced various challenges and embraced a wide range of experiences that shaped my personal and academic growth.


To start off, I recognized the importance of building a strong support system. I made an effort to find a good group of friends and formed friendships that provided a sense of belonging and support. Together, we explored the vibrant city of Cincinnati and learned about its culture and history. Through these experiences, I began to realize the multitude of opportunities available to me in this city.


My first goal was to do well academically. Fortunately, I quickly adapted to the new education system and also helped my friends get adjusted as well. As I settled into university life, I attended the organization fair, which proved to be a really good experience. I immediately joined 'Solar Car UC'. The idea of helping build a solar car from the ground up felt almost magical and reaffirmed my decision to pursue education in the United States. I participated in a hackathon called 'Make UC', which provided me a platform to showcase my skills, collaborate with talented individuals, and push the boundaries of my knowledge. After that, I decided to join Revolution UC as an organizer in my second semester. This involvement gave me valuable insights into event planning and deepened my understanding of the intricate logistics required to execute a successful event.


I also ventured into part-time work opportunities. Initially, I faced multiple rejections while searching for a suitable job. However, as the year progressed, I remained determined and resilient. Towards the end of the year, I finally secured a part-time job as a peer tutor. This opportunity not only allows me to contribute my knowledge and skills but also fills me with excitement and anticipation for the experiences that lie ahead.


In my second semester, I had the opportunity to participate in an honors experience—an engineering design research project focused on creating the ideal dorm and its conditions. Initially, the project started off on a promising note, with enthusiastic teamwork and meticulous planning. However, we encountered significant obstacles along the way, and sadly, the project eventually came to a halt. Despite not being able to complete the project, the experience taught me valuable lessons about resilience, adaptability, and the importance of navigating challenges in real-world scenarios.


Overall, my first year at university was a whirlwind of emotions and growth. It required me to adapt, step out of my comfort zone, and embrace the opportunities. I am grateful for the lessons learned and the memories made, and I eagerly look forward to an even more memorable second year at the University of Cincinnati`,

        },
        {
            year: "Year 2",
            title: "Second Year Experience",
            content: `With my second year at the University of Cincinnati coming to an end, I realize that amidst all the achievements, my journey as an international student has been a voyage of self-transformation. Having adapted to the new country and educational system, I began the semester with enthusiasm, eager to apply for my first co-op experience.


I started worked part-time as a peer tutor at the learning commons, helping other students with physics, math, chemistry, and engineering. It was a very satisfying role — I contributed to other people doing well at school, and for the first time in my life, I was earning money for myself since part-time work isn’t really a big thing in India.


Besides tutoring, I took on a new role as a Welcome Experience Mentor. In this capacity, I helped introduce new honors freshmen to the University of Cincinnati, providing tours and sharing insights about what the university and the city have to offer. This role allowed me to give back to the community that had supported me in my first year, making it both a rewarding and enriching experience.


However, the year was not without its challenges. Despite my initial excitement and preparation, I faced repeated rejections from co-op applications, which led to a significant amount of stress and frustration. By November, I still hadn't secured a co-op placement. Driven to see it through, I stayed in Cincinnati for winter break, working nights as a desk assistant part-time. This period was tough; I spent Christmas and New Year's alone for the first time in 19 years. Despite the loneliness, I persisted with my applications and finally, just days before the deadline, my efforts paid off—I secured a co-op position.


The spring semester was particularly monumental as I embarked on my co-op experience in Greenville, South Carolina. This experience was nothing short of transformative. Over four months, I not only applied what I had learned in my courses but also gained invaluable real-world experience. Working in teams, meeting new people, and exploring a new city enriched my professional and personal life immeasurably.


My second year was a testament to resilience and adaptability. It required continuous effort and sometimes, enduring solitude, but it also brought significant achievements and unforgettable experiences. I look back with gratitude for both the highs and the lows, as each has shaped me into a more capable and confident individual. I eagerly anticipate what the future holds, ready to embrace new challenges and opportunities at the University of Cincinnati.`,
        },
        {
            year: "Year 3",
            title: "Third Year Experience",
            content: `With my third year at the University of Cincinnati now behind me, I’ve realized how much growth and balance it brought into my life — between co-ops and classes, new cities and old friends, challenges and really good memories.


It all started in May, just after finishing my first co-op. I stayed back in Cincinnati for my very first summer semester in the U.S. I was honestly excited — the weather was amazing, I was back in the dorms as a Desk Assistant at Calhoun Hall, and I was eager to dive into new classes. Summer felt like a fresh start. I also joined the UC Innovation Challenge, where I started building Blendin, a web app designed to make cultural integration easier for international students. It felt personal and important. On top of that, I became super active with the Solar Car UC Club. I loved going to their workshops every week, learning hands-on and being part of something bigger. And of course, I saw the Fourth of July fireworks for the first time in my life — a small thing, but one I won’t forget.


When fall rolled around, I made a quick 10-day trip back home to India. It was short but refreshing. Right after, I went on a trip to Savannah and Hilton Head Islands with friends — the perfect way to wrap up summer. Then came my second co-op rotation at JTEKT in Greenville, South Carolina. This time, the projects were even more exciting. I worked with robots, learned new systems, and felt myself grow more confident at work. I also made new friends and had some firsts — like going shooting at a range, something I never thought I’d try.


After a short vacation at home post-co-op, I returned to Cincinnati for the spring semester. This one was tough. The weather was all over the place, and my classes were challenging. There were nights I stayed up late just trying to keep up. But in the middle of the chaos, my friends and I took a spring break trip to Myrtle Beach. It was one of those perfect trips — full of laughter, good food, and much-needed sun. That break gave me the push I needed to finish strong. I ended the semester with a 4.0 GPA, which felt like a personal win after everything.


This year wasn’t just about academics or work — it was about learning how to juggle it all, how to keep going, and how to make space for joy in the middle of it. From fireworks to robots to beach trips and late-night study sessions, my third year was full, and I’m grateful for every bit of it.`,
        },
        {
            year: "Year 4",
            title: "Fourth Year Experience",
            content: `I'm not sure how to describe this past one year. I landed back in Cincinnati in the middle of August, coming from an amazing trip in Malaysia. I love to travel, and for some reason I thought Malaysia would be more of a nature-filled trip. Exploring old cities, a lot of hiking, and getting to know a mix of Malay, Chinese, and Indian communities (and the great food all those communities have to offer). And don't get me wrong, it did include all of that, especially the old city of Malacca, a historic city sitting on the Strait of Malacca that's famous for its Dutch colonial architecture and heritage. But landing in Kuala Lumpur was a complete shock. That city is nothing short of New York when it comes to its skyscrapers and fancy architecture.


Anyway, back in Cincinnati, I was getting ready to get a head start on the Fall semester, but a really messy breakup shook everything I had planned. Obviously we're not here to talk about a breakup, but it definitely slowed the semester down for me and affected my academics too. One of the outcomes of the whole situation was the time I spent alone just reflecting on the last four years at UC, and I realized that for much of those four years I never really spent time alone. It was always running between classes, clubs, work, friends, sports, or video games.


It was like I entered this routine sometime in my first year and just stuck to it. I'm not saying it was a bad routine, but it wasn't the perfect routine either, and I never got the time to stop and figure out what I could change or what was actually better for my future.


So after a month or so of doing absolutely nothing, I realized it was time to lock in again and focus on myself. Looking back at it now, maybe it was a blessing in disguise (or maybe I just brainwashed myself into thinking that lol), but I realized the routine I was stuck in wasn't the routine I wanted to live in. So it was time to change things up.


It was a slow start with a lot of fallbacks, but I slowly got through the Fall semester. Then I headed back home for winter break, which was much needed because I got to spend time with my family and friends. A little time away from all the chaos really helped my thoughts, or my inner voice, calm down. After that I was off to South Carolina for my fourth co-op, and I was really looking forward to it.


I think Spring semester went really well. I switched things up and started my days super early, hitting the gym at 4:30 in the morning with my work bestie, and worked on some really important projects at work. Somewhere in there I realized that even though I genuinely like working as a Controls Engineer, I wanted to try my hand at Machine Learning and AI. So I started studying in the evenings after work and thinking about side projects. That's where I got the idea for LogixLens, a core project of my self-designed Learning Experience that mixes two fields, Manufacturing and AI. Overall it was a really nice semester. I made a lot of new friends, went on a lot of beautiful hikes, and even started a new hobby of becoming a DJ, or at least trying my hand at it.


If I'm being honest, the resilience this year didn't come from one big moment where I decided to bounce back. It came from a bunch of small ones. Choosing to get up at 4:30 even when I didn't want to, sitting alone with my own thoughts instead of running from them, picking up a textbook in the evening when it would have been easier to do nothing. What helped me hold the line was the people around me. My family back home gave me space to reset, my work bestie kept me accountable every single morning, and the new friends I made reminded me that starting over isn't the same as falling behind. Going forward, that's what I want to keep leaning on. I know I tend to disappear into routines without questioning them, so my plan is to keep checking in with the people who actually call me out, and to keep building things like LogixLens that pull me toward the future I want instead of the one I drifted into. This year I learned that being alone for a while isn't the same as being lost. Sometimes it's just the quiet you need before you figure out which direction to walk in next.`,
            images: [
                "/year4-01.png", // Malaysia / Malacca
                "/year4-02.png", // Kuala Lumpur skyline
                "/year4-03.mp4", // South Carolina co-op
                "/year4-04.png"  // hikes / DJ / new friends
            ]
        }
    ] as YearReview[],

    honorsExperiences: [
        {
            title: "Academic Coach @Learning Commons",
            role: "Academic Coach",
            description: "Worked as a peer Academic Coach, meeting with students one-on-one each week to help them tackle everything from time management to test anxiety and find their footing academically.",
            longDescription: `Being an academic coach last semester was honestly one of the most rewarding experiences I've had in college. I wasn't sure what to expect going in, but looking back, I can say it genuinely changed the way I think about learning and productivity. I had appointments pretty much every week throughout the semester, which kept me busy but in the best way.

Every session brought in someone new with a completely different situation. Some students were struggling with time management and felt totally overwhelmed balancing classes, work, and everything else life throws at you. Others just needed help figuring out how to actually study instead of just staring at their notes for hours. No two sessions ever felt the same, and I loved that about it.

What really stood out to me was how many students came back. When someone returns for a second or third session, it tells you that something clicked, that they're actually getting value out of it. That felt really good. Building that ongoing relationship with students and watching them get more confident over the weeks was something I didn't expect to find so meaningful.

I also learned a ridiculous amount about myself in the process. Teaching someone else time management strategies or how to break down a reading assignment made me reflect on my own habits and whether I was actually doing those things. There were plenty of moments where I was explaining a concept to a student and thinking "okay, I should probably apply this to my own life too."

One thing I didn't anticipate was how much the conversations would go beyond just academics. A lot of students opened up about stress, burnout, and struggling to find balance. Those sessions were less about study strategies and more about just helping someone feel heard and figure out a realistic plan to get back on track. It reminded me that academic struggles are rarely just about academics.

It pushed me to be more intentional, more organized, and more empathetic. I came out of the semester a better student myself, which I really didn't see coming. If you're on the fence about becoming an academic coach, I'd say go for it. You'll help more people than you expect, and you'll probably help yourself along the way too.`,
            image: "/honors-coach.png",
            icon: "Beaker"
        },
        {
            title: "UHP Welcome Experience Mentor",
            role: "Mentor",
            description: "Helped introduce new honors freshmen to the University of Cincinnati, providing tours and sharing insights about the university and the city. This role allowed me to give back to the community that had supported me.",
            longDescription: `My initial experience with the University Honors Program was serving as a mentor for the UHP Welcome Experience program. I was excited by the opportunity to guide new students and help them become fully integrated into the vibrant honors community. This mentorship was a great way to expand my network and make an impact on first-year students transitioning into university life.

The preparatory online sessions conducted over the summer were interactive and informative. They equipped us with all the tools and knowledge for conducting a successful welcome event. However, I missed the actual event due to an unanticipated delay in my flight, which made me a bit disheartened because I really worked hard on preparations for the event.

But, my mentorship journey did not end with that welcome event. My partner and I remained in contact with a few students throughout the semester for further meetings to answer any questions they had and to guide them. These meetings were, in fact, very rewarding. We were able to talk about the various opportunities available at UC and offered through the University Honors Program, personal experiences, and each other's aspirations. That is when I realized the value of my role.

We were able to carve out this open space for the students, guiding them through their new academic environment and helping them realize their full potential with resources and opportunities available to them. These interactions helped us become good mentors but also intertwined us with one another at a personal level, extending our relationships beyond mentor and mentee to building a community.

This is an experience that I am extremely thankful for, in terms of personal and professional growth. While the beginning was challenging, the semester developed into a growing experience, which did not make me regret my choice of the UC community and showed me the big influence of responsible mentorship.`,
            image: "/honors-mentor.png",
            icon: "Users"
        },
        {
            title: "Peer Tutoring @ Learning Commons",
            role: "Peer Tutor",
            description: "Worked as a peer tutor at the University of Cincinnati, spending 15-20 hours a week helping students work through everything from Math and Physics to Computer Science and Engineering, one session at a ",
            longDescription: `Looking back at my experience as a Peer Tutor during the Fall 2023 semester at the University of Cincinnati, I feel extremely excited to share how this position has been fundamental in my academic and personal journey. As a tutor of Maths, Physics, Chemistry, Computer Science, and Engineering Education (ENED), I gave 15–20 hours of service to other students weekly.

I decided to become a peer tutor as I was already helping some of my friends understand their assignments and study for their midterms. That experience gave me the confidence that I could positively impact the lives of more students. The interview process was a bit tricky at first, but eventually, I managed through.

My first tutoring session was both thrilling and immensely rewarding, marking the beginning of many positive interactions. After a few sessions, I was delighted to see familiar faces returning. This confirmed the effectiveness of my tutoring methods. It not only boosted my confidence but also affirmed my role in their educational journey.

I tried to make my tutoring style flexible. Sessions began with ensuring that the student grasped the topic of discussion, moved on to interactive interrogation, and then co-working through solved problems. At the end, I gave them problems to work through on their own. This proved effective in consolidating learning and building confidence.

Perhaps the most enlightening part of my experience was realizing that each student learns in a unique way, which allowed me to tailor my approach to their individual needs. This made learning more enjoyable for the student.

Peer tutoring has been a really rewarding experience for me. Through it, I enriched the educational experience of other people while also enriching my own understanding of diverse academic fields. It is an experience I will cherish as part of my time at university.`,
            image: "/honors-tutor.png",
            icon: "BookOpen"
        },
        {
            title: "Learning Out Loud: My Journey into AI",
            role: "Self-Designed Honors Experience",
            description: "A 15-week self-designed experience where I taught myself machine learning from the perceptron up, then turned that foundation into two real-world AI tools — LogixLens and a set of agents for a construction startup.",
            longDescription: `When I started this self-designed experience back in October, my plan was simple on paper. I would spend fifteen weeks building two AI projects, one based on classification and one using recommender systems or NLP. My goals were to get better at the technical side of machine learning, to get better at explaining hard ideas in plain language, and maybe to push a few other people to give AI a try. Looking back now that it is March, I did all of that, but the road there looked pretty different from what I drew up at the start.

I began with the fundamentals. I read through How Machines Learn and worked my way up from the perceptron, which is the most basic building block of a neural network, all the way to Convolutional Neural Networks. Going slowly like this mattered. Instead of copying code I did not really understand, I learned why a perceptron makes the decisions it does, how layers stack on top of each other, and how a CNN actually sees an image. It was slow and honestly a little frustrating at times, but it gave me a base I kept leaning on for the rest of the experience.

From there my projects took shape, and this is where my goals shifted. My first real build was LogixLens, a tool that lets large language models query over PLC code, which is the code that runs industrial machines and controllers. I had planned for a clean, textbook classification project, but the more I worked, the more I got pulled toward problems that people actually had in front of them. PLC code is hard to read and there is not much tooling around it, so building something that could read it and answer questions about it felt useful in a way a practice project never would. That changed how I thought about the whole experience. I stopped chasing the assignment and started chasing real problems.

[[logixlens]]

The interactive diagram above is the simplest way I can explain what LogixLens does — go ahead and ask it a question. Out on a factory floor, machines are run by PLCs, which are small controllers programmed in code that almost nobody except a trained engineer can read. That is the bottleneck, because when something goes wrong the people on the line have to wait for an expert to come read the logic. LogixLens reads and indexes that code first, then hands it to a large language model that can answer questions about it in plain language. The payoff is at the end of the chain: a line operator can ask what a machine is doing or why it stopped and get a clear answer, without ever touching the raw PLC code. Building this taught me that the hardest part of an AI tool is often not the model itself but getting messy, real world data into a shape the model can actually use.

That led straight into my second focus, which was building AI agents for the construction business. This part came from a bit of luck. We had a guest lecturer in my microeconomics class who was an entrepreneur building a new startup with AI, and after class I talked to him about what I had been working on. One thing led to another and I ended up doing a project for him, building agents to help with his construction business. It worked out for both of us. He got a tool he needed and I got a real client with real problems instead of a made up assignment. This was the toughest part of the whole experience and also the most fun. I had to take everything I learned about models and language and make it work in a messy, real world setting, where the data is not clean and where people need answers they can actually trust. There were plenty of nights where things broke and I had no idea why, but figuring it out piece by piece was the best feeling. Forcing myself to slow down and explain out loud what I was doing is when I realized how much better I understood something once I could teach it to someone else.

Somewhere in the middle of all this I flew out to San Francisco for a hackathon at UC Berkeley, which turned into one of the highlights of the whole experience. There my team built Grassroots, a personalized training tool for phone bankers that uses AI voice agents to mimic voters from across the political landscape, including some genuinely tricky scenarios. We sorted each voter into easy, medium, and hard so a user can practice against a profile until they are ready to move up, and after every call we hand back a transcript to reflect on. Those transcripts get stored on our backend and exposed through an MCP server, so an AI can read them, rate the call, and recommend ways to improve. Getting all of that working in a weekend, with a real team and a hard deadline, pushed me harder than anything else I did.

What I learned ended up being bigger than any single model or project. I learned how to learn a hard subject on my own, how to push through the boring and confusing parts, and how to turn rough ideas into things that actually run. I also learned how to talk about technical work without hiding behind jargon, which is a skill I did not expect to grow this much. The mix of being stuck and then finally getting something to work is what made the whole thing fun, even when it was hard.

This experience shaped how I see being a Global Citizen Scholar. To me it means using what you know to solve real problems for real people, not just for a grade, and then sharing what you learn so others can do the same. AI is going to touch almost every field and almost every job, and a lot of people feel nervous about it. I want to help people use it well and feel less afraid of it, whether that is a worker on a job site or a student who thinks this stuff is out of reach. Explaining what I built in plain language was a small version of that, and it pushed me to make hard ideas feel simple.

Going forward, I want to keep this momentum. In the classroom I will keep picking projects that are tied to real problems instead of ones that just check a box, because that is what kept me motivated this time. In my career I want to keep building tools like LogixLens and the construction agents, the kind of tools that make hard, technical work a little easier for the people who do it every day. And on a personal level, I want to keep teaching what I learn, because explaining something out loud is still the best way I know to find out whether I really understand it. This experience did not just teach me machine learning. It taught me how I like to work, and that is something I will carry into whatever I do next.`,
            image: "/honors-learning-out-loud.svg",
            icon: "Sparkles"
        }
    ] as HonorsExperience[]
};
