# 技术博客网站

一个简单的技术博客网站，支持Markdown文章发布和代码高亮。

## 功能特性

- ✅ 响应式设计（手机/电脑都能看）
- ✅ Markdown文章支持
- ✅ 代码语法高亮
- ✅ 简单的管理后台
- ✅ 无需数据库（文件存储）

## 快速开始

### 1. 安装依赖
```bash
cd tech-blog
npm install
```

### 2. 启动服务器
```bash
npm start
# 或开发模式
npm run dev
```

### 3. 访问网站
- 博客首页：http://localhost:3000
- 管理后台：http://localhost:3000/admin

## 部署到你的服务器

### 方法A：使用你的腾讯云服务器
```bash
# 1. 上传文件到服务器
scp -r tech-blog/ root@43.134.30.100:/root/

# 2. 在服务器上安装和运行
ssh root@43.134.30.100
cd /root/tech-blog
npm install
npm start

# 3. 使用PM2保持运行（推荐）
npm install -g pm2
pm2 start server.js --name tech-blog
pm2 save
pm2 startup
```

### 方法B：使用Nginx反向代理
```nginx
server {
    listen 80;
    server_name blog.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 文章管理

### 发布文章
1. 访问 `/admin`
2. 填写标题和Markdown内容
3. 点击发布

### 文章存储
- 文章保存在 `posts/` 目录
- 格式：`时间戳-标题.md`
- 包含Front Matter元数据

## 自定义样式

修改 `server.js` 中的CSS部分，或：
1. 创建 `public/css/style.css`
2. 在HTML中引用

## 后续扩展建议

1. **添加文章列表页** - 显示所有文章
2. **添加文章详情页** - 单独查看文章
3. **添加分类/标签** - 文章分类
4. **添加评论系统** - 使用第三方服务
5. **添加搜索功能** - 文章搜索
6. **添加RSS订阅** - 技术博客标配

## 技术栈
- Node.js + Express
- Marked (Markdown解析)
- Highlight.js (代码高亮)
- 纯前端，无数据库