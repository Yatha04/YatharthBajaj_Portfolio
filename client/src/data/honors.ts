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
            content: `Currently in progress!`,
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
        }
    ] as HonorsExperience[]
};
