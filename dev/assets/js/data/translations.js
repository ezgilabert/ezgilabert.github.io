/**
 * translations.js
 * Translation data only; add a key here for each language or experience entry.
 */

window.TRANSLATIONS = {
    es: {
        meta_description: "Portfolio de Ezequiel Garcia Gilabert, desarrollador Senior .NET Full Stack en Buenos Aires.",
        profile_open: "Abrir perfil",
        profile_close: "Cerrar perfil",
        location_map_title: "Ver Buenos Aires en Google Maps",
        tablist_label: "Secciones del portfolio",
        language_toggle_title: "Cambiar idioma",
        theme_toggle_title: "Cambiar tema",
        theme_toggle_label: "Modo",
        cosmos_toggle_label: "Contemplar el fondo cósmico",
        cosmos_theme_toggle_label: "Cambiar modo oscuro o claro",
        cosmos_exit_label: "Volver al portfolio",
        experience_language_english: "Trabajo en inglés",
        role_kopius: "Senior .NET Full Stack Developer",
        role_axonier: "Ssr Full Stack Developer",
        role_arrow: "Ssr Full Stack Developer",
        role_octubre: "Jr. Full Stack Developer",
        bio: `Hola, soy <strong class="font-semibold text-zinc-900 dark:text-white">Ezequiel</strong>!<br><br>
        Desarrollador con más de 9 años de experiencia en el ecosistema <span class="font-medium underline underline-offset-4 decoration-black/30 dark:decoration-white/30">.NET</span>, especializado principalmente en sectores como <span class="font-medium underline underline-offset-4 decoration-black/30 dark:decoration-white/30">Healthcare e Insurance</span>.<br><br>
        Más allá de mi pasión por la ciencia y las nuevas tecnologías, lo que realmente me mueve es resolver problemas, que termina siendo ayudar a las personas: entender qué está pasando, descubrir por qué ocurre e intentar encontrar la mejor solución.<br><br>
        Soy curioso por naturaleza. Me encantan un montón de temas: desde juegos, cine y series hasta economía, marketing y geopolítica. ¡Y podría seguir!<br><br>
        Disfruto trabajar en equipo, enfrentar desafíos y estar ahí para ayudar cuando alguien lo necesita.`,
        cat_contact: "¡Contactame!",
        contact_title: "Hablemos",
        contact_subtitle: "Elegí el canal que más te convenga",
        contact_linkedin_desc: "Conectemos profesionalmente",
        contact_whatsapp_desc: "Respuesta rápida",
        nav_exp: "Experiencia",
        nav_skills: "Habilidades",
        nav_edu: "Educación",
        nav_contact: "Contacto",
        title_exp: "Experiencia Laboral",
        title_skills: "Habilidades Técnicas",
        cat_backend: "Backend & Arquitectura",
        cat_frontend: "Frontend & Frameworks",
        cat_db: "Bases de Datos & Reportes",
        cat_devops: "Cloud, DevOps & Herramientas",
        cat_ai: "IA & Desarrollo Moderno",
        title_edu: "Educación y Calificaciones",
        degree_title: "Título de Técnico Informático",
        degree_avg: "Promedio Académico: 8.0 / 10.0",
        degree_intro: "Formación técnica de 6 años en informática, con una sólida base en programación orientada a objetos, bases de datos, redes, software y hardware.",
        course_badge: "Curso",
        course_angular_title: "Angular: De cero a experto (Edición 2024)",
        course_angular_desc: "Formación intensiva en Angular moderno: componentes, directivas, servicios, routing, formularios reactivos, HTTP, signals, standalone components, testing y despliegue en producción.",
        course_node_title: "Node: De cero a experto (2022)",
        course_node_desc: "Formación completa en Node.js: creación de servidores, APIs REST, autenticación con JWT, bases de datos MongoDB, sockets en tiempo real y despliegue en producción.",
        title_contact: "¿Qué tenés en mente?",
        sub_contact: "Mandame un mensaje, contame tu idea y vemos qué podemos hacer!",
        ph_name: "Tu nombre",
        ph_email: "tu@email.com",
        ph_message: "Contame tu idea, tu proyecto o lo que necesites...",
        toast_copy: "Email copiado al portapapeles: ",
        toast_send: "Mensaje enviado exitosamente.",
        toast_send_error: "No se pudo enviar el mensaje. Intentá nuevamente.",
        toast_send_config: "El formulario todavía no está configurado. Contactame por email.",
        lists: {
            experience: {
                kopius: [
                    "Mantenimiento y evolución de una aplicación monolítica de healthcare en .NET y WinForms, utilizada para servicios de atención médica domiciliaria en Estados Unidos.",
                    "Migración progresiva de funcionalidades del monolito a módulos web embebidos (Pilets) con Angular dentro del mismo sistema.",
                    "Desarrollo y mantenimiento de microservicios en .NET Core y funcionalidades en un frontend Blazor, integrados con bases de datos existentes y nuevas.",
                    "Análisis y resolución de incidencias en producción, refactorización y mejoras de código enfocadas en la estabilidad y mantenibilidad de las aplicaciones.",
                    "Mantenimiento y optimización de bases de datos y stored procedures, además de creación y ajuste de reportes mediante acceso directo a SQL Server.",
                    "Trabajo colaborativo en Scrum con múltiples equipos de IT, brindando soporte y orientación técnica a compañeros.",
                    "Participación en reuniones técnicas con proveedores de APIs externas e incorporación de GitHub Copilot y herramientas MCP propias con subagentes."
                ],
                axonier: [
                    "Desarrollo y mantenimiento de dos nuevos portales de ventas internacionales: uno interno y otro para agencias de viaje.",
                    "Implementación de funcionalidades de punta a punta.",
                    "Resolución de bugs en producción, refactorización de código y mejoras orientadas a la estabilidad y mantenibilidad de las aplicaciones.",
                    "Mantenimiento de bases de datos y procedimientos almacenados (SP), con ajustes y actualizaciones según las necesidades de las aplicaciones.",
                    "Participación en otros proyectos de la empresa, incluido un gateway de pagos en .NET y un sistema core desarrollado en Java.",
                    "Trabajo colaborativo en un entorno ágil, con soporte y orientación a compañeros que se incorporaban al proyecto."
                ],
                arrow: [
                    "Me desempeñé como Dev Lead en una startup, definiendo el stack tecnológico, conversando con clientes, acompañando al equipo y desarrollando funcionalidades.",
                    "Colaboré en el desarrollo de un sistema de gestión de escritorio con WinForms y PostgreSQL.",
                    "Brindé apoyo en el desarrollo de e-commerce a medida con Angular, .NET Core, Entity Framework y PostgreSQL.",
                    "Colaboré en el desarrollo de un e-commerce con Laravel."
                ],
                octubre: [
                    "Desarrollo Full Stack .NET principalmente para los sistemas de gestión de OSPeRyH y la aseguradora Edificar del Grupo Octubre, dando soporte también a otras soluciones del grupo.",
                    "Mantenimiento de distintas instancias de una solución con JavaScript Vanilla en el frontend, .NET Framework en el backend y SQL Server como base de datos.",
                    "Resolución de bugs, refactorización y desarrollo o modificación de ABMs en frontend y backend, trabajando mediante tickets y prioridades del equipo.",
                    "Trabajo conjunto con analistas funcionales para aclarar requerimientos y validar tickets, con contacto ocasional con usuarios para resolver problemas.",
                    "Acceso ocasional a bases de datos productivas para realizar tareas puntuales de soporte.",
                    "Creación y modificación de reportes según las necesidades del equipo."
                ]
            },
            education: {
                degree: [
                    "Proyecto Final (POO + LINQ + Base de Datos): Desarrollo de un sistema de gestión completo aplicando Programación Orientada a Objetos, con acceso a datos mediante LINQ y persistencia en base de datos.",
                    "Proyecto Final de Videojuego: Desarrollo de un videojuego interactivo con Unity y C#.",
                    "Prácticas Profesionalizantes: 210 horas completadas."
                ],
                angularCourse: [
                    "Dominio de Angular CLI, componentes standalone, directivas y pipes personalizados.",
                    "Gestión de estado con servicios, RxJS, signals y patrones reactivos modernos.",
                    "Formularios reactivos, validaciones, routing con guards y lazy loading.",
                    "Integración con APIs REST, manejo de errores, interceptores y autenticación.",
                    "Buenas prácticas de arquitectura, testing con Jasmine/Karma y despliegue en producción."
                ],
                nodeCourse: [
                    "Creación de servidores backend y servicios REST con Express.",
                    "Gestión de archivos, subida de archivos y variables de entorno.",
                    "Conexión a MongoDB, modelos, validaciones y relaciones.",
                    "Autenticación con JWT, roles, middlewares y protección de rutas.",
                    "WebSockets con Socket.IO para aplicaciones en tiempo real.",
                    "Despliegue en Heroku, GitHub y entornos de producción.",
                    "Buenas prácticas, Git/GitHub y arquitectura escalable."
                ]
            }
        }
    },
    en: {
        meta_description: "Portfolio of Ezequiel Garcia Gilabert, a Senior .NET Full Stack Developer based in Buenos Aires.",
        profile_open: "Open profile",
        profile_close: "Close profile",
        location_map_title: "View Buenos Aires on Google Maps",
        tablist_label: "Portfolio sections",
        language_toggle_title: "Change language",
        theme_toggle_title: "Change theme",
        theme_toggle_label: "Theme",
        cosmos_toggle_label: "View the cosmic background",
        cosmos_theme_toggle_label: "Toggle dark or light mode",
        cosmos_exit_label: "Return to portfolio",
        experience_language_english: "English-speaking role",
        role_kopius: "Senior .NET Full Stack Developer",
        role_axonier: "Mid-level Full Stack Developer",
        role_arrow: "Mid-level Full Stack Developer",
        role_octubre: "Junior Full Stack Developer",
        bio: `Hi, I'm <strong class="font-semibold text-zinc-900 dark:text-white">Ezequiel</strong>!<br><br>
        I'm a developer with over 9 years of experience in the <span class="font-medium underline underline-offset-4 decoration-black/30 dark:decoration-white/30">.NET</span> ecosystem, specializing mainly in <span class="font-medium underline underline-offset-4 decoration-black/30 dark:decoration-white/30">healthcare and insurance</span>.<br><br>
        I'm passionate about science and new technologies, but what drives me most is solving problems and helping people. I enjoy understanding what is happening, figuring out why, and finding the best solution.<br><br>
        I am naturally curious. I love a wide range of things, from games, movies, and TV shows to economics, marketing, and geopolitics. I could go on!<br><br>
        I enjoy working as part of a team, taking on challenges, and being there to help when someone needs it.`,
        cat_contact: "Contact Me!",
        contact_title: "Let's talk",
        contact_subtitle: "Choose the channel that works best for you",
        contact_linkedin_desc: "Let's connect professionally",
        contact_whatsapp_desc: "Quick response",
        nav_exp: "Experience",
        nav_skills: "Skills",
        nav_edu: "Education",
        nav_contact: "Contact",
        title_exp: "Work Experience",
        title_skills: "Technical Skills",
        cat_backend: "Backend & Architecture",
        cat_frontend: "Frontend & UI Frameworks",
        cat_db: "Databases & Reporting",
        cat_devops: "Cloud, DevOps & Tools",
        cat_ai: "AI & Modern Development",
        title_edu: "Education & Qualifications",
        degree_title: "IT Technician Degree",
        degree_avg: "Academic GPA: 8.0 / 10.0",
        degree_intro: "Six-year technical education in IT, with a solid foundation in object-oriented programming, databases, networking, software, and hardware.",
        course_badge: "Course",
        course_angular_title: "Angular: From Zero to Expert (2024 Edition)",
        course_angular_desc: "Intensive training in modern Angular: components, directives, services, routing, reactive forms, HTTP, signals, standalone components, testing, and production deployment.",
        course_node_title: "Node: From Zero to Expert (2022)",
        course_node_desc: "Comprehensive Node.js training covering server creation, REST APIs, JWT authentication, MongoDB databases, real-time sockets, and production deployment.",
        title_contact: "What's on your mind?",
        sub_contact: "Send me a message, tell me your idea, and let's see what we can build together!",
        ph_name: "Your name",
        ph_email: "you@email.com",
        ph_message: "Tell me your idea, your project, or whatever you need...",
        toast_copy: "Email copied to clipboard: ",
        toast_send: "Message sent successfully.",
        toast_send_error: "The message could not be sent. Please try again.",
        toast_send_config: "The form is not configured yet. Please contact me by email.",
        lists: {
            experience: {
                kopius: [
                    "Maintained and evolved a monolithic .NET and WinForms healthcare application used for home care services in the United States.",
                    "Gradually migrated features from the monolith to embedded web modules (Pilets) built with Angular.",
                    "Developed and maintained .NET Core microservices and features in a Blazor frontend, integrated with existing and new databases.",
                    "Analyzed and resolved production incidents, refactored code, and improved application stability and maintainability.",
                    "Maintained and optimized databases and stored procedures, and created or updated reports by querying SQL Server directly.",
                    "Collaborated in a Scrum environment across multiple IT teams, providing support and technical guidance to teammates.",
                    "Participated in technical discussions with external API providers and adopted GitHub Copilot and custom MCP tools with subagents."
                ],
                axonier: [
                    "Developed and maintained two new international sales portals: one for internal users and one for travel agencies.",
                    "Delivered end-to-end features.",
                    "Resolved production bugs, refactored code, and improved application stability and maintainability.",
                    "Maintained databases and stored procedures (SPs), making adjustments and updates to support application needs.",
                    "Also contributed to other company projects, including a .NET payment gateway and a Java-based core system.",
                    "Collaborated in an Agile environment, supporting and guiding teammates as they joined the project."
                ],
                arrow: [
                    "As a development lead at a startup, I helped choose the technology stack, worked with clients, supported teammates, and developed features.",
                    "Assisted with the development of a desktop management system using WinForms and PostgreSQL.",
                    "Supported the development of custom e-commerce applications using Angular, .NET Core, Entity Framework, and PostgreSQL.",
                    "Contributed to the development of an e-commerce application with Laravel."
                ],
                octubre: [
                    "Primarily worked as a Full Stack .NET developer on the management systems for OSPeRyH and Edificar, Grupo Octubre's insurance company, while also supporting other group solutions.",
                    "Maintained multiple instances of a solution using vanilla JavaScript on the frontend, .NET Framework on the backend, and SQL Server.",
                    "Resolved bugs, refactored code, and developed or modified frontend and backend CRUD modules, working from tickets and team priorities.",
                    "Worked closely with functional analysts to clarify requirements and validate tickets, with occasional direct user support.",
                    "Occasionally accessed production databases to carry out specific support tasks.",
                    "Created and modified reports based on the team's needs."
                ]
            },
            education: {
                degree: [
                    "Final Project (OOP + LINQ + Database): Developed a complete management system using object-oriented programming, LINQ for data access, and database persistence.",
                    "Final Video Game Project: Developed an interactive video game with Unity and C#.",
                    "Professional Internship: Completed 210 hours."
                ],
                angularCourse: [
                    "Mastery of Angular CLI, standalone components, custom directives, and pipes.",
                    "State management with services, RxJS, signals, and modern reactive patterns.",
                    "Reactive forms, validations, routing with guards, and lazy loading.",
                    "REST API integration, error handling, interceptors, and authentication.",
                    "Architecture best practices, testing with Jasmine/Karma, and production deployment."
                ],
                nodeCourse: [
                    "Building backend servers and REST services with Express.",
                    "File management and uploads, and environment variables.",
                    "Connecting to MongoDB, with models, validations, and relationships.",
                    "JWT authentication, roles, middleware, and route protection.",
                    "WebSockets with Socket.IO for real-time applications.",
                    "Deployment to Heroku, GitHub, and production environments.",
                    "Best practices, Git/GitHub, and scalable architecture."
                ]
            }
        }
    }
};