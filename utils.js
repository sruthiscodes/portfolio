// Shared utilities and data

// Portfolio data object
const portfolioData = {
    projects: [
        {
            title: "Neurocontrol System for Prosthetic Devices",
            description: "Developing a non-invasive brain-computer interface that decodes EEG signals from the motor cortex to control assistive prosthetic devices. This project involves applying Continuous Wavelet Transform on PhysioNet EEG motor imagery data and building a spatio-temporal CNN for real-time classification using Python, TensorFlow, MNE, and CWT.",
            github_link: "https://github.com/sruthiscodes/capstone"
        },
        {
            title: "Multi-Modal Adventure Story Engine",
            description: "Designed and built a dynamic storytelling engine that combines local large language models with both text and visual outputs to create immersive narrative scenes. Utilized Python, llama.cpp, ChromaDB, and Replicate API for image diffusion, deploying a FastAPI backend to enable multi-turn user interactions and maintain plot continuity.",
            github_link: "https://github.com/sruthiscodes/adventure-story-game"
        },
        {
            title: "Gesture-Controlled Drone",
            description: "Developed an innovative gesture-based drone control system using ROS 2 Humble, simulated in Gazebo. Integrated MediaPipe for real-time hand gesture recognition and landmark detection, and implemented the control logic in Python to translate gestures into drone commands. Structured the project with modular ROS 2 packages, managed via CMake and setup.py, and built with colcon on Linux for seamless deployment.",
            github_link: "https://github.com/sruthiscodes/gesture-controlled-drone"
        },
        {
            title: "EmoStream – Real-Time Reaction Pipeline",
            description: "Created a real-time emoji-based feedback system for live video content engagement. Developed asynchronous Flask APIs with millisecond latency, integrated Kafka's pub/sub architecture for high-throughput event streaming, and processed events with Spark Streaming to enable dynamic content personalization.",
            github_link: "https://github.com/sruthiscodes/emostream"
        },
        {
            title: "Secure Live Video Streaming Platform",
            description: "Built a privacy-focused live video transmission system optimized for low-latency and encrypted delivery across devices. Implemented SSL encryption alongside an OpenCV-based frame processing pipeline to enable secure, real-time peer-to-peer media exchange over TCP sockets.",
            github_link: "https://github.com/sruthiscodes/live-video-streaming"
        },
        {
            title: "Nimble: Scalable Restaurant Discovery & Ordering Platform",
            description: "Created a full-stack eCommerce application using the MERN stack, featuring a scalable design for restaurant discovery and ordering. Developed RESTful APIs for menu browsing, cart management, and secure order placement, with robust user authentication, session management, and real-time order tracking to enhance user experience.",
            github_link: "https://github.com/sruthiscodes/nimble"
        }
    ],
    experiences: [
        {
            role: "Summer Intern",
            company: "dentsu, Bengaluru, India",
            dates: "June 2025 – July 2025",
            description: "• Built a scalable Model Context Protocol (MCP) framework for Merkury, managing 260+ million user profiles\n• Developed a secure natural language to SQL tool using Snowflake Cortex Analyst and Azure OpenAI\n• Used LangGraph to orchestrate an XGBoost-based lookalike audience model for automated targeting\n• Created MCP tools to enable agentic AI workflows across enterprise applications"
        }
    ],
    aboutMe: {
        bio: "I'm currently a senior at PES University in Bengaluru, grinding through my Computer Science Engineering degree (with equal parts love and chaos). I got my first tiny Lenovo laptop at age four, which sparked my ever-curious brain. That feeling just kept growing and today, I build stuff, aiming to fix things with tech, one small step at a time. Still figuring it out. Still chasing that same spark :)",
        skills: {
            "Languages & Core": [
                { name: "Python", icon: "python.svg" },
                { name: "C", icon: "c.svg" },
                { name: "SQL", icon: "mysql.svg" }
            ],
            "ML/AI Frameworks": [
                { name: "TensorFlow", icon: "tensorflow.svg" },
                { name: "PyTorch", icon: "pytorch.svg" },
                { name: "scikit-learn", icon: "scikitlearn.svg" }
            ],
            "Data Engineering": [
                { name: "Kafka", icon: "apachekafka.svg" },
                { name: "Spark", icon: "apachespark.svg" },
                { name: "Snowflake", icon: "snowflake.svg" },
                { name: "Hadoop", icon: "apachehadoop.svg" }
            ]
        },
        education: [
            {
                year: "2022–2026",
                degree: "Bachelor of Technology in Computer Science and Engineering",
                institution: "PES University, Bengaluru",
                score: "9.05/10"
            },
            {
                year: "2022",
                degree: "Indian School Certificate (12th Grade)",
                institution: "NPS International, Chennai",
                score: "93.8%"
            },
            {
                year: "2020",
                degree: "Indian Certificate of Secondary Education (10th Grade)",
                institution: "NPS International, Chennai",
                score: "94.17%"
            }
        ],
          resume_link: "https://drive.google.com/file/d/1R0U3IRAHfpFIeKElfqRq9KWfT3EaOVR9/view?usp=sharing"
    },
    contact: {
        email: "sruthisivakumar31@gmail.com",
        linkedin: "https://www.linkedin.com/in/sruthisivakumar31/",
        github_profile: "https://github.com/sruthiscodes"
    }
};
