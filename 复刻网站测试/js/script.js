// 初始DOM元素
const container = document.querySelector('.container');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const darkModeToggle = document.getElementById('theme-toggle');
const showAllBtn = document.querySelector('.show-all-btn');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素，确保所有元素都已加载
    const sectionHeaders = document.querySelectorAll('.section-header');
    const projectItems = document.querySelectorAll('.project-item');
    const infoButton = document.querySelector('#info-button .project-item');
    const timeElement = document.querySelector('.time');
    const dayElement = document.querySelector('.day');
    const locationElement = document.querySelector('.location');
    
    // 初始化日期和时间
    if (timeElement && dayElement && locationElement) {
        updateDateTime();
        setInterval(updateDateTime, 1000); // 每秒更新一次，以显示时间
    }

    // 初始化深色模式
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // 默认展开信息区块
    const infoSection = document.querySelector('#info-section .section-content');
    if (infoSection) {
        infoSection.classList.add('active');
    }

    // 为Info按钮添加点击事件
    if (infoButton) {
        infoButton.addEventListener('click', () => {
            console.log('Info按钮被点击'); // 添加日志便于调试
            
            // 移除其他项目的活动状态
            projectItems.forEach(project => project.classList.remove('active'));
            
            // 为当前项目添加活动状态
            infoButton.classList.add('active');
            
            // 加载Info详情
            loadInfoDetails();
            
            // 在移动设备上隐藏侧边栏
            if (window.innerWidth <= 900) {
                sidebar.style.height = '0';
                setTimeout(() => {
                    sidebar.style.height = 'auto';
                }, 500);
            }
        });
        
        // 默认点击Info按钮
        console.log('默认点击Info按钮');
        // 移除其他项目的活动状态
        projectItems.forEach(project => project.classList.remove('active'));
        // 为Info按钮添加活动状态
        infoButton.classList.add('active');
        // 加载Info详情
        loadInfoDetails();
    } else {
        console.error('未找到Info按钮元素');
        
        // 如果Info按钮不存在，则回退到加载第一个项目
        if (projectItems.length > 0) {
            projectItems[0].classList.add('active');
            loadProjectDetails(projectItems[0].getAttribute('data-id'));
        }
    }
    
    // 展开/折叠章节
    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const allContents = document.querySelectorAll('.section-content');
            
            // 关闭其他所有章节
            allContents.forEach(item => {
                if (item !== content) {
                    item.classList.remove('active');
                }
            });
            
            // 切换当前章节
            content.classList.toggle('active');
        });
    });
    
    // 项目点击事件
    projectItems.forEach(item => {
        // 跳过Info按钮，它已经有自己的事件处理
        if (item.getAttribute('data-type') === 'info') return;
        
        item.addEventListener('click', () => {
            // 移除其他项目的活动状态
            projectItems.forEach(project => project.classList.remove('active'));
            
            // 移除Info按钮的活动状态
            if (infoButton) infoButton.classList.remove('active');
            
            // 为当前项目添加活动状态
            item.classList.add('active');
            
            // 加载项目详情
            const projectId = item.getAttribute('data-id');
            loadProjectDetails(projectId);
            
            // 在移动设备上隐藏侧边栏
            if (window.innerWidth <= 900) {
                sidebar.style.height = '0';
                setTimeout(() => {
                    sidebar.style.height = 'auto';
                }, 500);
            }
        });
    });
    
    // 添加信息页面点击处理
    document.querySelectorAll('.info-item').forEach(item => {
        item.addEventListener('click', function() {
            const itemTitle = this.querySelector('h3').textContent.trim().toLowerCase();
            
            if (itemTitle === 'about me') {
                loadAboutPage();
            } else if (itemTitle === 'contact') {
                loadContactPage();
            }
            
            // 在移动设备上隐藏侧边栏
            if (window.innerWidth <= 900) {
                sidebar.style.height = '0';
                setTimeout(() => {
                    sidebar.style.height = 'auto';
                }, 500);
            }
        });
    });
});

