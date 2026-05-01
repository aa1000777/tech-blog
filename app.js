// 文档数据 - 包含所有文档的信息
const docs = [
    {
        id: 'AGENTS',
        title: 'AGENTS.md',
        category: 'core',
        tags: ['配置'],
        path: './docs/AGENTS.md',
        preview: '工作空间的核心配置文档，包含工具使用策略、内存管理、群聊行为准则等...',
        content: null
    },
    {
        id: 'IDENTITY',
        title: 'IDENTITY.md',
        category: 'core',
        tags: ['配置'],
        path: './docs/IDENTITY.md',
        preview: '我的名字是小，我是臣的专属助手...',
        content: null
    },
    {
        id: 'USER',
        title: 'USER.md',
        category: 'core',
        tags: ['配置'],
        path: './docs/USER.md',
        preview: '用户名叫臣，做安卓开发，称呼我为小...',
        content: null
    },
    {
        id: 'SOUL',
        title: 'SOUL.md',
        category: 'core',
        tags: ['配置'],
        path: './docs/SOUL.md',
        preview: '核心原则、行为准则、专长、工作目录结构...',
        content: null
    },
    {
        id: 'MEMORY',
        title: 'MEMORY.md',
        category: 'memory',
        tags: ['记忆'],
        path: './docs/MEMORY.md',
        preview: 'VPN配置知识、端口封锁解决方案、重要约定记录...',
        content: null
    },
    {
        id: 'TOOLS',
        title: 'TOOLS.md',
        category: 'core',
        tags: ['配置'],
        path: './docs/TOOLS.md',
        preview: '本地工具配置备注，如SSH、TTS、摄像头等...',
        content: null
    },
    {
        id: 'HEARTBEAT',
        title: 'HEARTBEAT.md',
        category: 'core',
        tags: ['配置'],
        path: './docs/HEARTBEAT.md',
        preview: '心跳检查清单配置...',
        content: null
    },
    {
        id: 'memory-2026-03-01',
        title: '2026-03-01',
        category: 'memory',
        tags: ['记忆'],
        path: './memory/2026-03-01.md',
        preview: '深入学习WireGuard配置、多设备同时在线、MTU调优、DNS优化...',
        content: null
    },
    {
        id: 'memory-2026-04-10',
        title: '2026-04-10',
        category: 'memory',
        tags: ['记忆'],
        path: './memory/2026-04-10.md',
        preview: '端口封锁的应对策略、非标准端口选择、规避策略...',
        content: null
    },
    {
        id: 'memory-2026-04-22',
        title: '2026-04-22',
        category: 'memory',
        tags: ['记忆'],
        path: './memory/2026-04-22.md',
        preview: '日常记忆记录...',
        content: null
    },
    // 项目文档
    {
        id: 'project-list',
        title: '📦 项目列表',
        category: 'project',
        tags: ['项目'],
        path: './projects/',
        preview: '我维护的所有项目索引',
        content: null,
        isLink: true
    },
    {
        id: 'dev-plan-v3',
        title: '📋 开发计划 v3（完整项目）',
        category: 'project',
        tags: ['Android', '投屏'],
        path: './docs/DEVELOPMENT_PLAN_v3.md',
        preview: '完整项目计划v3：SDK+App双模块、7周计划、验收标准、错误码、发布流程...',
        content: null
    },
    {
        id: 'project-asm',
        title: '📱 AndroidScreenMirror',
        category: 'project',
        tags: ['Android', '投屏'],
        path: './projects/AndroidScreenMirror/',
        preview: '安卓屏幕镜像项目，支持WiFi P2P/TCP/UDP，低延迟优化',
        content: null,
        isLink: true
    },
    {
        id: 'project-vpn',
        title: '🔒 VPN',
        category: 'project',
        tags: ['WireGuard', 'VPN'],
        path: './projects/vpn/',
        preview: 'WireGuard VPN 配置文件，用于安全稳定的科学上网',
        content: null,
        isLink: true
    },
    {
        id: 'project-blog',
        title: '📝 Tech Blog',
        category: 'project',
        tags: ['Node.js', '博客'],
        path: './projects/tech-blog/',
        preview: '基于 Node.js + Express 的静态博客系统',
        content: null,
        isLink: true
    }
];

let currentCategory = 'all';
let currentDoc = null;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderDocList();
    updateRecentList();
});

// 切换侧边栏
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
    document.body.classList.toggle('sidebar-open');
}

// 显示所有文档
function showAllDocs() {
    currentCategory = 'all';
    showCategory('all');
}

function showCategory(category) {
    currentCategory = category;
    const categoryNames = {
        'all': '📋 全部文档',
        'core': '⚙️ 核心配置',
        'memory': '🧠 记忆档案',
        'project': '📱 项目文档'
    };
    
    document.getElementById('currentCategory').textContent = categoryNames[category] || category;
    document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
    
    // 关闭侧边栏
    toggleSidebar();
    
    renderDocList();
}

