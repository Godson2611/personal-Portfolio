import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Education from './models/Education.js';
import Experience from './models/Experience.js';
import Portfolio from './models/Portfolio.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import User from './models/User.js';

dotenv.config();

const sampleData = {
    bio: {
        name: "Godson S",
        roles: [
            "MERN Stack Developer",
            "Programmer",
            "Frontend Developer",
            "Backend Developer",
            "Database Manager"
        ],
        description: "BTech IT graduate specializing in MERN stack with a strong track record of delivering high-quality projects on time. Skilled in database management, RESTful APIs, testing, debugging, version control systems, and deploying applications on AWS and Netlify. Committed to ongoing professional development and staying updated with the latest tech advancements.",
        github: "https://github.com/Godson2611",
        resume: "https://www.canva.com/design/DAF6NJFDaY4/lNyHFx19O7mqp6Ua6yP1Vw/view?utm_content=DAF6NJFDaY4&utm_campaign=designshare&utm_medium=link&utm_source=editor",
        linkedin: "https://www.linkedin.com/in/godson-s/",
        email: "godson@example.com",
        phone: "+91 9876543210",
        location: "Chennai, India"
    },
    skills: [
        {
            title: "Frontend",
            skills: [
                { name: "React Js", proficiency: 90 },
                { name: "Redux", proficiency: 85 },
                { name: "Next Js", proficiency: 80 },
                { name: "HTML", proficiency: 95 },
                { name: "CSS", proficiency: 90 },
                { name: "JavaScript", proficiency: 88 },
                { name: "Bootstrap", proficiency: 85 },
                { name: "Tailwind CSS", proficiency: 90 }
            ]
        },
        {
            title: "Backend",
            skills: [
                { name: "Node Js", proficiency: 85 },
                { name: "Express Js", proficiency: 88 },
                { name: "GraphQL", proficiency: 75 },
                { name: "MySQL", proficiency: 82 },
                { name: "MongoDB", proficiency: 87 }
            ]
        }
    ],
    experiences: [
        {
            id: 1,
            role: "Learn the basics of web - Internet fundamentals",
            company: "codedamn",
            date: "7th January 2023",
            desc: "Successfully completed the interactive course on codedamn...",
            skills: [
                "How domains work",
                "Role of DNS (Domain Name System)",
                "Port numbers and HTTP parts",
                "Fundamental understanding of HTTP"
            ],
            doc: "https://drive.google.com/file/d/1p7R5sOLiEiuDuruDUDwjVEbTVQrTc6h6/view"
        }
    ],
    education: [
        {
            id: 0,
            school: "Park College of Engineering and Technology",
            date: "2019 - 2023",
            grade: "7.15 CGPA",
            desc: "I successfully completed my Bachelor's degree in Information Technology...",
            degree: "Bachelor of Technology in Information and Technology - B.Tech IT"
        }
    ],
    projects: [
        {
            title: "Chat App MERN",
            date: "feb 2024 - Present",
            description: "Chat App MERN is a real-time messaging web application...",
            tags: ["ReactJS", "MongoDB", "ExpressJS", "nodeJS", "Auth", "JWT", "socket.io"],
            category: "web app",
            github: "https://github.com/Godson2611/Chat-App-MERN",
            webapp: "https://kaleidoscopic-capybara-d7f34d.netlify.app/",
            featured: true
        }
    ]
};

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log('Clearing database...');
        await User.deleteMany({});
        await Portfolio.deleteMany({});
        await Project.deleteMany({});
        await Experience.deleteMany({});
        await Education.deleteMany({});
        await Skill.deleteMany({});
        
        console.log('Creating admin user...');
        const adminUser = await User.create({
            email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
            password: process.env.ADMIN_PASSWORD || 'admin123',
            role: 'admin'
        });
        
        console.log('Seeding portfolio data...');
        const portfolio = await Portfolio.create({
            bio: sampleData.bio
        });
        
        console.log('Seeding skills...');
        for (const skillCat of sampleData.skills) {
            await Skill.create(skillCat);
        }
        
        console.log('Seeding experiences...');
        for (const exp of sampleData.experiences) {
            await Experience.create(exp);
        }
        
        console.log('Seeding education...');
        for (const edu of sampleData.education) {
            await Education.create(edu);
        }
        
        console.log('Seeding projects...');
        for (const proj of sampleData.projects) {
            await Project.create(proj);
        }
        
        console.log('Database seeded successfully!');
        console.log('Admin credentials:');
        console.log(`Email: ${adminUser.email}`);
        console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
        
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();