// 更新日期和时间
function updateDateTime() {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayElement = document.querySelector('.day');
    const timeElement = document.querySelector('.time');
    const locationElement = document.querySelector('.location');
    
    if (!dayElement || !timeElement || !locationElement) return;
    
    dayElement.textContent = days[now.getDay()];
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    // 格式化为HH:MM:SS
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    locationElement.textContent = '北京,';
}

// 展示所有项目
showAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // 创建所有项目的网格视图 - 示例实现
    const projectsData = getAllProjects();
    let content = '<div class="all-projects-grid">';
    
    projectsData.forEach(project => {
        content += `
            <div class="project-card" data-id="${project.id}">
                <div class="project-card-thumbnail" style="background-color: ${project.color};">
                    ${project.thumbnail}
                </div>
                <div class="project-card-info">
                    <h3>${project.title}</h3>
                    <p>${project.shortDescription}</p>
                    <span class="project-card-year">${project.year}</span>
                </div>
            </div>
        `;
    });
    
    content += '</div>';
    
    mainContent.innerHTML = content;
    
    // 为项目卡片添加点击事件
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-id');
            loadProjectDetails(projectId);
            
            // 更新侧边栏选中状态
            const projectItems = document.querySelectorAll('.project-item');
            projectItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-id') === projectId) {
                    item.classList.add('active');
                }
            });
        });
    });
});

// 深色模式切换
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', darkModeToggle.checked);
});