// 渲染文档列表
function renderDocList() {
    const filtered = currentCategory === 'all' 
        ? docs 
        : docs.filter(d => d.category === currentCategory);
    
    const docCountEl = document.getElementById('docCount');
    const docListEl = document.getElementById('docList');
    
    docCountEl.textContent = `${filtered.length} 个文档`;
    
    if (filtered.length === 0) {
        docListEl.innerHTML = `
            <div class="empty-state">
                <div class="icon">📭</div>
                <p>暂无文档</p>
            </div>
        `;
        return;
    }
    
    const icons = {
        'core': '📄',
        'memory': '🧠',
        'project': '📱'
    };
    
    docListEl.innerHTML = filtered.map(doc => `
        <div class="doc-card" onclick="openDoc('${doc.id}')">
            <h3>${icons[doc.category] || '📄'} ${doc.title}</h3>
            <div class="doc-meta">
                <span>📁 ${doc.category}</span>
            </div>
            <div class="doc-preview">${doc.preview}</div>
            <div class="doc-tags">
                ${doc.tags.map(tag => `<span class="tag ${tag === '记忆' ? 'memory' : ''}">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// 更新最近访问
function updateRecentList() {
    const recentList = document.querySelector('.recent-list');
    if (!recentList) return;
    
    const recentDocs = [...docs].slice(0, 5);
    const items = recentDocs.map(doc => 
        `<li class="category-item" onclick="openDoc('${doc.id}'); toggleSidebar();">
            📄 ${doc.title}
        </li>`
    ).join('');
    
    recentList.innerHTML = `<li class="sidebar-title">🕐 最近访问</li>${items}`;
}

// 搜索过滤
function filterDocs() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    if (!query) {
        renderDocList();
        return;
    }
    
    const filtered = docs.filter(doc => 
        doc.title.toLowerCase().includes(query) || 
        doc.preview.toLowerCase().includes(query)
    );
    
    document.getElementById('docCount').textContent = `${filtered.length} 个文档`;
    document.getElementById('currentCategory').textContent = '🔍 搜索结果';
    
    const docList = document.getElementById('docList');
    
    if (filtered.length === 0) {
        docList.innerHTML = `
            <div class="empty-state">
                <div class="icon">🔍</div>
                <p>没有找到相关文档</p>
            </div>
        `;
        return;
    }
    
    const icons = { 'core': '📄', 'memory': '🧠', 'project': '📱' };
    
    docList.innerHTML = filtered.map(doc => `
        <div class="doc-card" onclick="openDoc('${doc.id}')">
            <h3>${icons[doc.category] || '📄'} ${doc.title}</h3>
            <div class="doc-preview">${doc.preview}</div>
        </div>
    `).join('');
}

// 打开文档
async function openDoc(docId) {
    const doc = docs.find(d => d.id === docId);
    if (!doc) return;
    
    // 如果是链接类型，直接跳转
    if (doc.isLink) {
        window.location.href = doc.path;
        return;
    }
    
    showLoading();
    
    try {
        // 直接获取完整内容用于显示
        const content = await loadDocContent(doc.path);
        doc.content = content;
        currentDoc = doc;
        
        document.getElementById('modalTitle').textContent = doc.title;
        document.getElementById('modalBody').innerHTML = marked.parse(content);
        document.getElementById('modalBody').className = 'modal-body markdown-body';
        document.getElementById('docModal').classList.add('active');
        
        // 关闭侧边栏
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('open');
        
    } catch (error) {
        console.error('加载失败:', error);
        document.getElementById('modalBody').innerHTML = `
            <div class="empty-state">
                <div class="icon">❌</div>
                <p>文档加载失败</p>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">${error.message}</p>
            </div>
        `;
        document.getElementById('docModal').classList.add('active');
    }
}

// 加载文档内容
async function loadDocContent(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
}

// 显示加载中
function showLoading() {
    document.getElementById('modalBody').innerHTML = `
        <div class="loading"></div>
    `;
}

// 复制内容
function copyContent() {
    if (currentDoc && currentDoc.content) {
        navigator.clipboard.writeText(currentDoc.content).then(() => {
            alert('内容已复制到剪贴板');
        }).catch(() => {
            alert('复制失败');
        });
    }
}

// 关闭模态框
function closeModal() {
    document.getElementById('docModal').classList.remove('active');
    currentDoc = null;
}

// 点击模态框背景关闭
document.getElementById('docModal').addEventListener('click', (e) => {
    if (e.target.id === 'docModal') {
        closeModal();
    }
});

// ESC 关闭
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 阻止 modal 内容点击冒泡
document.querySelector('.modal-content')?.addEventListener('click', (e) => {
    e.stopPropagation();
});