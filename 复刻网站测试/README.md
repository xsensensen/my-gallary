# 设计工作室网站

这是一个基于HTML、CSS和JavaScript的设计工作室网站前端实现。该网站展示了设计工作室的项目作品集，并提供了简洁的用户界面来浏览不同项目的详细信息。

## 功能特点

- **响应式设计**：网站适配桌面和移动设备视图
- **深色/浅色模式**：支持切换深色和浅色显示模式
- **项目浏览**：侧边栏可浏览所有项目，点击后在主内容区域显示详情
- **信息分区**：分为项目、更新和信息三个主要区域
- **实时日期和时间**：顶部状态栏显示当前日期和时间
- **折叠式导航**：可以展开和折叠的侧边栏导航区域

## 技术实现

- **HTML5**：语义化结构，提供良好的可访问性
- **CSS3**：使用Flexbox布局，CSS变量和媒体查询实现响应式设计
- **JavaScript**：原生JS实现所有交互功能，包括：
  - 深色模式切换与状态保存（使用localStorage）
  - 动态加载项目内容
  - 导航区域的折叠展开
  - 日期时间显示
  - 响应式布局适配

## 文件结构

```
/
├── index.html           # 主HTML文件
├── css/
│   ├── style.css        # 主样式文件
│   └── normalize.css    # CSS重置文件
├── js/
│   └── script.js        # JavaScript交互功能
├── data/
│   └── about.html       # 关于页面内容
├── images/              # 图片资源目录（项目使用了占位图片）
└── README.md            # 项目说明文件
```

## 使用说明

1. 克隆或下载本仓库
2. 使用现代浏览器打开`index.html`文件
3. 点击侧边栏中的项目查看详情
4. 使用状态栏中的切换按钮更改深色/浅色模式

## 自定义

### 添加新项目

在`script.js`文件中的`getProjectData`函数内添加新的项目数据，格式如下：

```javascript
'projectX': {
  id: 'projectX',
  title: "项目标题",
  subtitle: "项目副标题",
  client: "客户名称",
  year: "年份",
  services: ["服务类型1", "服务类型2"],
  description: [
    "项目描述段落1",
    "项目描述段落2"
  ],
  images: [
    {
      src: "图片URL",
      alt: "图片描述",
      caption: "图片说明"
    }
  ]
}
```

然后在`index.html`的项目列表中添加对应的项目项：

```html
<div class="project-item" data-id="projectX">
  <h3>项目标题</h3>
  <div class="project-details">
    <p>项目类型</p>
    <span class="project-year">年份</span>
  </div>
</div>
```

## 浏览器兼容性

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 注意事项

- 网站目前使用了占位图片，实际部署时需要替换为真实项目图片
- 为获得最佳性能，建议优化和压缩图片

## 许可

MIT License

---
© 2023 Porto Rocha Design Studio 