// 加载项目详情
function loadProjectDetails(projectId) {
    // 显示加载状态
    mainContent.innerHTML = '<div class="loading"></div>';
    
    // 这里可以通过AJAX请求加载项目数据，或者使用预定义的数据
    // 示例使用静态数据
    setTimeout(() => {
        const projectData = getProjectData(projectId);
        
        if (!projectData) {
            mainContent.innerHTML = '<div class="error-message">项目未找到</div>';
            return;
        }
        
        // 渲染项目内容
        let content = `
            <div class="project-header">
                <h1 class="project-title">${projectData.title}</h1>
                <h2 class="project-subtitle">${projectData.subtitle}</h2>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <div class="meta-label">Client</div>
                        <div class="meta-value">${projectData.client}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Year</div>
                        <div class="meta-value">${projectData.year}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Services</div>
                        <div class="meta-value">${projectData.services.join(', ')}</div>
                    </div>
                </div>
            </div>
            
            <div class="project-description">
                ${projectData.description.map(para => `<p>${para}</p>`).join('')}
            </div>
        `;
        
        // 添加项目图片
        if (projectData.images && projectData.images.length > 0) {
            projectData.images.forEach(image => {
                content += `
                    <div class="project-image-container">
                        <img src="${image.src}" alt="${image.alt || projectData.title}" class="project-image">
                        ${image.caption ? `<div class="image-caption">${image.caption}</div>` : ''}
                    </div>
                `;
            });
        }
        
        mainContent.innerHTML = content;
        
        // 平滑滚动到顶部
        mainContent.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 500); // 模拟加载延迟以展示加载状态
}

// 加载Info详情
function loadInfoDetails() {
    console.log('正在加载Info详情'); // 添加日志便于调试
    
    // 显示加载状态
    mainContent.innerHTML = '<div class="loading"></div>';
    
    setTimeout(() => {
        // 渲染Info内容
        let content = `
            <div class="project-header">
                <h1 class="project-title">Info</h1>
                <h2 class="project-subtitle">About me and contact information</h2>
            </div>
            
            <div class="info-content">
                <div class="info-section">
                    <h3>About me</h3>
                    <p class="about-text">我是一个UI/UX设计师、AI独立开发者。
9年全职设计师工作中，我与创始人以及产品和技术人员紧密合作，打造品牌系统、产品和体验，力求通过我的工作引发有意义的变化，产出兼顾商业价值和用户体验的设计。设计工作总能得到用户、客户以及同事的认可。</p>
                </div>
                
                <div class="info-section">
                    <h3>Contact</h3>
                    <p>+86 18618349941</p>
                </div>
                
                <div class="info-section">
                    <h3>Location</h3>
                    <p>北京</p>
                </div>
            </div>
        `;
        
        mainContent.innerHTML = content;
        
        // 平滑滚动到顶部
        mainContent.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 500); // 模拟加载延迟以展示加载状态
}

// 加载关于页面
function loadAboutPage() {
    // 显示加载状态
    mainContent.innerHTML = '<div class="loading"></div>';
    
    fetch('data/about.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;
            mainContent.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        })
        .catch(error => {
            console.error('Error loading about page:', error);
            mainContent.innerHTML = '<div class="error-message">加载关于页面时出错</div>';
        });
}

// 加载联系页面
function loadContactPage() {
    // 显示加载状态
    mainContent.innerHTML = '<div class="loading"></div>';
    
    fetch('data/contact.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;
            
            // 动态加载联系页面样式
            if (!document.querySelector('link[href="css/contact.css"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'css/contact.css';
                document.head.appendChild(link);
            }
            
            mainContent.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        })
        .catch(error => {
            console.error('Error loading contact page:', error);
            mainContent.innerHTML = '<div class="error-message">加载联系页面时出错</div>';
        });
}

// 响应式布局调整
window.addEventListener('resize', () => {
    // 在大屏幕上确保侧边栏可见
    if (window.innerWidth > 900) {
        sidebar.style.height = '100vh';
    }
});

// 获取项目数据（从JSON文件加载）
function getProjectData(projectId) {
    // 从预定义的数据加载（实际项目中可以改为AJAX请求）
    // 这里使用了静态数据以简化演示
    return {
        'project1': {
            id: 'project1',
            title: "MASP",
            subtitle: "A modern identity for a modernist icon",
            client: "Museu de Arte de São Paulo",
            year: "2023",
            services: ["Brand Identity", "Visual System", "Signage"],
            description: [
                "MASP (Museu de Arte de São Paulo) is one of Latin America's most important cultural institutions, housed in a modernist architectural landmark designed by Lina Bo Bardi. We were commissioned to refresh their visual identity to complement the museum's iconic building and collection.",
                "Our approach centered on creating a flexible system that respects the museum's heritage while introducing contemporary elements that can adapt to its diverse programming and exhibitions.",
                "The new identity balances bold typography with purposeful use of space, creating a system that is both distinctive and functional across digital and physical applications."
            ],
            images: [
                {
                    src: "https://via.placeholder.com/1200x800/E74C3C/ffffff?text=MASP+Identity",
                    alt: "MASP brand identity",
                    caption: "The new identity system applied to various collateral materials"
                },
                {
                    src: "https://via.placeholder.com/1200x800/E74C3C/ffffff?text=MASP+Signage",
                    alt: "MASP signage system",
                    caption: "Environmental graphics and wayfinding designed to complement the architectural space"
                }
            ]
        },
        'project2': {
            id: 'project2',
            title: "Nike Run",
            subtitle: "A dynamic new identity rooted in legacy, built for the future",
            client: "Nike, Inc.",
            year: "2022",
            services: ["Brand Strategy", "Visual Identity", "Campaign"],
            description: [
                "Nike approached us to reimagine their running division's identity, seeking a system that could unite their diverse range of running products while maintaining the core essence of the Nike brand.",
                "We developed a flexible visual language that celebrates motion and progress, using dynamic typography and a gradient-based color system that evokes the energy of running.",
                "The result is a cohesive identity that works across physical and digital touchpoints, creating a recognizable presence for Nike Run while seamlessly integrating with the broader Nike ecosystem."
            ],
            images: [
                {
                    src: "https://via.placeholder.com/1200x800/000000/ffffff?text=Nike+Run+Identity",
                    alt: "Nike Run brand identity",
                    caption: "The refreshed Nike Run identity in application"
                }
            ]
        },
        'project3': {
            id: 'project3',
            title: "Robinhood",
            subtitle: "A grown-up identity for a finance pioneer",
            client: "Robinhood Markets, Inc.",
            year: "2021",
            services: ["Brand Strategy", "Brand Identity", "UX/UI Design"],
            description: [
                "As Robinhood evolved from a disruptive startup to an established financial platform, they needed a more sophisticated brand identity that maintained their approachable ethos while conveying trust and security.",
                "Our solution refined their iconic feather symbol and introduced a more nuanced typographic system and color palette that balanced friendliness with professionalism.",
                "We extended this new identity across their digital platforms, creating a consistent experience that helped signal the company's maturity while staying true to their mission of democratizing finance."
            ],
            images: [
                {
                    src: "https://via.placeholder.com/1200x800/73D216/ffffff?text=Robinhood+Identity",
                    alt: "Robinhood brand identity",
                    caption: "The evolved Robinhood identity system"
                }
            ]
        },
        'project4': {
            id: 'project4',
            title: "W Hotels",
            subtitle: "A global rebrand for a new era of luxury hospitality",
            client: "Marriott International",
            year: "2023",
            services: ["Brand Strategy", "Visual Identity", "Environmental Design"],
            description: [
                "W Hotels pioneered the concept of lifestyle luxury hotels, but as the category became more crowded, they needed to reassert their position as innovators in the space.",
                "We crafted a brand refresh that honored W's legacy of bold design while introducing a more sophisticated visual language that could flex across their global portfolio of properties.",
                "The new identity system includes a refined mark, a custom typeface, and an evolved color strategy that allows each property to maintain its unique character while clearly belonging to the W family."
            ],
            images: [
                {
                    src: "https://via.placeholder.com/1200x800/3465A4/ffffff?text=W+Hotels+Identity",
                    alt: "W Hotels brand identity",
                    caption: "The refreshed W Hotels brand identity in application"
                }
            ]
        },
        'project5': {
            id: 'project5',
            title: "MoMA",
            subtitle: "Exhibition Design",
            client: "Museum of Modern Art",
            year: "2022",
            services: ["Exhibition Design", "Environmental Graphics", "Publication Design"],
            description: [
                "For MoMA's retrospective exhibition on influential modernist designers, we were tasked with creating an exhibition design and identity that would complement the works on display while providing a fresh perspective.",
                "Our approach used subtle typographic treatments and a restrained color palette to create a context that highlighted the exhibited works without competing with them.",
                "The exhibition design extended to wayfinding elements, wall texts, and a comprehensive catalog that documented the exhibition while functioning as a standalone publication."
            ],
            images: [
                {
                    src: "https://via.placeholder.com/1200x800/646464/ffffff?text=MoMA+Exhibition",
                    alt: "MoMA exhibition design",
                    caption: "Exhibition spaces showcasing the modernist design retrospective"
                }
            ]
        }
    }[projectId];
}

// 获取所有项目数据
function getAllProjects() {
    return [
        {
            id: 'project1',
            title: "MASP",
            shortDescription: "A modern identity for a modernist icon",
            year: "2023",
            thumbnail: "MASP",
            color: "#E74C3C"
        },
        {
            id: 'project2',
            title: "Nike Run",
            shortDescription: "A dynamic new identity rooted in legacy, built for the future",
            year: "2022",
            thumbnail: "NIKE",
            color: "#000"
        },
        {
            id: 'project3',
            title: "Robinhood",
            shortDescription: "A grown-up identity for a finance pioneer",
            year: "2021",
            thumbnail: "RBHD",
            color: "#73D216"
        },
        {
            id: 'project4',
            title: "W Hotels",
            shortDescription: "A global rebrand for a new era of luxury hospitality",
            year: "2023",
            thumbnail: "W",
            color: "#3465A4"
        },
        {
            id: 'project5',
            title: "MoMA",
            shortDescription: "Exhibition Design",
            year: "2022",
            thumbnail: "MoMA",
            color: "#646464"
        }
    ];
} 