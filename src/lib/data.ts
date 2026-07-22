import type { KnowledgeArticle } from './types';

// 核心知识文章数据 - 精品课程级内容
export const knowledgeArticles: KnowledgeArticle[] = [
  // ==================== Linux/Ubuntu 基础 ====================
  {
    id: 'linux-basics',
    slug: 'linux-basics',
    title: 'Linux 基础命令与操作',
    category: 'linux-ubuntu',
    tags: ['Linux', '命令行', '终端', '文件系统'],
    summary: '学习 ROS 前必须掌握的 Linux 基础命令，包括文件操作、权限管理、进程管理等核心技能。',
    difficulty: 'beginner',
    readingTime: 15,
    prerequisites: [],
    // 精品课程字段
    introHook: {
      problem: '你在 Windows 上习惯了图形界面，面对 Linux 终端一筹莫展，不知道如何导航文件系统、运行程序',
      scenario: '想象你刚装好 Ubuntu，需要创建一个 ROS 工作空间，但连 ls、cd 都不熟悉——这就是你现在的处境'
    },
    learningObjectives: [
      '能在终端中使用 ls、cd、pwd 自由导航文件系统',
      '能使用 mkdir、cp、mv、rm 创建和管理文件与目录',
      '理解文件权限并能使用 chmod 和 sudo',
      '能使用管道和 grep 过滤命令输出',
      '能使用 man 或 --help 查阅命令帮助'
    ],
    prerequisite: {
      questions: [
        { question: '你能否说出 Windows 和 Linux 文件路径的区别？', hint: 'Windows 用反斜杠，Linux 用正斜杠' },
        { question: '你是否知道什么是"当前工作目录"？', hint: 'pwd 命令显示的路径就是当前工作目录' },
        { question: '你是否理解"以点开头的文件是隐藏文件"？', hint: '如 .bashrc，需要 ls -a 才能看到' }
      ]
    },
    intuition: {
      analogy: '终端就像一个"文字版文件管理器"。你输入的每条命令相当于点击图标或菜单。ls 是打开文件夹查看，cd 是双击进入子文件夹，pwd 是看地址栏。区别是：所有操作都用键盘完成，而且更精确。',
      boundaries: '类比局限：终端不仅能操作文件，还能启动程序、配置系统、连接网络——这是图形界面做不到的。而且终端命令一旦执行不可撤销，没有"撤销"按钮。'
    },
    timeline: [
      { time: '00:00', title: '场景导入', description: '为什么ROS开发必须掌握Linux命令' },
      { time: '02:00', title: '文件导航', description: 'ls, cd, pwd, 文件路径概念' },
      { time: '05:00', title: '文件操作', description: 'mkdir, cp, mv, rm, touch' },
      { time: '09:00', title: '权限管理', description: 'chmod, chown, sudo, 隐藏文件' },
      { time: '12:00', title: '管道与查找', description: '管道|, grep, find, man' },
      { time: '14:00', title: '实践验收', description: '完成练习并检查结果' }
    ],
    minimalPractice: {
      terminal: '终端（任意目录）',
      currentDirectory: '~（用户主目录）',
      source: '无需 source',
      commands: [
        { command: 'pwd', explanation: '显示当前工作目录，确认你在哪里' },
        { command: 'ls -la', explanation: '列出所有文件，包括隐藏文件，显示详细信息' },
        { command: 'mkdir -p ~/ros_test/subdir', explanation: '创建测试目录结构（-p 同时创建父目录）' },
        { command: 'echo "Hello ROS" > ~/ros_test/test.txt', explanation: '创建文件并写入内容' },
        { command: 'cat ~/ros_test/test.txt', explanation: '查看文件内容，确认写入成功' },
        { command: 'rm -rf ~/ros_test', explanation: '清理测试目录（-r 递归，-f 强制）' }
      ],
      expectedOutput: 'pwd 显示 /home/你的用户名；ls -la 显示文件列表；cat 显示 Hello ROS；最后清理成功'
    },
    misconceptions: [
      {
        misconception: '认为 rm -rf 很危险所以完全不敢用',
        rootCause: '只听到"危险"警告，不理解参数含义和使用场景',
        fix: '危险在于误删重要文件。练习时在 ~/test 等安全目录操作；删除前用 ls 确认路径；养成 tab 补全习惯避免拼写错误'
      },
      {
        misconception: '所有命令都需要 sudo',
        rootCause: '不理解 Linux 权限模型，把 sudo 当成万能钥匙',
        fix: 'sudo 只在操作系统级文件（/usr, /opt, /etc）时需要。操作自己主目录（~）下的文件不需要 sudo。过度使用 sudo 反而会造成权限混乱。'
      },
      {
        misconception: '把终端命令当"黑魔法"，不理解命令参数',
        rootCause: '死记硬背而不是理解命令结构',
        fix: '命令格式：命令 [选项] [参数]。选项通常以 - 开头。用 man 命令 或 命令 --help 查看说明。例如 man ls 了解每个选项含义。'
      }
    ],
    practice: {
      basic: {
        task: '创建 ~/ros_learn 目录，在其中创建 readme.txt 文件，写入"我的ROS学习笔记"',
        hints: ['使用 mkdir 创建目录', '使用 echo 和 > 写入文件', '使用 cat 验证内容'],
        verifyCommand: 'ls ~/ros_learn && cat ~/ros_learn/readme.txt'
      },
      intermediate: {
        task: '修改 read.txt 的权限为只有所有者可读写，其他用户不可访问',
        hints: ['chmod 数字模式：读=4，写=2，执行=1', '600 表示所有者读写，其他人无权限'],
        verifyCommand: 'ls -la ~/ros_learn/read.txt | grep "\\-rw-------"'
      },
      advanced: {
        task: '使用 find 查找系统中所有名为 "*.launch" 的文件，并统计数量',
        hints: ['find ~ -name "*.launch" 查找主目录下的 launch 文件', '配合 | wc -l 统计行数'],
        verifyCommand: 'find ~ -name "*.launch" 2>/dev/null | wc -l'
      }
    },
    pauseAndThink: [
      {
        question: '如果每次打开终端都需要先 cd 到某个目录，有没有更简单的方法？',
        answer: '可以在 ~/.bashrc 末尾添加 cd 命令，这样每次打开终端都会自动进入目标目录。例如：echo "cd ~/catkin_ws" >> ~/.bashrc'
      },
      {
        question: '为什么有时候用 ./script.sh 运行脚本，有时候用 bash script.sh？',
        answer: './script.sh 直接执行脚本文件，需要文件有执行权限（chmod +x）。bash script.sh 是显式用 bash 解释器运行，不需要执行权限。两者在脚本指定了非 bash 解释器（如 #!/usr/bin/python3）时行为不同。'
      }
    ],
    quiz: [
      {
        id: 'linux-quiz-1',
        question: '要在终端查看当前所在目录的完整路径，应该用什么命令？',
        options: ['ls', 'pwd', 'cd', 'where'],
        correctAnswer: 1,
        explanation: 'pwd (print working directory) 显示当前工作目录的完整路径。ls是列出内容，cd是切换目录。'
      },
      {
        id: 'linux-quiz-2',
        question: '以下哪个命令可以安全地删除一个非空目录？',
        options: ['rm 目录名', 'rm -f 目录名', 'rm -r 目录名', 'del 目录名'],
        correctAnswer: 2,
        explanation: 'rm -r 递归删除目录及其内容。-f是强制删除不提示，单独rm不能删除目录，del不是Linux命令。'
      },
      {
        id: 'linux-quiz-3',
        question: '执行命令时提示"Permission denied"，最合适的解决方案是？',
        options: ['使用 rm -f 强制执行', '使用 sudo 或 chmod +x', '重启电脑', '换一个终端'],
        correctAnswer: 1,
        explanation: 'Permission denied 表示权限不足。对于系统文件用sudo，对于脚本文件用chmod +x添加执行权限。'
      },
      {
        id: 'linux-quiz-4',
        question: '要将两个命令的输出串联起来（如：查找ros相关进程），应该使用？',
        options: ['ps aux ros', 'ps aux > grep ros', 'ps aux | grep ros', 'ps aux && grep ros'],
        correctAnswer: 2,
        explanation: '管道符 | 将前一命令的输出作为后一命令的输入。ps aux列出所有进程，grep ros筛选含ros的行。'
      }
    ],
    reviewSummary: '核心命令：ls/cd/pwd 导航，mkdir/cp/mv/rm 操作文件，chmod/sudo 管理权限，管道和 grep 过滤。记住 Tab 补全、Ctrl+C 终止、man/--help 查帮助。',
    nextLesson: '掌握了 Linux 基础后，下一步是安装 Ubuntu 系统并配置 ROS 开发环境。',
    nextLessonLink: 'ubuntu-setup',
    sources: [
      { title: 'Ubuntu 官方终端教程', url: 'https://ubuntu.com/tutorials/command-line-for-beginners', sourceType: 'official', version: 'Ubuntu 20.04', verifiedAt: '2024-01-01' },
      { title: 'Linux 命令行大全（GNU Bash Manual）', url: 'https://www.gnu.org/software/bash/manual/', sourceType: 'official', version: 'Bash 5.0', verifiedAt: '2024-01-01' }
    ],
    // 原有字段
    content: {
      explanation: `Linux 是 ROS 开发的基础操作系统。作为机器人开发者，你需要熟练使用终端进行各种操作。本节介绍最常用的 Linux 命令。

终端（Terminal）是你与 Linux 系统交互的主要界面。通过输入命令，你可以控制整个系统。

常用命令分类：
- 文件操作：ls, cd, cp, mv, rm, mkdir
- 权限管理：chmod, chown, sudo
- 进程管理：ps, top, kill
- 网络命令：ping, ifconfig, ssh
- 文本处理：cat, grep, nano/vim`,
      whyImportant: 'ROS 开发几乎完全在终端中进行。无论是运行节点、查看话题、还是调试程序，都需要熟练的命令行技能。不掌握这些基础，后续学习将寸步难行。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 查看当前目录内容
ls -la

# 进入目录
cd ~/catkin_ws/src

# 创建目录
mkdir -p my_robot/src

# 复制文件
cp ~/file.txt ~/backup/

# 查看文件内容
cat ~/.bashrc | grep ROS

# 查找文件
find ~ -name "*.launch"

# 查看进程
ps aux | grep ros`,
          description: '常用文件和进程管理命令',
          expectedOutput: '命令执行后显示相应的文件列表、进程信息等'
        },
        {
          language: 'bash',
          code: `# 修改文件权限（添加可执行权限）
chmod +x my_script.sh

# 以管理员权限运行命令
sudo apt update

# 查看环境变量
echo $ROS_PACKAGE_PATH

# 管道操作：查找包含关键词的行
rostopic list | grep cmd_vel`,
          description: '权限和环境变量相关命令'
        }
      ],
      commonErrors: [
        {
          error: 'Permission denied',
          cause: '当前用户没有执行文件的权限',
          solution: '使用 chmod +x filename 添加可执行权限，或使用 sudo 执行'
        },
        {
          error: 'No such file or directory',
          cause: '路径错误或文件不存在',
          solution: '使用 ls 检查路径，使用 pwd 确认当前目录'
        },
        {
          error: 'Command not found',
          cause: '命令不存在或未安装',
          solution: '检查命令拼写，使用 apt install 安装缺失的包'
        }
      ],
      tips: [
        '使用 Tab 键自动补全命令和路径',
        '使用 Ctrl+C 终止正在运行的命令',
        '使用上下箭头键查看历史命令',
        '使用 man 命令名 查看命令手册'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'Ubuntu 官方文档', url: 'https://ubuntu.com/tutorials/command-line-for-beginners' },
      { title: 'Linux 命令行大全', url: 'https://www.gnu.org/software/bash/manual/' }
    ],
    applicableVersions: ['Ubuntu 18.04', 'Ubuntu 20.04'],
    relatedArticles: ['ubuntu-setup', 'git-basics', 'ros-installation'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== Ubuntu 安装与 ROS 环境配置 ====================
  {
    id: 'ubuntu-setup',
    slug: 'ubuntu-setup',
    title: 'Ubuntu 系统安装与 ROS 环境配置',
    category: 'linux-ubuntu',
    tags: ['Ubuntu', '安装', '环境配置', '双系统'],
    summary: '详细介绍 Ubuntu 系统的安装方法，以及 ROS 开发环境的完整配置流程。',
    difficulty: 'beginner',
    readingTime: 20,
    prerequisites: ['linux-basics'],
    introHook: {
      problem: '你想开始学习 ROS，但不知道怎么搭建开发环境，担心安装过程复杂出错',
      scenario: '就像新房子入住前需要水电煤气和家具，ROS 开发也需要配置好操作系统、环境变量和工作空间'
    },
    learningObjectives: [
      '能根据硬件条件选择合适的 Ubuntu 安装方式',
      '能独立完成 ROS Noetic 的完整安装',
      '理解环境变量 ROS_MASTER_URI 和 ROS_IP 的作用',
      '能正确配置 .bashrc 中的 ROS 环境变量',
      '能解决常见的环境配置问题'
    ],
    prerequisite: {
      questions: [
        { question: '你是否了解自己电脑的 BIOS/UEFI 启动方式？', hint: '现代电脑多为 UEFI，需要关闭 Secure Boot' },
        { question: '你是否有足够的磁盘空间（建议 50GB+）？', hint: 'ROS 和 Gazebo 会占用较大空间' },
        { question: '你是否知道 ROS Noetic 对应 Ubuntu 20.04？', hint: 'ROS 版本与 Ubuntu 版本严格对应' }
      ]
    },
    intuition: {
      analogy: '安装 ROS 就像装修房子：先打好地基（Ubuntu 系统），再安装水电（ROS 核心），最后配置家具（工作空间和环境变量）。环境变量就像房间的开关面板，每次进入房间（打开终端）都需要按正确的顺序打开开关。',
      boundaries: '类比局限：装修是一次性的，但 ROS 环境需要持续维护。每次打开新终端都要 source，就像每次进房间都要开灯——除非你把开关接到总闸（写入 .bashrc）。'
    },
    timeline: [
      { time: '00:00', title: '安装方式对比', description: '虚拟机/双系统/WSL2 的优缺点' },
      { time: '03:00', title: 'Ubuntu 安装', description: '下载镜像、制作启动盘、安装步骤' },
      { time: '08:00', title: 'ROS 安装', description: '添加源、安装包、环境配置' },
      { time: '14:00', title: '环境变量', description: 'ROS_MASTER_URI、ROS_IP 的作用' },
      { time: '17:00', title: '验证与排错', description: '运行小海龟、常见问题解决' },
      { time: '19:00', title: '实践验收', description: '完成环境配置检查' }
    ],
    minimalPractice: {
      terminal: '终端（Ubuntu 系统）',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'echo $ROS_DISTRO', explanation: '确认 ROS 版本环境变量，应显示 noetic' },
        { command: 'echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc', explanation: '将 ROS 环境写入 bashrc，每次打开终端自动加载' },
        { command: 'source ~/.bashrc', explanation: '重新加载 bashrc 配置' },
        { command: 'roscore &', explanation: '启动 ROS 主节点（后台运行）' },
        { command: 'rosrun turtlesim turtlesim_node', explanation: '启动小海龟仿真（新终端）' },
        { command: 'rosrun turtlesim turtle_teleop_key', explanation: '启动键盘控制（新终端）' }
      ],
      expectedOutput: 'roscore 启动成功显示 master 端口；小海龟窗口出现；键盘能控制移动'
    },
    misconceptions: [
      {
        misconception: '安装 ROS 后直接就能用，不需要 source',
        rootCause: '不理解 Linux 环境变量加载机制',
        fix: '每次打开新终端需要 source /opt/ros/noetic/setup.bash。写入 .bashrc 后自动执行，但工作空间的 devel/setup.bash 需要单独 source。'
      },
      {
        misconception: 'ROS_MASTER_URI 可以随便设置',
        rootCause: '不理解 ROS 分布式通信架构',
        fix: 'ROS_MASTER_URI 指向运行 roscore 的主机 IP。单机默认 localhost，多机通信时所有节点必须指向同一个 master。'
      },
      {
        misconception: '安装失败就重装系统',
        rootCause: '不知道如何诊断安装问题',
        fix: '先检查错误信息：apt 报错看源是否正确，依赖问题用 apt --fix-broken install，权限问题检查 sudo。大部分问题不需要重装。'
      }
    ],
    practice: {
      basic: {
        task: '完成 ROS Noetic 桌面完整版安装，并运行小海龟验证',
        hints: ['按照官方教程步骤执行', '每个命令执行后观察输出', 'roscore 需要持续运行'],
        verifyCommand: 'rosversion -d  # 应输出 noetic'
      },
      intermediate: {
        task: '配置 ROS 环境：设置 ROS_MASTER_URI=http://localhost:11311，ROS_IP 为本机 IP',
        hints: ['在 .bashrc 中添加 export ROS_MASTER_URI=...', '用 hostname -I 查看本机 IP'],
        verifyCommand: 'echo $ROS_MASTER_URI && echo $ROS_IP'
      },
      advanced: {
        task: '创建 catkin 工作空间并配置环境',
        hints: ['mkdir -p ~/catkin_ws/src', 'cd ~/catkin_ws && catkin_make', 'source devel/setup.bash'],
        verifyCommand: 'echo $ROS_PACKAGE_PATH | grep catkin_ws'
      }
    },
    pauseAndThink: [
      {
        question: '为什么需要先 source ROS 环境，再 source 工作空间？',
        answer: 'ROS 环境定义了系统级路径（/opt/ros/noetic），工作空间定义了用户级路径（~/catkin_ws/devel）。后 source 的会覆盖或追加到前面的路径，所以顺序很重要：系统环境 -> 工作空间环境。'
      },
      {
        question: '.bashrc 和 .profile 有什么区别？',
        answer: '.profile 只在登录时执行一次，.bashrc 每次打开终端都会执行。ROS 环境变量应该放在 .bashrc 中，这样每个新终端都能自动加载。'
      }
    ],
    quiz: [
      {
        id: 'ubuntu-quiz-1',
        question: 'ROS Noetic 对应的 Ubuntu 版本是？',
        options: ['Ubuntu 16.04', 'Ubuntu 18.04', 'Ubuntu 20.04', 'Ubuntu 22.04'],
        correctAnswer: 2,
        explanation: 'ROS Noetic 专为 Ubuntu 20.04 设计。Melodic 对应 18.04，Kinetic 对应 16.04。'
      },
      {
        id: 'ubuntu-quiz-2',
        question: '运行 roscore 后，ROS_MASTER_URI 的默认值是？',
        options: ['http://localhost:11311', 'http://127.0.0.1:9090', 'http://0.0.0.0:8080', 'http://192.168.1.1:11311'],
        correctAnswer: 0,
        explanation: 'ROS_MASTER_URI 默认为 http://localhost:11311，其中 11311 是 ROS master 的默认端口。'
      },
      {
        id: 'ubuntu-quiz-3',
        question: '安装 ROS 后，环境变量应添加到哪个文件？',
        options: ['/etc/environment', '~/.profile', '~/.bashrc', '/etc/profile'],
        correctAnswer: 2,
        explanation: '~/.bashrc 每次打开终端都会执行，适合放置 ROS 环境变量。/etc/environment 是系统级，不推荐。'
      },
      {
        id: 'ubuntu-quiz-4',
        question: 'source devel/setup.bash 和 source devel/setup.zsh 的区别？',
        options: ['没有区别', '前者用于 bash，后者用于 zsh', '前者用于 ROS1，后者用于 ROS2', '前者是系统级，后者是用户级'],
        correctAnswer: 1,
        explanation: '根据你使用的 shell 类型选择对应的 setup 文件。bash 用 setup.bash，zsh 用 setup.zsh。'
      }
    ],
    reviewSummary: '安装三步：1) 安装 Ubuntu 20.04；2) 按 wiki 步骤安装 ROS Noetic；3) 配置 .bashrc。关键命令：source、roscore、catkin_make。环境变量顺序：先 ROS 再工作空间。',
    nextLesson: '环境配置完成后，下一步学习 Git 版本控制和 ROS 工作空间管理。',
    nextLessonLink: 'git-basics',
    sources: [
      { title: 'ROS Wiki - Noetic 安装', url: 'http://wiki.ros.org/noetic/Installation/Ubuntu', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'Ubuntu 官方安装教程', url: 'https://ubuntu.com/tutorials/install-ubuntu-desktop', sourceType: 'official', version: 'Ubuntu 20.04', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `Ubuntu 是 ROS 官方支持的操作系统。本节介绍如何安装 Ubuntu 并配置完整的 ROS 开发环境。

安装方式选择：
1. 虚拟机（VMware/VirtualBox）：安全但性能较低
2. 双系统：性能好但配置稍复杂
3. WSL2（Windows Subsystem）：Windows 下的 Linux 子系统

推荐配置：
- Ubuntu 20.04 对应 ROS Noetic
- 至少 50GB 磁盘空间
- 8GB+ 内存（Gazebo 需要较多内存）`,
      whyImportant: '正确配置的开发环境是顺利进行 ROS 开发的前提。环境配置问题往往是最常见的入门障碍。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 1. 添加 ROS 源
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'

# 2. 添加密钥
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

# 3. 更新并安装
sudo apt update
sudo apt install ros-noetic-desktop-full

# 4. 环境配置
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc

# 5. 安装依赖工具
sudo apt install python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential

# 6. 初始化 rosdep
sudo rosdep init
rosdep update`,
          description: 'ROS Noetic 完整安装步骤',
          expectedOutput: '安装完成后 rosversion -d 应显示 noetic'
        }
      ],
      commonErrors: [
        {
          error: 'apt-get update 失败',
          cause: 'ROS 源无法访问或网络问题',
          solution: '尝试使用国内镜像源，或检查网络连接'
        },
        {
          error: 'rosdep init 失败',
          cause: '网络问题或权限问题',
          solution: '使用 sudo，或尝试国内镜像方案'
        },
        {
          error: 'roscore 启动失败',
          cause: '环境变量未配置或 ROS 安装不完整',
          solution: '检查 source /opt/ros/noetic/setup.bash 是否执行'
        }
      ],
      tips: [
        '安装前先更新系统：sudo apt update && sudo apt upgrade',
        '使用桌面完整版（ros-noetic-desktop-full）获得所有工具',
        'rosdep 用于安装依赖，初始化只需一次'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki Noetic 安装', url: 'http://wiki.ros.org/noetic/Installation/Ubuntu' },
      { title: 'Ubuntu 官方文档', url: 'https://ubuntu.com/tutorials' }
    ],
    applicableVersions: ['Ubuntu 20.04', 'ROS Noetic'],
    relatedArticles: ['linux-basics', 'catkin-workspace', 'ros-installation'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== Git 基础 ====================
  {
    id: 'git-basics',
    slug: 'git-basics',
    title: 'Git 版本控制基础',
    category: 'linux-ubuntu',
    tags: ['Git', '版本控制', 'GitHub', '协作'],
    summary: '学习 Git 的基本操作，掌握版本控制在 ROS 项目开发中的应用。',
    difficulty: 'beginner',
    readingTime: 15,
    prerequisites: ['linux-basics', 'ubuntu-setup'],
    introHook: {
      problem: '你修改了代码但出了问题，想回到之前的版本，却不知道怎么恢复',
      scenario: 'ROS 项目代码需要持续迭代，Git 就像"时光机"，让你随时回到任意历史版本'
    },
    learningObjectives: [
      '理解 Git 版本控制的核心概念',
      '能创建仓库、提交更改、查看历史',
      '能使用分支进行功能开发',
      '能连接 GitHub/GitLab 进行远程协作',
      '能在 ROS 项目中正确使用 .gitignore'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解"版本控制"的概念？', hint: '记录文件的每一次修改，可以随时回退' },
        { question: '你是否熟悉 Linux 终端基本操作？', hint: 'cd, ls, cat 等命令' },
        { question: '你是否了解 GitHub 或 GitLab？', hint: '代码托管平台，用于存储和共享代码' }
      ]
    },
    intuition: {
      analogy: 'Git 就像一个"时光机器 + 云盘"。每次 commit 就像拍一张快照，你可以随时回到任意快照。GitHub 就像一个公共图书馆，你可以把快照存进去，别人也可以看到、下载你的快照。',
      boundaries: '类比局限：Git 不只是存档，还能并行开发多个版本（分支）、合并不同人的修改（merge）。快照是完整的，不只是差异。'
    },
    timeline: [
      { time: '00:00', title: 'Git 概念', description: '仓库、提交、分支、远程' },
      { time: '03:00', title: '基本操作', description: 'init, add, commit, status, log' },
      { time: '07:00', title: '分支管理', description: 'branch, checkout, merge' },
      { time: '11:00', title: '远程协作', description: 'remote, push, pull, clone' },
      { time: '14:00', title: 'ROS 项目实践', description: '.gitignore, 大文件处理' },
      { time: '17:00', title: '实践验收', description: '创建并推送 ROS 项目' }
    ],
    minimalPractice: {
      terminal: '终端',
      currentDirectory: '~',
      source: '无需 source',
      commands: [
        { command: 'mkdir ~/ros_git_demo && cd ~/ros_git_demo', explanation: '创建并进入测试目录' },
        { command: 'git init', explanation: '初始化 Git 仓库' },
        { command: 'echo "# ROS Git Demo" > README.md', explanation: '创建 README 文件' },
        { command: 'git add README.md', explanation: '将文件添加到暂存区' },
        { command: 'git commit -m "Initial commit"', explanation: '提交更改' },
        { command: 'git log --oneline', explanation: '查看提交历史' }
      ],
      expectedOutput: 'git log 显示一条提交记录，包含 "Initial commit"'
    },
    misconceptions: [
      {
        misconception: 'commit 直接提交到远程仓库',
        rootCause: '不理解 Git 的三阶段工作流',
        fix: 'Git 工作流：工作区 -> git add -> 暂存区 -> git commit -> 本地仓库 -> git push -> 远程仓库。commit 只是保存到本地。'
      },
      {
        misconception: '把所有文件都提交到 Git',
        rootCause: '不理解 .gitignore 的作用',
        fix: 'ROS 项目必须排除：build/, devel/, *.pyc, .vscode/, *.bag 等。使用 catkin_create_pkg 生成的 .gitignore 作为基础。'
      },
      {
        misconception: 'commit 信息随便写',
        rootCause: '不重视提交信息的价值',
        fix: '好的 commit 信息格式：<类型>: <简短描述>。如 "feat: 添加激光雷达驱动" 或 "fix: 修复 TF 转换错误"。这样方便回溯和协作。'
      }
    ],
    practice: {
      basic: {
        task: '创建一个 Git 仓库，提交一个 README 文件',
        hints: ['git init 初始化', 'git add 添加文件', 'git commit 提交'],
        verifyCommand: 'cd ~/ros_git_demo && git log --oneline | head -1'
      },
      intermediate: {
        task: '创建一个新分支，在新分支修改 README，然后合并回主分支',
        hints: ['git branch <name> 创建分支', 'git checkout <name> 切换分支', 'git merge <name> 合并分支'],
        verifyCommand: 'git branch -a'
      },
      advanced: {
        task: 'Fork 一个 ROS 项目，本地修改后提交 Pull Request',
        hints: ['GitHub 上 Fork，git clone 本地', '修改后 push 到你的 Fork', '在 GitHub 上创建 PR'],
        verifyCommand: 'git remote -v'
      }
    },
    pauseAndThink: [
      {
        question: '为什么要区分 add 和 commit 两个步骤？',
        answer: 'add 把修改放入"暂存区"，让你可以选择性提交。比如修改了 3 个文件，只想提交其中 2 个，就可以只 add 需要的文件。commit 一次性提交暂存区的所有内容。'
      },
      {
        question: 'ROS 项目中的 build/ 和 devel/ 目录为什么不提交？',
        answer: 'build/ 和 devel/ 是编译产物，可以通过 catkin_make 重新生成。提交它们会：1) 仓库体积巨大；2) merge 时冲突频发；3) 不同机器编译结果可能不同。只提交源代码即可。'
      }
    ],
    quiz: [
      {
        id: 'git-quiz-1',
        question: '查看当前仓库状态的命令是？',
        options: ['git log', 'git status', 'git show', 'git diff'],
        correctAnswer: 1,
        explanation: 'git status 显示工作区和暂存区的状态，包括修改的文件、未跟踪的文件等。'
      },
      {
        id: 'git-quiz-2',
        question: '撤销工作区的修改（未 add）用哪个命令？',
        options: ['git reset', 'git checkout -- <file>', 'git revert', 'git restore --staged'],
        correctAnswer: 1,
        explanation: 'git checkout -- <file> 撤销工作区的修改。如果已经 add，需要 git restore --staged 先取消暂存。'
      },
      {
        id: 'git-quiz-3',
        question: '远程仓库的默认名称是？',
        options: ['origin', 'upstream', 'main', 'master'],
        correctAnswer: 0,
        explanation: 'clone 时 Git 自动将远程仓库命名为 origin。upstream 通常指原始仓库（fork 场景）。'
      },
      {
        id: 'git-quiz-4',
        question: 'ROS 项目中不应该提交的文件/目录是？',
        options: ['src/', 'launch/', 'build/', 'config/'],
        correctAnswer: 2,
        explanation: 'build/ 和 devel/ 是编译产物，不应提交。src/, launch/, config/ 是源代码和配置，需要提交。'
      }
    ],
    reviewSummary: '核心流程：init -> add -> commit -> push。分支：branch, checkout, merge。ROS 必须忽略 build/, devel/, *.bag。commit 信息要有意义。',
    nextLesson: '掌握 Git 后，下一步学习 ROS 工作空间的创建和管理。',
    nextLessonLink: 'catkin-workspace',
    sources: [
      { title: 'Pro Git 官方书籍', url: 'https://git-scm.com/book/zh/v2', sourceType: 'official', version: 'Git 2.x', verifiedAt: '2024-01-01' },
      { title: 'GitHub Git 教程', url: 'https://docs.github.com/zh/get-started/using-git', sourceType: 'official', version: 'N/A', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `Git 是现代软件开发必备的版本控制工具。在 ROS 项目开发中，Git 用于：
- 代码版本管理
- 团队协作开发
- 代码备份与同步
- 发布版本管理`,
      whyImportant: '版本控制是软件开发的基础设施。没有版本控制，代码修改无法追溯，团队协作困难，发布版本混乱。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 初始化仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 查看状态
git status

# 查看历史
git log --oneline

# 创建分支
git branch feature-nav

# 切换分支
git checkout feature-nav

# 合并分支
git checkout main
git merge feature-nav`,
          description: 'Git 基本操作命令',
          expectedOutput: '根据命令显示相应的 Git 状态'
        }
      ],
      commonErrors: [
        {
          error: 'fatal: not a git repository',
          cause: '当前目录不是 Git 仓库',
          solution: '先执行 git init 初始化仓库'
        },
        {
          error: 'Please tell me who you are',
          cause: '未配置 Git 用户信息',
          solution: '执行 git config --global user.email "you@example.com" 和 git config --global user.name "Your Name"'
        },
        {
          error: 'Merge conflict',
          cause: '合并时文件有冲突',
          solution: '手动编辑冲突文件，解决冲突后 git add 并 git commit'
        }
      ],
      tips: [
        '使用 .gitignore 排除不需要跟踪的文件',
        '提交前用 git status 检查要提交的内容',
        '写清晰的 commit 信息，方便后续查找'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'Git 官方文档', url: 'https://git-scm.com/doc' },
      { title: 'GitHub 文档', url: 'https://docs.github.com' }
    ],
    applicableVersions: ['Git 2.x'],
    relatedArticles: ['linux-basics', 'catkin-workspace'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== Catkin 工作空间 ====================
  {
    id: 'catkin-workspace',
    slug: 'catkin-workspace',
    title: 'Catkin 工作空间与 Package 管理',
    category: 'ros-basics',
    tags: ['catkin', '工作空间', 'package', '构建系统'],
    summary: '深入理解 ROS 的构建系统 catkin，掌握工作空间的创建、Package 的结构和依赖管理。',
    difficulty: 'intermediate',
    readingTime: 20,
    prerequisites: ['ubuntu-setup', 'git-basics'],
    introHook: {
      problem: '你看了很多教程提到 catkin_ws、catkin_make，但不知道这些是什么、为什么需要它们',
      scenario: 'ROS 项目就像一个工程现场，catkin 工作空间是施工区域，package 是不同的施工队，CMakeLists.txt 和 package.xml 是施工图纸'
    },
    learningObjectives: [
      '理解 catkin 工作空间的结构和作用',
      '能创建和管理 ROS Package',
      '理解 package.xml 中的依赖声明',
      '能正确使用 catkin_make 和 catkin build',
      '能解决编译依赖和链接问题'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解 CMake 构建系统的基本概念？', hint: 'CMake 是跨平台的构建系统，ROS 基于它' },
        { question: '你是否知道什么是"依赖"？', hint: '代码 A 需要代码 B 的功能，B 就是 A 的依赖' },
        { question: '你是否了解 Python 的包管理（pip）？', hint: '概念类似，但 ROS 用 catkin 管理包' }
      ]
    },
    intuition: {
      analogy: 'catkin 工作空间像一个"工程项目总目录"：src/ 是设计图纸（源代码），build/ 是施工现场（编译中间文件），devel/ 是交付成品（编译结果）。catkin_make 就像施工队根据图纸建造，最后产品放在 devel/ 里。',
      boundaries: '类比局限：catkin 不仅是编译，还管理依赖、环境变量、多包构建顺序。工作空间可以叠加（overlay），让你的包覆盖系统包。'
    },
    timeline: [
      { time: '00:00', title: '工作空间结构', description: 'src/, build/, devel/ 的作用' },
      { time: '03:00', title: '创建工作空间', description: 'mkdir, catkin_make 步骤' },
      { time: '06:00', title: 'Package 结构', description: 'CMakeLists.txt, package.xml' },
      { time: '10:00', title: '依赖管理', description: 'package.xml 依赖声明' },
      { time: '14:00', title: '编译与排错', description: 'catkin_make 常见问题' },
      { time: '18:00', title: '实践验收', description: '创建包含依赖的 Package' }
    ],
    minimalPractice: {
      terminal: '终端1',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'mkdir -p ~/catkin_ws/src', explanation: '创建工作空间源码目录' },
        { command: 'cd ~/catkin_ws && catkin_make', explanation: '初始化并编译工作空间' },
        { command: 'source ~/catkin_ws/devel/setup.bash', explanation: '加载工作空间环境' },
        { command: 'cd ~/catkin_ws/src && catkin_create_pkg my_robot rospy std_msgs', explanation: '创建新 Package' },
        { command: 'cd ~/catkin_ws && catkin_make', explanation: '编译新创建的 Package' },
        { command: 'rospack find my_robot', explanation: '验证 Package 能被找到' }
      ],
      expectedOutput: 'catkin_make 成功显示 100%；rospack find 显示 Package 路径'
    },
    misconceptions: [
      {
        misconception: '把代码放在任意目录都能编译',
        rootCause: '不理解 ROS Package 的位置要求',
        fix: 'ROS Package 必须放在工作空间的 src/ 目录下，或者在 ROS_PACKAGE_PATH 包含的路径中。rospack find 找不到就不会编译。'
      },
      {
        misconception: 'package.xml 和 CMakeLists.txt 随便写',
        rootCause: '不理解这两个文件的作用',
        fix: 'package.xml 定义包的元信息和依赖（被谁依赖），CMakeLists.txt 定义编译规则（依赖谁）。依赖缺失会导致编译失败或运行时找不到。'
      },
      {
        misconception: '每次修改代码都要重新 catkin_make',
        rootCause: '不理解增量编译机制',
        fix: 'catkin_make 是增量编译，只重新编译修改过的文件。小改动很快，但如果改了 CMakeLists.txt 或添加了文件，需要完整重新编译。'
      }
    ],
    practice: {
      basic: {
        task: '创建一个 catkin 工作空间，并创建一个名为 beginner_tutorials 的 Package',
        hints: ['mkdir -p ~/catkin_ws/src', 'catkin_make', 'catkin_create_pkg beginner_tutorials rospy roscpp std_msgs'],
        verifyCommand: 'rospack find beginner_tutorials'
      },
      intermediate: {
        task: '修改 package.xml 添加依赖，创建一个 Python 节点并编译运行',
        hints: ['在 package.xml 添加 <depend>geometry_msgs</depend>', '在 CMakeLists.txt 添加 catkin_package(DEPENDS geometry_msgs)', '创建 scripts/my_node.py 并设置可执行权限'],
        verifyCommand: 'catkin_make && rosrun beginner_tutorials my_node.py'
      },
      advanced: {
        task: '创建一个依赖于其他自定义 Package 的 Package，解决编译顺序问题',
        hints: ['在 package.xml 添加 <depend>other_package</depend>', '确保依赖包在 src/ 中存在', 'catkin_make 会自动处理依赖顺序'],
        verifyCommand: 'catkin_make --pkg dependent_package'
      }
    },
    pauseAndThink: [
      {
        question: '为什么需要 source devel/setup.bash？它做了什么？',
        answer: 'devel/setup.bash 设置环境变量：ROS_PACKAGE_PATH（包搜索路径）、LD_LIBRARY_PATH（库路径）、PATH（可执行文件路径）。没有它，ROS 找不到你编译的包。'
      },
      {
        question: 'catkin_make 和 catkin build 有什么区别？',
        answer: 'catkin_make 是官方简单工具，一次编译所有包。catkin build 更强大：支持增量编译单个包、并行编译、更好的依赖分析。大型项目推荐 catkin build。'
      }
    ],
    quiz: [
      {
        id: 'catkin-quiz-1',
        question: 'catkin 工作空间中，源代码应放在哪个目录？',
        options: ['build/', 'devel/', 'src/', 'bin/'],
        correctAnswer: 2,
        explanation: 'src/ 目录存放源代码，build/ 是编译中间文件，devel/ 是编译输出。'
      },
      {
        id: 'catkin-quiz-2',
        question: 'package.xml 文件的作用是？',
        options: ['定义编译规则', '声明包的依赖和元信息', '存储节点代码', '配置 launch 文件'],
        correctAnswer: 1,
        explanation: 'package.xml 声明包的名称、依赖、作者、许可证等信息。编译规则在 CMakeLists.txt 中。'
      },
      {
        id: 'catkin-quiz-3',
        question: '创建新 Package 的命令是？',
        options: ['roscreate-pkg', 'catkin_create_pkg', 'catkin new-pkg', 'ros-pkg create'],
        correctAnswer: 1,
        explanation: 'catkin_create_pkg <name> [dependencies] 是 Noetic 的标准命令。roscreate-pkg 是旧版 (rosbuild)。'
      },
      {
        id: 'catkin-quiz-4',
        question: '编译失败显示"Could not find a package configuration file"，可能的原因是？',
        options: ['没有 source ROS 环境', 'package.xml 缺少依赖声明', 'CMakeLists.txt 语法错误', '以上都可能'],
        correctAnswer: 3,
        explanation: '这个错误表示找不到依赖包，可能是环境未加载、依赖未声明、或依赖包未安装。'
      }
    ],
    reviewSummary: '工作空间三目录：src/（源码）、build/（中间）、devel/（输出）。关键命令：catkin_make 编译，catkin_create_pkg 创建包，source devel/setup.bash 加载环境。依赖在 package.xml 声明。',
    nextLesson: '理解了工作空间，下一步学习 ROS 的核心概念：计算图和 roscore。',
    nextLessonLink: 'ros-architecture',
    sources: [
      { title: 'ROS Wiki - Catkin 概念', url: 'http://wiki.ros.org/catkin/conceptual_overview', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - 创建 Package', url: 'http://wiki.ros.org/ROS/Tutorials/CreatingPackage', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `Catkin 是 ROS 的构建系统，基于 CMake 和 Python。它管理 ROS 包的编译、依赖和部署。

工作空间结构：
- src/: 源代码目录
- build/: 编译中间文件
- devel/: 编译输出（开发时使用）
- install/: 安装目录（可选）`,
      whyImportant: '理解 catkin 工作空间是 ROS 开发的基础。所有 ROS 项目都在工作空间中构建和管理。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 创建工作空间
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
catkin_make

# source 环境
source devel/setup.bash

# 创建新包
cd src
catkin_create_pkg my_package rospy std_msgs geometry_msgs

# 编译
cd ..
catkin_make

# 查找包
rospack find my_package`,
          description: '创建和管理工作空间',
          expectedOutput: '编译成功后，rospack find 显示包路径'
        }
      ],
      commonErrors: [
        {
          error: 'catkin_make: command not found',
          cause: 'ROS 环境未加载',
          solution: 'source /opt/ros/noetic/setup.bash'
        },
        {
          error: 'Could not find package',
          cause: '依赖包未安装或未声明',
          solution: '检查 package.xml 依赖，使用 rosdep install 安装依赖'
        },
        {
          error: 'CMake Error: Invalid argument',
          cause: 'CMakeLists.txt 语法错误',
          solution: '检查 CMakeLists.txt 语法，确保括号、引号正确'
        }
      ],
      tips: [
        '每次编译后记得 source devel/setup.bash',
        '使用 catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python3 指定 Python 版本',
        '大型项目考虑使用 catkin build 替代 catkin_make'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki Catkin 教程', url: 'http://wiki.ros.org/catkin' },
      { title: 'ROS Wiki 工作空间', url: 'http://wiki.ros.org/catkin/Tutorials/using_a_workspace' }
    ],
    applicableVersions: ['ROS Noetic', 'Ubuntu 20.04'],
    relatedArticles: ['ubuntu-setup', 'ros-architecture', 'ros-launch'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== ROS 架构与 roscore ====================
  {
    id: 'ros-architecture',
    slug: 'ros-architecture',
    title: 'ROS 计算图架构与 roscore',
    category: 'ros-basics',
    tags: ['roscore', '架构', '计算图', 'master'],
    summary: '理解 ROS 的分布式计算图架构，掌握 roscore 的作用和 ROS Master 的工作原理。',
    difficulty: 'intermediate',
    readingTime: 18,
    prerequisites: ['catkin-workspace'],
    introHook: {
      problem: '你运行了 roscore，但不知道它到底做了什么，为什么每个教程都让你先运行它',
      scenario: 'ROS 就像一个公司：roscore 是总部，节点是员工，话题是会议室，服务是办事窗口。没有总部，员工找不到彼此。'
    },
    learningObjectives: [
      '理解 ROS 的计算图架构和核心概念',
      '理解 roscore 的组成和作用',
      '理解 ROS Master 的节点注册机制',
      '理解 rosout 日志系统的作用',
      '能诊断 roscore 相关的连接问题'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解"分布式系统"的概念？', hint: '多个独立程序通过网络协同工作' },
        { question: '你是否了解网络通信的基本概念（IP、端口）？', hint: '每个网络服务监听一个端口' },
        { question: '你是否运行过 roscore 并看到输出？', hint: 'master, rosout, parameter server' }
      ]
    },
    intuition: {
      analogy: 'roscore 是 ROS 世界的"电话局"。节点启动时向电话局注册（"我是节点A，号码123"），其他节点想联系 A 时问电话局"节点A的号码是多少"。电话局只负责查号，不负责通话内容。',
      boundaries: '类比局限：roscore 还包含参数服务器（公共公告板）和 rosout（日志收集）。电话局一旦关闭，新节点无法注册，但已建立连接的节点可以继续通信。'
    },
    timeline: [
      { time: '00:00', title: '计算图概念', description: '节点、话题、服务、参数' },
      { time: '03:00', title: 'roscore 组成', description: 'master, rosout, parameter server' },
      { time: '07:00', title: '节点注册', description: '节点如何找到彼此' },
      { time: '11:00', title: '多机通信', description: 'ROS_MASTER_URI 和 ROS_IP' },
      { time: '15:00', title: '故障排查', description: 'roscore 不启动、连接失败' },
      { time: '17:00', title: '实践验收', description: '多终端节点通信' }
    ],
    minimalPractice: {
      terminal: '终端1（roscore）',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'roscore', explanation: '启动 ROS Master（持续运行）' }
      ],
      expectedOutput: '显示 master 端口 11311，rosout 已启动'
    },
    misconceptions: [
      {
        misconception: 'roscore 必须一直运行，否则所有节点都会崩溃',
        rootCause: '不理解已建立连接的节点可以继续通信',
        fix: 'roscore 只在节点注册时需要。节点一旦相互发现，直接点对点通信。roscore 挂了，新节点无法加入，但现有节点通常不受影响。'
      },
      {
        misconception: 'ROS_MASTER_URI 必须设置为本机 IP',
        rootCause: '不理解多机通信配置',
        fix: 'ROS_MASTER_URI 指向运行 roscore 的机器。多机场景中，所有机器都指向同一 master。ROS_IP 设置本机对外通信的 IP。'
      },
      {
        misconception: 'roscore 失败就是 ROS 安装有问题',
        rootCause: '没有分析具体错误信息',
        fix: '检查：1) 端口 11311 是否被占用；2) 环境变量是否正确；3) 网络是否通畅。用 export | grep ROS 检查环境。'
      }
    ],
    practice: {
      basic: {
        task: '启动 roscore，观察输出，理解三个组成部分',
        hints: ['roscore 输出包含 master, rosout, param server', 'master 端口默认 11311'],
        verifyCommand: 'rosnode list  # 应显示 /rosout'
      },
      intermediate: {
        task: '启动两个节点，观察 roscore 关闭后节点的行为',
        hints: ['启动小海龟节点', '关闭 roscore', '尝试通信'],
        verifyCommand: 'rostopic echo /turtle1/cmd_vel --noarr'
      },
      advanced: {
        task: '配置两台电脑的 ROS 多机通信',
        hints: ['一台运行 roscore，设置 ROS_MASTER_URI', '另一台设置相同的 ROS_MASTER_URI', '各自设置正确的 ROS_IP'],
        verifyCommand: 'rostopic list  # 应能看到另一台的节点'
      }
    },
    pauseAndThink: [
      {
        question: '为什么 ROS 使用点对点通信而不是所有数据都经过 master？',
        answer: '点对点通信更高效：1) master 不会成为性能瓶颈；2) 网络延迟更低；3) master 挂了不影响已连接的节点。代价是配置稍复杂，需要正确设置 ROS_IP。'
      },
      {
        question: '参数服务器和话题/服务有什么区别？',
        answer: '参数服务器是全局配置存储：1) 不频繁变化；2) 节点启动时读取；3) 适合配置参数。话题/服务用于实时数据流，变化频繁。不要把高频数据放参数服务器。'
      }
    ],
    quiz: [
      {
        id: 'arch-quiz-1',
        question: 'roscore 包含哪三个组件？',
        options: ['rosnode, rostopic, rosmsg', 'master, rosout, parameter server', 'roscore, roslaunch, rosmaster', 'publisher, subscriber, service'],
        correctAnswer: 1,
        explanation: 'roscore 启动三个组件：ROS Master（节点注册）、rosout（日志聚合）、Parameter Server（参数存储）。'
      },
      {
        id: 'arch-quiz-2',
        question: 'ROS Master 默认监听的端口是？',
        options: ['8080', '9090', '11311', '5000'],
        correctAnswer: 2,
        explanation: 'ROS Master 默认端口 11311。可以在启动时指定其他端口：roscore -p 11312。'
      },
      {
        id: 'arch-quiz-3',
        question: '节点 A 和 B 已通过 roscore 建立连接，此时关闭 roscore，会发生什么？',
        options: ['A 和 B 立即断开', 'A 和 B 可以继续通信', 'A 和 B 重启', '需要重启 roscore'],
        correctAnswer: 1,
        explanation: '节点建立连接后直接点对点通信，不经过 master。master 挂了不影响已有连接，但新节点无法注册。'
      },
      {
        id: 'arch-quiz-4',
        question: '多机通信时，ROS_MASTER_URI 应该指向？',
        options: ['本机 localhost', '运行 roscore 的机器 IP', '任意机器 IP', '不需要设置'],
        correctAnswer: 1,
        explanation: '所有机器的 ROS_MASTER_URI 都指向同一台运行 roscore 的机器，确保所有节点向同一 master 注册。'
      }
    ],
    reviewSummary: 'roscore 三组件：master（节点注册）、rosout（日志）、param server（参数）。节点通过 master 找到彼此，然后点对点通信。多机通信需要正确设置 ROS_MASTER_URI 和 ROS_IP。',
    nextLesson: '理解了 roscore，下一步学习 ROS 节点的创建和管理。',
    nextLessonLink: 'ros-node',
    sources: [
      { title: 'ROS Wiki - 计算图概念', url: 'http://wiki.ros.org/ROS/Concepts', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - roscore', url: 'http://wiki.ros.org/roscore', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `ROS 采用分布式计算图架构。核心概念：

- **节点 (Node)**：执行计算的进程
- **话题 (Topic)**：节点间传递消息的命名通道
- **消息 (Message)**：话题中传递的数据结构
- **服务 (Service)**：节点间的请求-响应交互
- **参数服务器 (Parameter Server)**：存储配置数据

roscore 启动三个核心组件：
1. **ROS Master**：节点注册和发现
2. **rosout**：日志聚合节点
3. **Parameter Server**：参数存储服务`,
      whyImportant: '理解 ROS 架构是正确使用 ROS 的基础。不知道 master、节点、话题的关系，就无法诊断连接问题。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 启动 roscore
roscore

# 在另一个终端查看节点
rosnode list

# 查看话题
rostopic list

# 查看参数
rosparam list

# 设置参数
rosparam set /my_param 100

# 获取参数
rosparam get /my_param`,
          description: 'roscore 和基本命令',
          expectedOutput: 'roscore 启动后显示 master 端口'
        }
      ],
      commonErrors: [
        {
          error: 'Unable to contact master',
          cause: 'roscore 未运行或网络配置错误',
          solution: '确保 roscore 正在运行，检查 ROS_MASTER_URI 设置'
        },
        {
          error: 'Connection refused',
          cause: '防火墙或端口问题',
          solution: '检查 11311 端口是否开放，关闭防火墙测试'
        },
        {
          error: 'ROS_MASTER_URI not set',
          cause: '环境变量未配置',
          solution: 'export ROS_MASTER_URI=http://localhost:11311'
        }
      ],
      tips: [
        '单机开发时 ROS_MASTER_URI 默认 localhost:11311',
        '多机通信时确保 ROS_IP 设置正确',
        '使用 rosnode info 查看节点详情'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki 架构概述', url: 'http://wiki.ros.org/ROS/Concepts' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['catkin-workspace', 'ros-node', 'ros-topic'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== ROS Node ====================
  {
    id: 'ros-node',
    slug: 'ros-node',
    title: 'ROS 节点 (Node) 详解',
    category: 'ros-basics',
    tags: ['node', '节点', 'rosnode', 'rosrun'],
    summary: '深入学习 ROS 节点的概念、创建方法和管理命令，掌握节点间的通信基础。',
    difficulty: 'intermediate',
    readingTime: 18,
    prerequisites: ['ros-architecture'],
    introHook: {
      problem: '你听说"ROS 节点"但不清楚它到底是什么，一个程序是一个节点吗？一个文件是一个节点吗？',
      scenario: '节点是 ROS 世界的基本单位，就像公司里的员工。每个员工有明确的职责（功能），通过会议室（话题）和办事窗口（服务）与其他员工协作。'
    },
    learningObjectives: [
      '理解 ROS 节点的定义和命名规则',
      '能使用 rosrun 和 roslaunch 启动节点',
      '能使用 rosnode 命令检查节点状态',
      '能创建 Python/C++ 节点程序',
      '理解节点的生命周期和命名空间'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解"进程"的概念？', hint: '一个运行的程序实例，有独立的内存空间' },
        { question: '你是否运行过 rosrun 命令？', hint: 'rosrun package_name node_name' },
        { question: '你是否知道 Python 或 C++ 的基本语法？', hint: '需要写代码创建节点' }
      ]
    },
    intuition: {
      analogy: '节点就像公司的"员工"。每个员工有自己的工号（节点名）、职位（功能）。员工通过会议室（话题）发通知、在办事窗口（服务）办事。员工入职需要向总部注册（roscore），离职需要办理手续（关闭节点）。',
      boundaries: '类比局限：节点可以同时参与多个话题（既发又收），一个包可以有多个节点（一个团队多个员工）。节点不是物理实体，是 ROS 对进程的逻辑抽象。'
    },
    timeline: [
      { time: '00:00', title: '节点概念', description: '什么是节点、为什么需要节点' },
      { time: '03:00', title: 'rosrun 命令', description: '启动节点的标准方式' },
      { time: '06:00', title: 'rosnode 命令', description: 'list, info, kill 等管理' },
      { time: '10:00', title: '创建节点', description: 'Python 和 C++ 示例' },
      { time: '14:00', title: '节点命名', description: '匿名、命名空间、重映射' },
      { time: '17:00', title: '实践验收', description: '创建并管理多个节点' }
    ],
    minimalPractice: {
      terminal: '终端1',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'roscore &', explanation: '后台启动 roscore' },
        { command: 'rosrun turtlesim turtlesim_node', explanation: '启动小海龟节点（新终端）' },
        { command: 'rosnode list', explanation: '列出所有运行中的节点' },
        { command: 'rosnode info /turtlesim', explanation: '查看节点详细信息' },
        { command: 'rosrun turtlesim turtle_teleop_key', explanation: '启动键盘控制节点（新终端）' }
      ],
      expectedOutput: 'rosnode list 显示 /rosout 和 /turtlesim；rosnode info 显示节点的发布/订阅/服务'
    },
    misconceptions: [
      {
        misconception: '一个 Python 文件就是一个节点',
        rootCause: '混淆文件和节点的概念',
        fix: '一个文件可以定义多个节点，一个节点是一个进程。文件是代码组织单位，节点是运行单位。通常一个文件对应一个节点，但不是必须的。'
      },
      {
        misconception: '节点名必须和文件名相同',
        rootCause: '不理解节点的命名机制',
        fix: '节点名在代码中用 init_node() 或 ros::init() 设置，可以和文件名不同。启动时可以用 __name:=new_name 重命名。'
      },
      {
        misconception: '节点关闭就是 Ctrl+C，不需要特别处理',
        rootCause: '不理解节点生命周期',
        fix: '优雅关闭需要处理信号：Python 用 rospy.on_shutdown()，C++ 用信号处理器。突然关闭可能导致数据丢失、连接残留。'
      }
    ],
    practice: {
      basic: {
        task: '使用 rosrun 启动小海龟，用 rosnode 查看节点信息',
        hints: ['roscore 先启动', 'rosrun turtlesim turtlesim_node', 'rosnode list, rosnode info /turtlesim'],
        verifyCommand: 'rosnode list | grep turtlesim'
      },
      intermediate: {
        task: '创建一个 Python 节点，发布"Hello ROS"到 chatter 话题',
        hints: ['import rospy', 'rospy.init_node("my_node")', 'pub = rospy.Publisher("chatter", String, queue_size=10)'],
        verifyCommand: 'rostopic echo /chatter --noarr'
      },
      advanced: {
        task: '创建一个节点，订阅 chatter 话题并打印接收的消息',
        hints: ['rospy.Subscriber("chatter", String, callback)', 'callback 中 rospy.loginfo(msg.data)'],
        verifyCommand: 'rosnode info /listener'
      }
    },
    pauseAndThink: [
      {
        question: '为什么节点启动时有时名字会变成 /turtlesim-1 这样的？',
        answer: '这是匿名节点。当启动多个同名节点时，ROS 自动添加后缀避免冲突。用 __name:= 显式命名可以避免匿名。'
      },
      {
        question: 'rosnode kill 和直接 Ctrl+C 有什么区别？',
        answer: 'rosnode kill 发送关闭请求给节点，节点可以执行清理逻辑。Ctrl+C 是强制终止，可能留下未完成的操作。通常推荐 Ctrl+C（节点注册了信号处理），rosnode kill 用于远程关闭。'
      }
    ],
    quiz: [
      {
        id: 'node-quiz-1',
        question: '启动一个节点的命令是？',
        options: ['rosnode run', 'rosrun', 'roslaunch node', 'rosexec'],
        correctAnswer: 1,
        explanation: 'rosrun <package> <node> 启动单个节点。rosnode 是管理命令，不用于启动。'
      },
      {
        id: 'node-quiz-2',
        question: '查看节点详细信息的命令是？',
        options: ['rosnode list', 'rosnode info', 'rosnode show', 'rosnode status'],
        correctAnswer: 1,
        explanation: 'rosnode info /node_name 显示节点的发布、订阅、服务和连接信息。'
      },
      {
        id: 'node-quiz-3',
        question: 'Python 中初始化节点的函数是？',
        options: ['rospy.start()', 'rospy.init()', 'rospy.init_node()', 'rospy.create_node()'],
        correctAnswer: 2,
        explanation: 'rospy.init_node("node_name") 初始化节点并注册到 master。'
      },
      {
        id: 'node-quiz-4',
        question: '节点名 /my_robot/camera 属于哪个命名空间？',
        options: ['根命名空间', '/my_robot', '/camera', '没有命名空间'],
        correctAnswer: 1,
        explanation: '命名空间用 / 分隔，/my_robot/camera 在 /my_robot 命名空间下，节点名为 camera。'
      }
    ],
    reviewSummary: '节点是 ROS 进程的抽象。rosrun 启动节点，rosnode 管理。Python 用 rospy.init_node()，C++ 用 ros::init()。节点名可以重映射和命名空间。',
    nextLesson: '理解了节点，下一步学习节点间如何通过话题通信。',
    nextLessonLink: 'ros-topic',
    sources: [
      { title: 'ROS Wiki - Nodes 概念', url: 'http://wiki.ros.org/ROS/Tutorials/UnderstandingNodes', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - rosnode 命令', url: 'http://wiki.ros.org/rosnode', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `ROS 节点是执行计算的基本单元。每个节点是一个独立进程，通过话题和服务与其他节点通信。

节点特点：
- 一个可执行程序可以包含一个或多个节点
- 节点有唯一名称，用于身份识别
- 节点可以发布/订阅话题、提供/调用服务
- 节点在启动时向 Master 注册`,
      whyImportant: '节点是 ROS 应用程序的基本构建块。理解节点管理是开发复杂机器人系统的前提。',
      codeExamples: [
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy

def main():
    # 初始化节点
    rospy.init_node('hello_node', anonymous=True)
    
    # 设置循环频率
    rate = rospy.Rate(1)  # 1Hz
    
    while not rospy.is_shutdown():
        rospy.loginfo("Hello, ROS!")
        rate.sleep()

if __name__ == '__main__':
    try:
        main()
    except rospy.ROSInterruptException:
        pass`,
          description: 'Python 节点示例',
          expectedOutput: '每秒打印 Hello, ROS!'
        },
        {
          language: 'bash',
          code: `# 查看所有节点
rosnode list

# 查看节点详情
rosnode info /turtlesim

# 测试节点连接
rosnode ping /turtlesim

# 关闭节点
rosnode kill /turtlesim`,
          description: '节点管理命令',
          expectedOutput: '根据命令显示节点列表或详情'
        }
      ],
      commonErrors: [
        {
          error: 'node does not exist',
          cause: '节点未启动或名称错误',
          solution: '用 rosnode list 查看正确的节点名'
        },
        {
          error: 'Cannot locate node of type',
          cause: '节点文件不存在或无执行权限',
          solution: '检查节点路径，chmod +x 添加执行权限'
        },
        {
          error: 'Failed to contact master',
          cause: 'roscore 未运行',
          solution: '先启动 roscore'
        }
      ],
      tips: [
        '节点名使用下划线或驼峰，避免特殊字符',
        '调试时用 rosnode info 查看节点通信情况',
        '用 rospy.loginfo/ros::ROS_INFO 记录日志'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki Node 教程', url: 'http://wiki.ros.org/ROS/Tutorials/UnderstandingNodes' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-architecture', 'ros-topic', 'ros-message'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== ROS Topic ====================
  {
    id: 'ros-topic',
    slug: 'ros-topic',
    title: 'ROS 话题 (Topic) 与消息通信',
    category: 'communication',
    tags: ['topic', '话题', '发布订阅', 'rostopic'],
    summary: '深入学习 ROS 话题通信机制，掌握发布者、订阅者的创建和消息传输。',
    difficulty: 'intermediate',
    readingTime: 20,
    prerequisites: ['ros-node'],
    introHook: {
      problem: '你听说"话题通信"但不知道和普通变量赋值有什么区别，数据怎么从一个节点到另一个节点？',
      scenario: '话题就像广播电台：电台（发布者）播放节目，听众（订阅者）调到这个频率（话题名）就能听到。电台不需要知道有多少听众，听众随时可以加入或离开。'
    },
    learningObjectives: [
      '理解话题的发布-订阅通信模式',
      '能使用 rostopic 命令检查话题',
      '能创建发布者节点发布话题',
      '能创建订阅者节点接收话题数据',
      '理解话题的队列机制和 QoS'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解"发布-订阅"模式？', hint: '发布者不直接发送给订阅者，而是发到一个公共通道' },
        { question: '你是否运行过小海龟，看到过 /turtle1/cmd_vel 话题？', hint: '这是控制小海龟移动的话题' },
        { question: '你是否了解消息类型的概念？', hint: '每个话题有固定的消息类型（数据格式）' }
      ]
    },
    intuition: {
      analogy: '话题就像"电台频道"。发布者是电台，订阅者是收音机。频道名是话题名，节目内容是消息数据。收音机可以随时开关、切换频道，不影响电台播放。',
      boundaries: '类比局限：话题是"多对多"的，一个话题可以有多个发布者和多个订阅者。消息是短暂存储的（队列），不像电台持续广播。数据是结构化的，不是任意音频。'
    },
    timeline: [
      { time: '00:00', title: '话题概念', description: '发布-订阅模式' },
      { time: '03:00', title: 'rostopic 命令', description: 'list, echo, pub, info' },
      { time: '07:00', title: '消息类型', description: 'std_msgs, geometry_msgs' },
      { time: '11:00', title: '创建发布者', description: 'Python/C++ Publisher' },
      { time: '15:00', title: '创建订阅者', description: 'Python/C++ Subscriber' },
      { time: '18:00', title: '实践验收', description: '双向通信实验' }
    ],
    minimalPractice: {
      terminal: '终端1',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'roscore &', explanation: '启动 ROS Master' },
        { command: 'rosrun turtlesim turtlesim_node', explanation: '启动小海龟（新终端）' },
        { command: 'rostopic list', explanation: '列出所有话题' },
        { command: 'rostopic info /turtle1/cmd_vel', explanation: '查看话题详情' },
        { command: 'rostopic pub /turtle1/cmd_vel geometry_msgs/Twist "linear: {x: 2.0}" -1', explanation: '发布一条消息让小海龟移动' }
      ],
      expectedOutput: 'rostopic list 显示话题列表；pub 命令后小海龟向前移动'
    },
    misconceptions: [
      {
        misconception: '订阅者直接从发布者接收数据',
        rootCause: '不理解话题的中间层作用',
        fix: '数据流向：发布者 -> 话题（队列）-> 订阅者。发布者和订阅者不直接连接，话题是中间的缓冲区。这解耦了时间和频率。'
      },
      {
        misconception: '话题必须有发布者才能订阅',
        rootCause: '不理解话题的异步特性',
        fix: '订阅者可以订阅不存在的话题，等待发布者出现。发布者可以发布到没有订阅者的话题，消息进入队列等待。'
      },
      {
        misconception: '消息一定能收到',
        rootCause: '不理解队列和 QoS 机制',
        fix: '消息在队列中存储，队列满时旧消息被丢弃。高频发布者 + 低频订阅者 = 丢消息。调整 queue_size 和处理速度可以缓解。'
      }
    ],
    practice: {
      basic: {
        task: '使用 rostopic pub 控制小海龟画圆',
        hints: ['geometry_msgs/Twist 消息', 'linear.x 前进，angular.z 转向', '-r 10 表示 10Hz 重复发送'],
        verifyCommand: 'rostopic echo /turtle1/pose --noarr'
      },
      intermediate: {
        task: '创建一个发布者节点，每秒发布当前时间',
        hints: ['rospy.Publisher', 'rospy.Rate(1)', 'std_msgs/String 或自定义类型'],
        verifyCommand: 'rostopic hz /topic_name'
      },
      advanced: {
        task: '创建一个订阅者节点，接收时间并计算延迟',
        hints: ['rospy.Subscriber', 'rospy.get_rostime() 获取当前时间', '计算差值'],
        verifyCommand: 'rosnode info /listener'
      }
    },
    pauseAndThink: [
      {
        question: '为什么话题用"发布-订阅"而不是"请求-响应"？',
        answer: '发布-订阅适合连续数据流（传感器数据、状态更新）：1) 发布者不需要等待响应；2) 订阅者数量可变；3) 时序解耦，双方不需要同时在线。请求-响应（服务）适合一次性查询。'
      },
      {
        question: '话题的队列大小（queue_size）设为多少合适？',
        answer: '取决于应用场景：高频传感器数据建议较大（100-1000），避免处理不及时丢帧；控制命令建议较小（1-10），使用最新数据。None 或不设置可能导致无限增长。'
      }
    ],
    quiz: [
      {
        id: 'topic-quiz-1',
        question: '查看话题列表的命令是？',
        options: ['rosnode list', 'rostopic list', 'rosmsg list', 'rosservice list'],
        correctAnswer: 1,
        explanation: 'rostopic list 列出所有活跃话题。rosnode 列节点，rosservice 列服务。'
      },
      {
        id: 'topic-quiz-2',
        question: '话题通信的特点是？',
        options: ['一对一同步通信', '一对多异步通信', '请求-响应模式', '需要建立连接才能通信'],
        correctAnswer: 1,
        explanation: '话题是发布-订阅模式：异步、多对多、发布者不等待订阅者。'
      },
      {
        id: 'topic-quiz-3',
        question: 'Python 中创建发布者的函数是？',
        options: ['rospy.create_publisher()', 'rospy.Publisher()', 'rospy.topic()', 'rospy.advertise()'],
        correctAnswer: 1,
        explanation: 'rospy.Publisher(topic_name, msg_type, queue_size=10) 创建发布者对象。'
      },
      {
        id: 'topic-quiz-4',
        question: '发布者发布消息后，订阅者多久能收到？',
        options: ['立即', '取决于网络和队列', '1秒后', '需要轮询'],
        correctAnswer: 1,
        explanation: '消息延迟取决于网络延迟、队列状态和回调处理速度，不是固定的。'
      }
    ],
    reviewSummary: '话题是发布-订阅异步通信。rostopic 命令：list, echo, pub, info。Python：rospy.Publisher/Subscriber。注意 queue_size 设置和消息类型匹配。',
    nextLesson: '理解了话题通信，下一步学习消息的定义和自定义。',
    nextLessonLink: 'ros-message',
    sources: [
      { title: 'ROS Wiki - 话题概念', url: 'http://wiki.ros.org/ROS/Tutorials/UnderstandingTopics', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - rostopic 命令', url: 'http://wiki.ros.org/rostopic', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `ROS 话题是节点间传递数据的命名通道。采用发布-订阅模式：

- **发布者 (Publisher)**：发送数据到话题
- **订阅者 (Subscriber)**：从话题接收数据
- **消息 (Message)**：话题中传输的数据结构

话题特点：
- 异步通信：发布者不等待订阅者
- 多对多：一个话题可以有多个发布者和订阅者
- 类型固定：每个话题有确定的消息类型`,
      whyImportant: '话题是 ROS 最常用的通信方式。传感器数据、状态更新、控制命令等都通过话题传输。',
      codeExamples: [
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
from std_msgs.msg import String

def publisher():
    rospy.init_node('talker')
    pub = rospy.Publisher('chatter', String, queue_size=10)
    rate = rospy.Rate(10)  # 10Hz
    
    while not rospy.is_shutdown():
        msg = String()
        msg.data = "Hello ROS %s" % rospy.get_time()
        pub.publish(msg)
        rate.sleep()

if __name__ == '__main__':
    try:
        publisher()
    except rospy.ROSInterruptException:
        pass`,
          description: 'Python 发布者示例',
          expectedOutput: '每秒发布 10 条消息到 chatter 话题'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
from std_msgs.msg import String

def callback(msg):
    rospy.loginfo("Received: %s", msg.data)

def subscriber():
    rospy.init_node('listener')
    rospy.Subscriber('chatter', String, callback)
    rospy.spin()

if __name__ == '__main__':
    subscriber()`,
          description: 'Python 订阅者示例',
          expectedOutput: '打印收到的消息'
        }
      ],
      commonErrors: [
        {
          error: 'topic does not exist',
          cause: '话题未被创建（无发布者）',
          solution: '确保发布者节点已启动'
        },
        {
          error: 'Could not process inbound connection',
          cause: '消息类型不匹配',
          solution: '确保发布者和订阅者使用相同的消息类型'
        },
        {
          error: 'Message filter dropping message',
          cause: '消息队列满或处理太慢',
          solution: '增加 queue_size 或优化回调处理'
        }
      ],
      tips: [
        '调试时用 rostopic echo 查看话题内容',
        '用 rostopic hz 检查发布频率',
        '高频话题注意队列和回调性能'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki 话题教程', url: 'http://wiki.ros.org/ROS/Tutorials/UnderstandingTopics' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-node', 'ros-message', 'ros-publisher-subscriber'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== ROS Message ====================
  {
    id: 'ros-message',
    slug: 'ros-message',
    title: 'ROS 消息 (Message) 定义与使用',
    category: 'communication',
    tags: ['message', '消息', 'msg', '自定义消息'],
    summary: '学习 ROS 消息的定义方式，掌握如何创建自定义消息类型。',
    difficulty: 'intermediate',
    readingTime: 18,
    prerequisites: ['ros-topic'],
    introHook: {
      problem: '你想在话题中传递自定义数据结构，但不知道怎么定义，也不知道现有的消息类型有哪些',
      scenario: '消息就像"快递包裹"，定义了包裹里装什么东西（字段）、每个东西的类型。ROS 提供了很多标准包裹（std_msgs），你也可以自定义。'
    },
    learningObjectives: [
      '理解 ROS 消息的定义和作用',
      '能使用 rosmsg 命令查看消息结构',
      '能创建自定义 .msg 文件',
      '能在代码中使用自定义消息',
      '理解消息类型的命名规范'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解数据类型的概念（int, float, string）？', hint: '变量存储的数据种类' },
        { question: '你是否知道 C 结构体或 Python 类的定义？', hint: '消息是结构化数据类型' },
        { question: '你是否用过 geometry_msgs/Twist 消息？', hint: '小海龟速度控制消息' }
      ]
    },
    intuition: {
      analogy: '消息就像"表格模板"。定义一个消息就像设计表格：第一列是姓名（string），第二列是年龄（int），第三列是成绩（float[]）。每次填表就是创建一个消息实例。',
      boundaries: '类比局限：消息不仅支持基本类型，还支持嵌套（消息包含消息）、数组、固定长度数组、默认值。消息是静态类型，编译时确定，不像表格可以随意改格式。'
    },
    timeline: [
      { time: '00:00', title: '消息概念', description: '为什么需要消息类型' },
      { time: '03:00', title: 'rosmsg 命令', description: 'show, list, package' },
      { time: '06:00', title: '标准消息', description: 'std_msgs, geometry_msgs, sensor_msgs' },
      { time: '10:00', title: '自定义消息', description: '创建 .msg 文件' },
      { time: '14:00', title: '编译和使用', description: 'CMakeLists.txt 配置' },
      { time: '17:00', title: '实践验收', description: '发布自定义消息' }
    ],
    minimalPractice: {
      terminal: '终端',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'rosmsg list', explanation: '列出所有消息类型' },
        { command: 'rosmsg show geometry_msgs/Twist', explanation: '查看 Twist 消息结构' },
        { command: 'rosmsg show sensor_msgs/LaserScan', explanation: '查看激光雷达消息结构' }
      ],
      expectedOutput: 'rosmsg show 显示消息字段列表'
    },
    misconceptions: [
      {
        misconception: '任何数据都能通过话题传递',
        rootCause: '不理解消息类型的限制',
        fix: '话题传递的数据必须是已定义的消息类型。消息类型是编译时确定的，发布者和订阅者必须使用相同类型。'
      },
      {
        misconception: '自定义消息很复杂',
        rootCause: '不知道创建流程',
        fix: '创建消息只需要：1) 在包中创建 msg/ 目录；2) 写 .msg 文件；3) 修改 CMakeLists.txt 和 package.xml；4) catkin_make 编译。'
      },
      {
        misconception: '消息字段可以任意命名',
        rootCause: '不了解命名规范',
        fix: '字段名应清晰表达含义，避免缩写。常见命名：x/y/z（坐标），linear/angular（速度），header（时间戳和坐标系）。遵循消息命名规范。'
      }
    ],
    practice: {
      basic: {
        task: '使用 rosmsg 查看 std_msgs/String 和 geometry_msgs/Pose 的结构',
        hints: ['rosmsg show std_msgs/String', 'rosmsg show geometry_msgs/Pose'],
        verifyCommand: 'rosmsg show geometry_msgs/Pose'
      },
      intermediate: {
        task: '创建一个自定义消息 Person.msg，包含 name(string), age(uint32), height(float64)',
        hints: ['在包中创建 msg/Person.msg', '修改 CMakeLists.txt 的 add_message_files', '修改 package.xml 的依赖'],
        verifyCommand: 'rosmsg show your_package/Person'
      },
      advanced: {
        task: '创建包含嵌套消息的消息 Student.msg，包含 Person 类型和 grade(float64)',
        hints: ['Person person', 'float64 grade', '需要依赖包含 Person 的包'],
        verifyCommand: 'rosmsg show your_package/Student'
      }
    },
    pauseAndThink: [
      {
        question: '为什么消息定义文件是 .msg 而不是 .py 或 .cpp？',
        answer: '.msg 是跨语言的消息定义，catkin 编译时自动生成 Python、C++、Lisp 等语言的类型代码。这样不同语言的节点可以通信，代码自动生成避免手写错误。'
      },
      {
        question: '消息里的 Header 是什么？为什么要加？',
        answer: 'Header 包含时间戳（stamp）和坐标系（frame_id）。用于同步数据和时间戳，在 TF、传感器数据中必须包含。格式：Header header。'
      }
    ],
    quiz: [
      {
        id: 'msg-quiz-1',
        question: '查看消息结构的命令是？',
        options: ['rosmsg list', 'rosmsg show', 'rosmsg info', 'rosmsg type'],
        correctAnswer: 1,
        explanation: 'rosmsg show <message_type> 显示消息的字段结构。'
      },
      {
        id: 'msg-quiz-2',
        question: '自定义消息文件应放在包的哪个目录？',
        options: ['src/', 'msg/', 'include/', 'scripts/'],
        correctAnswer: 1,
        explanation: '自定义 .msg 文件放在 msg/ 目录下，编译时自动生成代码。'
      },
      {
        id: 'msg-quiz-3',
        question: 'geometry_msgs/Twist 消息包含哪些字段？',
        options: ['只有 linear', '只有 angular', 'linear 和 angular', 'position 和 orientation'],
        correctAnswer: 2,
        explanation: 'Twist 包含 linear（线速度）和 angular（角速度），都是 Vector3 类型。'
      },
      {
        id: 'msg-quiz-4',
        question: '消息数组类型在 .msg 中如何定义？',
        options: ['int[] arr', 'int arr[]', 'array<int> arr', 'list<int> arr'],
        correctAnswer: 0,
        explanation: '消息数组用 type[]，如 int32[] data, float64[] ranges。'
      }
    ],
    reviewSummary: '消息定义数据结构。rosmsg show 查看结构。自定义消息：msg/ 目录 + .msg 文件 + CMakeLists.txt 配置。常用消息：std_msgs, geometry_msgs, sensor_msgs。',
    nextLesson: '理解了消息，下一步学习服务通信。',
    nextLessonLink: 'ros-service',
    sources: [
      { title: 'ROS Wiki - 消息定义', url: 'http://wiki.ros.org/ROS/Tutorials/DefiningCustomMessages', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - rosmsg 命令', url: 'http://wiki.ros.org/rosmsg', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `ROS 消息是话题中传输的数据结构。消息定义使用 .msg 文件，编译后生成各语言的类型代码。

基本数据类型：
- int8, int16, int32, int64
- uint8, uint16, uint32, uint64
- float32, float64
- string, time, duration
- 数组：type[] 和 type[n]

常用标准消息：
- std_msgs: String, Bool, Int32, Float64...
- geometry_msgs: Twist, Pose, Point, Vector3...
- sensor_msgs: Image, LaserScan, Imu, PointCloud2...`,
      whyImportant: '消息定义了节点间通信的数据格式。正确使用和定义消息是 ROS 开发的基础技能。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 创建自定义消息文件
mkdir -p ~/catkin_ws/src/my_pkg/msg
cat > ~/catkin_ws/src/my_pkg/msg/Person.msg << 'EOF'
string name
uint32 age
float64 height
EOF

# CMakeLists.txt 添加
find_package(catkin REQUIRED COMPONENTS message_generation std_msgs)
add_message_files(FILES Person.msg)
generate_messages(DEPENDENCIES std_msgs)
catkin_package(CATKIN_DEPENDS message_runtime)

# package.xml 添加
<build_depend>message_generation</build_depend>
<exec_depend>message_runtime</exec_depend>

# 编译
cd ~/catkin_ws && catkin_make

# 使用
rosmsg show my_pkg/Person`,
          description: '创建自定义消息',
          expectedOutput: 'rosmsg show 显示消息字段'
        }
      ],
      commonErrors: [
        {
          error: 'message type not found',
          cause: '消息未编译或包未 source',
          solution: 'catkin_make 编译，source devel/setup.bash'
        },
        {
          error: 'undefined symbol',
          cause: '消息依赖未声明',
          solution: '在 package.xml 中添加消息依赖'
        },
        {
          error: 'Cannot locate message',
          cause: '.msg 文件路径错误',
          solution: '确保文件在 msg/ 目录，CMakeLists.txt 正确配置'
        }
      ],
      tips: [
        '使用 rosmsg show 查看消息结构',
        '复杂消息可以嵌套，消息包含消息',
        '传感器数据通常需要 Header（时间戳和坐标系）'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki 消息教程', url: 'http://wiki.ros.org/ROS/Tutorials/DefiningCustomMessages' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-topic', 'ros-service', 'ros-parameter'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== ROS Service ====================
  {
    id: 'ros-service',
    slug: 'ros-service',
    title: 'ROS 服务 (Service) 与请求响应',
    category: 'communication',
    tags: ['service', '服务', 'rosservice', '请求响应'],
    summary: '学习 ROS 服务通信机制，掌握服务的定义、创建和使用方法。',
    difficulty: 'intermediate',
    readingTime: 18,
    prerequisites: ['ros-message'],
    introHook: {
      problem: '你想查询某个节点的状态或执行一次性操作，但话题通信不适合这种请求-响应场景',
      scenario: '服务就像"银行柜台"：你递交申请（请求），柜员处理并返回结果（响应）。必须等待柜员处理完才能离开，是一对一的同步交互。'
    },
    learningObjectives: [
      '理解服务的请求-响应通信模式',
      '能使用 rosservice 命令调用服务',
      '能创建服务端节点',
      '能创建客户端节点',
      '理解服务与话题的区别和适用场景'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解"请求-响应"模式？', hint: '客户端发送请求，服务端处理后返回响应' },
        { question: '你是否了解 RPC（远程过程调用）？', hint: '服务类似 RPC，调用远程函数' },
        { question: '你是否用过话题通信？', hint: '服务是话题的补充，用于不同场景' }
      ]
    },
    intuition: {
      analogy: '服务就像"餐厅点餐"：顾客（客户端）告诉服务员（服务端）要什么菜（请求），服务员去厨房准备，完成后端来菜品（响应）。顾客必须等待，不能离开。',
      boundaries: '类比局限：服务是同步的，客户端等待服务端响应，适合快速查询。如果操作耗时长（如导航），会阻塞客户端，应该用 Action。服务没有"订阅"概念，是一次性交互。'
    },
    timeline: [
      { time: '00:00', title: '服务概念', description: '请求-响应模式' },
      { time: '03:00', title: 'rosservice 命令', description: 'list, call, info' },
      { time: '07:00', title: '服务定义', description: '.srv 文件格式' },
      { time: '11:00', title: '创建服务端', description: 'Python/C++ Server' },
      { time: '15:00', title: '创建客户端', description: 'Python/C++ Client' },
      { time: '18:00', title: '实践验收', description: '自定义服务通信' }
    ],
    minimalPractice: {
      terminal: '终端',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'roscore &', explanation: '启动 ROS Master' },
        { command: 'rosrun turtlesim turtlesim_node', explanation: '启动小海龟（新终端）' },
        { command: 'rosservice list', explanation: '列出所有服务' },
        { command: 'rosservice info /turtlesim/get_loggers', explanation: '查看服务详情' },
        { command: 'rosservice call /turtlesim/teleportAbsolute "{x: 5.0, y: 5.0, theta: 0.0}"', explanation: '调用服务传送小海龟' }
      ],
      expectedOutput: 'rosservice call 后小海龟传送到指定位置'
    },
    misconceptions: [
      {
        misconception: '服务可以替代话题',
        rootCause: '不理解两种通信模式的适用场景',
        fix: '话题适合连续数据流（传感器、状态），服务适合一次性查询/操作（获取配置、执行命令）。选择原则：数据流用话题，查询用服务。'
      },
      {
        misconception: '服务调用是异步的',
        rootCause: '没有注意到服务是同步阻塞的',
        fix: '服务调用会阻塞客户端直到响应返回或超时。如果服务处理耗时长，客户端会卡住。需要异步调用或考虑 Action。'
      },
      {
        misconception: '服务不需要消息类型',
        rootCause: '不了解服务定义文件',
        fix: '服务需要 .srv 文件定义请求和响应类型，类似消息。格式：请求字段 --- 响应字段。'
      }
    ],
    practice: {
      basic: {
        task: '使用 rosservice call 控制小海龟传送和清除轨迹',
        hints: ['rosservice call /turtlesim/teleportAbsolute', 'rosservice call /clear'],
        verifyCommand: 'rosservice list | grep turtlesim'
      },
      intermediate: {
        task: '创建一个简单服务，接收整数返回平方值',
        hints: ['创建 .srv 文件定义请求和响应', '服务端 rospy.Service', '客户端 rospy.ServiceProxy'],
        verifyCommand: 'rosservice call /square "{input: 5}"'
      },
      advanced: {
        task: '创建服务计算两点距离，客户端传入两个 Point',
        hints: ['geometry_msgs/Point 请求', '自定义响应类型', '嵌套消息使用'],
        verifyCommand: 'rosservice call /distance'
      }
    },
    pauseAndThink: [
      {
        question: '为什么小海龟用服务传送而不是话题？',
        answer: '传送是一次性操作，需要确认执行结果。话题发布"传送命令"后无法确认是否成功执行。服务调用返回后确认操作完成，适合这种一次性查询/操作。'
      },
      {
        question: '服务超时会怎样？',
        answer: '默认超时时间很长，客户端会一直等待。可以设置超时：rospy.wait_for_service(timeout) 或 rospy.ServiceProxy.call(timeout)。超时后抛出异常，需要 try-catch 处理。'
      }
    ],
    quiz: [
      {
        id: 'service-quiz-1',
        question: '调用服务的命令是？',
        options: ['rosservice run', 'rosservice call', 'rosservice exec', 'rosservice invoke'],
        correctAnswer: 1,
        explanation: 'rosservice call <service> <args> 调用服务。'
      },
      {
        id: 'service-quiz-2',
        question: '服务通信的特点是？',
        options: ['异步多对多', '同步一对一', '发布订阅', '持续数据流'],
        correctAnswer: 1,
        explanation: '服务是同步的请求-响应模式，一对一通信。'
      },
      {
        id: 'service-quiz-3',
        question: '服务定义文件（.srv）中，请求和响应用什么分隔？',
        options: ['---', '===', '***', '###'],
        correctAnswer: 0,
        explanation: '使用三个横线 --- 分隔请求字段和响应字段。'
      },
      {
        id: 'service-quiz-4',
        question: 'Python 中创建服务端的函数是？',
        options: ['rospy.Server()', 'rospy.Service()', 'rospy.create_service()', 'rospy.advertise_service()'],
        correctAnswer: 1,
        explanation: 'rospy.Service(service_name, srv_type, callback) 创建服务端。'
      }
    ],
    reviewSummary: '服务是同步请求-响应。rosservice 命令：list, call, info。服务定义 .srv 用 --- 分隔请求响应。Python：rospy.Service/ServiceProxy。服务适合查询，不适合长时间操作。',
    nextLesson: '理解了服务，下一步学习参数服务器。',
    nextLessonLink: 'ros-parameter',
    sources: [
      { title: 'ROS Wiki - 服务概念', url: 'http://wiki.ros.org/ROS/Tutorials/UnderstandingServicesParams', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - rosservice 命令', url: 'http://wiki.ros.org/rosservice', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `ROS 服务提供请求-响应模式的通信。

服务特点：
- 同步通信：客户端等待服务端响应
- 一对一：一个服务端对多个客户端
- 一次性：每次调用返回一个响应

适用场景：
- 查询节点状态
- 执行一次性操作
- 获取配置数据

不适合：
- 高频数据传输
- 耗时操作（使用 Action）
- 多向通信`,
      whyImportant: '服务是 ROS 第二种重要通信机制，补充话题的不足，用于查询和一次性操作。',
      codeExamples: [
        {
          language: 'python',
          code: `# 服务端
#!/usr/bin/env python3
import rospy
from std_srvs.srv import SetBool, SetBoolResponse

def handle_service(req):
    return SetBoolResponse(success=True, message="OK")

if __name__ == '__main__':
    rospy.init_node('service_server')
    s = rospy.Service('my_service', SetBool, handle_service)
    rospy.spin()`,
          description: 'Python 服务端',
          expectedOutput: '服务启动后可被调用'
        },
        {
          language: 'python',
          code: `# 客户端
#!/usr/bin/env python3
import rospy
from std_srvs.srv import SetBool

if __name__ == '__main__':
    rospy.init_node('service_client')
    rospy.wait_for_service('my_service')
    try:
        proxy = rospy.ServiceProxy('my_service', SetBool)
        response = proxy(True)
        print(response.message)
    except rospy.ServiceException as e:
        print("Service call failed: %s" % e)`,
          description: 'Python 客户端',
          expectedOutput: '调用服务并打印响应'
        }
      ],
      commonErrors: [
        {
          error: 'Service not found',
          cause: '服务未启动或名称错误',
          solution: '用 rosservice list 检查服务是否存在'
        },
        {
          error: 'Service call failed',
          cause: '服务端处理出错或超时',
          solution: '检查服务端日志，确认服务正常'
        },
        {
          error: 'Unable to connect to service',
          cause: '网络问题或 master 未运行',
          solution: '检查 roscore 和网络连接'
        }
      ],
      tips: [
        '耗时操作不要用服务，考虑 Action',
        '使用 rosservice list 查看可用服务',
        '服务调用前用 wait_for_service 等待'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki 服务教程', url: 'http://wiki.ros.org/ROS/Tutorials/UnderstandingServicesParams' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-message', 'ros-topic', 'ros-parameter'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== ROS Parameter ====================
  {
    id: 'ros-parameter',
    slug: 'ros-parameter',
    title: 'ROS 参数服务器',
    category: 'communication',
    tags: ['parameter', '参数', 'rosparam', '配置'],
    summary: '学习 ROS 参数服务器的使用，掌握参数的读写和配置管理。',
    difficulty: 'intermediate',
    readingTime: 15,
    prerequisites: ['ros-service'],
    introHook: {
      problem: '你的节点需要一些配置参数（如机器人尺寸、传感器校准），但不知道应该放在哪里',
      scenario: '参数服务器就像"公共公告板"：所有节点都能读写上面的内容。启动时从 launch 文件或 YAML 加载配置，运行时查询参数值。'
    },
    learningObjectives: [
      '理解参数服务器的概念和作用',
      '能使用 rosparam 命令管理参数',
      '能在代码中读写参数',
      '能在 launch 文件中加载参数',
      '理解参数的类型和命名空间'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解"配置文件"的概念？', hint: 'YAML、JSON 等格式的配置数据' },
        { question: '你是否用过 launch 文件？', hint: 'launch 文件可以加载参数' },
        { question: '你是否知道全局变量和局部变量的区别？', hint: '参数服务器类似全局配置' }
      ]
    },
    intuition: {
      analogy: '参数服务器就像"公共布告栏"：任何人都可以查看、修改上面的内容。布告栏分成多个区域（命名空间），每个区域有自己的通知。启动时从文件批量张贴，运行时可以随时查询或修改。',
      boundaries: '类比局限：参数是静态配置，不适合高频变化的数据。参数服务器有性能限制，不适合大量参数。参数是全局的，节点间共享，需要注意命名空间避免冲突。'
    },
    timeline: [
      { time: '00:00', title: '参数概念', description: '参数服务器的作用' },
      { time: '03:00', title: 'rosparam 命令', description: 'get, set, list, dump' },
      { time: '06:00', title: '代码中读写', description: 'rospy.get_param, set_param' },
      { time: '09:00', title: 'launch 文件', description: '加载 YAML 参数' },
      { time: '12:00', title: '命名空间', description: '私有参数和全局参数' },
      { time: '14:00', title: '实践验收', description: '配置机器人参数' }
    ],
    minimalPractice: {
      terminal: '终端',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'roscore &', explanation: '启动 ROS Master（包含参数服务器）' },
        { command: 'rosparam list', explanation: '列出所有参数' },
        { command: 'rosparam set /my_param 42', explanation: '设置参数' },
        { command: 'rosparam get /my_param', explanation: '获取参数值' },
        { command: 'rosparam dump params.yaml', explanation: '导出所有参数到文件' }
      ],
      expectedOutput: 'rosparam get 返回设置的参数值'
    },
    misconceptions: [
      {
        misconception: '参数服务器可以存储任何数据',
        rootCause: '不了解参数的类型限制',
        fix: '参数支持：int, float, bool, string, list, dict。不支持二进制数据、大型数组、复杂对象。大量参数影响性能。'
      },
      {
        misconception: '参数可以随时修改，节点自动更新',
        rootCause: '不理解参数的静态特性',
        fix: '参数修改后，节点不会自动感知。需要在代码中定期检查或使用回调。参数适合启动时一次性加载，不适合动态配置。'
      },
      {
        misconception: '参数名随便起',
        rootCause: '不理解命名空间的重要性',
        fix: '参数名应包含命名空间，如 /robot/width。私有参数用 ~ 前缀，如 ~/max_speed。避免全局参数名冲突。'
      }
    ],
    practice: {
      basic: {
        task: '使用 rosparam 设置和获取参数',
        hints: ['rosparam set /test_param 123', 'rosparam get /test_param'],
        verifyCommand: 'rosparam get /test_param'
      },
      intermediate: {
        task: '创建一个 YAML 文件，用 rosparam load 加载',
        hints: ['创建 config.yaml', '格式：key: value', 'rosparam load config.yaml'],
        verifyCommand: 'rosparam list'
      },
      advanced: {
        task: '创建一个节点，读取参数并在参数变化时更新行为',
        hints: ['rospy.get_param()', 'rospy.set_param()', '可以在回调中检查参数'],
        verifyCommand: 'rosnode info /param_node'
      }
    },
    pauseAndThink: [
      {
        question: '参数和话题有什么区别？',
        answer: '参数是静态配置，话题是动态数据流。参数在启动时加载，运行时偶尔查询；话题数据持续流动。参数适合机器人尺寸、传感器校准等固定值；话题适合传感器读数、控制命令等变化数据。'
      },
      {
        question: '私有参数（~前缀）和全局参数有什么区别？',
        answer: '私有参数（~/param）属于节点命名空间，如 /my_node/max_speed。全局参数（/param）在根命名空间。私有参数避免节点间命名冲突，更适合节点配置。'
      }
    ],
    quiz: [
      {
        id: 'param-quiz-1',
        question: '设置参数的 rosparam 命令是？',
        options: ['rosparam write', 'rosparam set', 'rosparam add', 'rosparam config'],
        correctAnswer: 1,
        explanation: 'rosparam set <param> <value> 设置参数值。'
      },
      {
        id: 'param-quiz-2',
        question: '参数服务器最适合存储什么？',
        options: ['高频传感器数据', '实时控制命令', '静态配置参数', '视频流数据'],
        correctAnswer: 2,
        explanation: '参数服务器适合静态配置，不适合高频动态数据。'
      },
      {
        id: 'param-quiz-3',
        question: 'Python 中获取参数的函数是？',
        options: ['rospy.read_param()', 'rospy.get_param()', 'rospy.param()', 'rospy.fetch_param()'],
        correctAnswer: 1,
        explanation: 'rospy.get_param(param_name, default) 获取参数，可设置默认值。'
      },
      {
        id: 'param-quiz-4',
        question: 'launch 文件中加载参数用什么标签？',
        options: ['<param>', '<rosparam>', '<parameter>', '<config>'],
        correctAnswer: 1,
        explanation: '<rosparam file="config.yaml" /> 或 <param name="key" value="value" />。'
      }
    ],
    reviewSummary: '参数服务器存储全局配置。rosparam 命令：get, set, list, dump, load。Python：rospy.get_param, set_param。launch 文件加载 YAML。参数名注意命名空间，避免冲突。',
    nextLesson: '理解了参数，下一步学习 launch 文件系统。',
    nextLessonLink: 'ros-launch',
    sources: [
      { title: 'ROS Wiki - 参数服务器', url: 'http://wiki.ros.org/Parameter%20Server', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - rosparam 命令', url: 'http://wiki.ros.org/rosparam', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `ROS 参数服务器是一个共享的键值存储系统，用于存储配置数据。

参数特点：
- 全局可访问：所有节点都可以读写
- 静态配置：适合启动时加载的配置
- 类型有限：支持基本类型和简单结构
- 命名空间：参数按命名空间组织

参数类型：
- int, float, bool, string
- list (数组)
- dict (字典)`,
      whyImportant: '参数服务器是 ROS 配置管理的核心，用于存储机器人的静态配置参数。',
      codeExamples: [
        {
          language: 'yaml',
          code: `# config.yaml
robot:
  width: 0.5
  length: 0.7
  max_speed: 1.0
  
sensors:
  laser:
    frame_id: laser_link
    min_angle: -2.35
    max_angle: 2.35`,
          description: 'YAML 配置文件示例',
          expectedOutput: 'YAML 文件定义参数结构'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy

rospy.init_node('param_node')

# 获取参数，有默认值
width = rospy.get_param('~width', 0.5)

# 获取嵌套参数
laser_frame = rospy.get_param('/sensors/laser/frame_id', 'laser')

# 设置参数
rospy.set_param('~initialized', True)

# 检查参数是否存在
if rospy.has_param('~max_speed'):
    max_speed = rospy.get_param('~max_speed')
    
# 删除参数
rospy.delete_param('~temp_param')`,
          description: 'Python 参数操作',
          expectedOutput: '成功读写参数'
        }
      ],
      commonErrors: [
        {
          error: 'Parameter not found',
          cause: '参数不存在或命名空间错误',
          solution: '用 rosparam list 检查参数名，确保使用正确的命名空间'
        },
        {
          error: 'Parameter has wrong type',
          cause: '参数类型不匹配',
          solution: '检查参数的实际类型，使用正确的类型转换'
        },
        {
          error: 'Cannot reach parameter server',
          cause: 'roscore 未运行',
          solution: '启动 roscore'
        }
      ],
      tips: [
        '使用默认值避免参数不存在报错',
        '私有参数用 ~ 前缀',
        '大量参数使用 YAML 文件加载'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki 参数服务器', url: 'http://wiki.ros.org/Parameter%20Server' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-service', 'ros-launch'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== ROS Launch ====================
  {
    id: 'ros-launch',
    slug: 'ros-launch',
    title: 'ROS Launch 文件系统',
    category: 'tools',
    tags: ['launch', 'roslaunch', '启动文件', 'XML'],
    summary: '学习 ROS Launch 文件的编写，掌握多节点启动和参数配置。',
    difficulty: 'intermediate',
    readingTime: 20,
    prerequisites: ['ros-parameter'],
    introHook: {
      problem: '你有很多节点需要启动，每次手动 rosrun 很繁琐，而且容易漏掉某个节点',
      scenario: 'launch 文件就像"一键启动脚本"：定义好所有节点、参数、命名空间，一个命令启动整个系统。就像智能家居的"回家模式"，一键开启所有设备。'
    },
    learningObjectives: [
      '理解 launch 文件的作用和结构',
      '能编写基本的 launch 文件',
      '能使用 include 包含其他 launch 文件',
      '能配置参数、命名空间和重映射',
      '能使用 roslaunch 命令启动系统'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解 XML 的基本语法？', hint: '标签、属性、嵌套' },
        { question: '你是否手动启动过多个节点？', hint: 'launch 文件可以一键启动' },
        { question: '你是否了解参数和命名空间？', hint: 'launch 文件可以配置这些' }
      ]
    },
    intuition: {
      analogy: 'launch 文件就像"乐队总谱"：指定每个乐器（节点）何时开始、音量（参数）多大、位置（命名空间）在哪。指挥（roslaunch）一挥手，整个乐队按照总谱演奏。',
      boundaries: '类比局限：launch 文件不仅启动节点，还能：加载参数、设置环境变量、包含其他 launch 文件、条件执行。launch 文件是声明式的，不是脚本，不能有复杂逻辑。'
    },
    timeline: [
      { time: '00:00', title: 'Launch 概念', description: '为什么需要 launch 文件' },
      { time: '03:00', title: '基本结构', description: 'node, param, rosparam' },
      { time: '07:00', title: '命名空间', description: 'ns, name, group' },
      { time: '11:00', title: '重映射', description: '话题和服务重映射' },
      { time: '15:00', title: 'include', description: '包含其他 launch 文件' },
      { time: '18:00', title: '实践验收', description: '编写完整 launch 文件' }
    ],
    minimalPractice: {
      terminal: '终端',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'roslaunch turtlesim turtlesim_drawing_square.launch', explanation: '运行示例 launch 文件' },
        { command: 'rosnode list', explanation: '查看启动的节点' }
      ],
      expectedOutput: 'launch 文件启动多个节点，小海龟开始画方'
    },
    misconceptions: [
      {
        misconception: 'launch 文件必须有 roscore 才能运行',
        rootCause: '不了解 roslaunch 自动启动 master',
        fix: 'roslaunch 会自动启动 roscore（如果未运行）。不需要单独启动 roscore，除非需要明确控制 master。'
      },
      {
        misconception: 'launch 文件是脚本，可以写复杂逻辑',
        rootCause: '误解 launch 文件的本质',
        fix: 'launch 文件是声明式的配置文件，不是脚本。不能有循环、条件判断（除了 if/unless）。复杂逻辑应该在节点代码中实现。'
      },
      {
        misconception: '节点名和话题名必须固定',
        rootCause: '不了解重映射功能',
        fix: 'launch 文件可以重映射话题名（remap）和节点名（name）。同一个节点可以启动多次，用不同名字。话题可以重映射到不同名称。'
      }
    ],
    practice: {
      basic: {
        task: '创建一个 launch 文件，启动小海龟和键盘控制',
        hints: ['<node pkg="turtlesim" type="turtlesim_node"', '<node pkg="turtlesim" type="turtle_teleop_key"'],
        verifyCommand: 'roslaunch my_pkg turtlesim.launch'
      },
      intermediate: {
        task: '创建 launch 文件加载参数，并使用命名空间',
        hints: ['<rosparam file="config.yaml"', '<group ns="robot1"'],
        verifyCommand: 'rosparam list'
      },
      advanced: {
        task: '创建一个 launch 文件包含其他 launch 文件，并传递参数',
        hints: ['<include file="$(find pkg)/launch/other.launch"', '<arg name="use_sim" default="false"'],
        verifyCommand: 'roslaunch my_pkg main.launch use_sim:=true'
      }
    },
    pauseAndThink: [
      {
        question: '为什么推荐使用 roslaunch 而不是手动 rosrun？',
        answer: 'roslaunch 优势：1) 一键启动多个节点；2) 自动管理 roscore；3) 统一配置参数；4) 支持命名空间和重映射；5) 自动响应节点崩溃重启。大型系统必须用 launch 文件。'
      },
      {
        question: 'launch 文件中的 arg 和 param 有什么区别？',
        answer: 'arg 是 launch 文件的参数（类似函数参数），可以在命令行传递或设默认值。param 是参数服务器的参数，节点可以读取。arg 用于配置 launch 文件行为，param 用于节点配置。'
      }
    ],
    quiz: [
      {
        id: 'launch-quiz-1',
        question: '启动 launch 文件的命令是？',
        options: ['rosrun launch', 'roslaunch', 'rosstart', 'rosexec'],
        correctAnswer: 1,
        explanation: 'roslaunch <package> <launch_file> 启动 launch 文件。'
      },
      {
        id: 'launch-quiz-2',
        question: 'launch 文件中启动节点的标签是？',
        options: ['<node>', '<start>', '<run>', '<process>'],
        correctAnswer: 0,
        explanation: '<node pkg="包名" type="节点类型" name="节点名" /> 启动节点。'
      },
      {
        id: 'launch-quiz-3',
        question: '在 launch 文件中加载参数的标签是？',
        options: ['<param>', '<rosparam>', '两者都可以', '都不对'],
        correctAnswer: 2,
        explanation: '<param> 加载单个参数，<rosparam> 加载 YAML 文件或多个参数。'
      },
      {
        id: 'launch-quiz-4',
        question: 'roslaunch 命令会自动做什么？',
        options: ['关闭所有节点', '启动 roscore', '删除参数', '重启系统'],
        correctAnswer: 1,
        explanation: 'roslaunch 会自动启动 roscore（如果未运行）。'
      }
    ],
    reviewSummary: 'launch 文件定义多节点启动配置。核心标签：node（节点）、param/rosparam（参数）、include（包含）、remap（重映射）。roslaunch 自动启动 master。用 arg 传递参数，用 ns 组织命名空间。',
    nextLesson: '掌握了 launch 文件，下一步学习 TF 坐标变换。',
    nextLessonLink: 'tf-transform',
    sources: [
      { title: 'ROS Wiki - roslaunch', url: 'http://wiki.ros.org/roslaunch', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - Launch 文件格式', url: 'http://wiki.ros.org/roslaunch/XML', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `ROS Launch 文件是 XML 格式的配置文件，用于启动多个节点和配置参数。

主要元素：
- **node**: 启动节点
- **param**: 设置单个参数
- **rosparam**: 加载 YAML 参数文件
- **include**: 包含其他 launch 文件
- **group**: 组织节点和参数到命名空间
- **remap**: 重映射话题和服务名
- **arg**: 定义可配置参数`,
      whyImportant: 'Launch 文件是管理复杂 ROS 系统的标准方式，避免手动启动大量节点。',
      codeExamples: [
        {
          language: 'xml',
          code: `<!-- turtlesim.launch -->
<launch>
  <!-- 参数 -->
  <arg name="turtle_name" default="turtle1"/>
  
  <!-- 启动节点 -->
  <node pkg="turtlesim" type="turtlesim_node" name="$(arg turtle_name)">
    <!-- 重映射话题 -->
    <remap from="cmd_vel" to="/cmd_vel"/>
  </node>
  
  <!-- 加载参数 -->
  <param name="background_r" value="100"/>
  
  <!-- 包含其他 launch -->
  <include file="$(find my_pkg)/launch/config.launch"/>
  
  <!-- 命名空间组 -->
  <group ns="robot1">
    <node pkg="my_pkg" type="driver" name="driver"/>
  </group>
</launch>`,
          description: 'Launch 文件示例',
          expectedOutput: 'roslaunch 启动配置的节点和参数'
        }
      ],
      commonErrors: [
        {
          error: 'Cannot locate node',
          cause: '节点类型不存在或路径错误',
          solution: '检查 pkg 和 type 是否正确，确保包已编译'
        },
        {
          error: 'Invalid parameter',
          cause: '参数格式错误或类型不匹配',
          solution: '检查参数值格式，YAML 文件语法'
        },
        {
          error: 'Launch file not found',
          cause: 'launch 文件路径错误',
          solution: '使用 $(find pkg) 定位包路径'
        }
      ],
      tips: [
        '使用 arg 让 launch 文件可配置',
        '用 group 组织相关节点到命名空间',
        '调试时用 --screen 显示节点输出'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki Launch 文档', url: 'http://wiki.ros.org/roslaunch/XML' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-parameter', 'ros-node', 'ros-topic'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== TF Transform ====================
  {
    id: 'tf-transform',
    slug: 'tf-transform',
    title: 'TF 坐标变换系统',
    category: 'transform',
    tags: ['tf', 'tf2', '坐标变换', '坐标系'],
    summary: '学习 ROS 的 TF 坰标变换系统，理解坐标系的组织和使用方法。',
    difficulty: 'intermediate',
    readingTime: 25,
    prerequisites: ['ros-launch', 'ros-topic'],
    introHook: {
      problem: '你的机器人有激光雷达、摄像头、底盘，它们安装在不同位置，数据需要统一到同一坐标系',
      scenario: 'TF 就像一个"坐标系翻译官"：激光雷达说"前方 2 米"，TF 翻译成"相对于机器人中心，前方 2.3 米、偏左 0.1 米"。没有 TF，每个传感器只能用自己坐标系。'
    },
    learningObjectives: [
      '理解 TF/TF2 坐标变换系统的作用',
      '理解坐标系树的组织结构',
      '能使用 tf2_ros 发布坐标变换',
      '能使用 tf2_ros 查询坐标变换',
      '能使用 RViz 可视化坐标系'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解坐标系的概念？', hint: '用来描述位置的参考系' },
        { question: '你是否了解 3D 变换（平移、旋转）？', hint: '坐标变换由位置和姿态组成' },
        { question: '你是否用过 ROS 的消息类型？', hint: 'TF 使用 geometry_msgs/TransformStamped' }
      ]
    },
    intuition: {
      analogy: 'TF 就像一个"公司组织架构图"：CEO（base_link）在顶层，下面有部门经理（传感器），每个员工相对于上级有固定位置。通过组织架构，可以算出任何两个员工之间的相对位置。',
      boundaries: '类比局限：TF 坐标系树是动态的，位置可以随时间变化（如机器人移动）。TF2 支持时间插值，查询任意时间点的变换。TF 有时间缓冲，不像组织架构是静态的。'
    },
    timeline: [
      { time: '00:00', title: 'TF 概念', description: '坐标系变换的作用' },
      { time: '04:00', title: '坐标系树', description: '父子关系、树结构' },
      { time: '08:00', title: '发布变换', description: 'StaticTransformBroadcaster' },
      { time: '12:00', title: '查询变换', description: 'Buffer, TransformListener' },
      { time: '16:00', title: 'RViz 可视化', description: '查看坐标系关系' },
      { time: '20:00', title: '实践验收', description: '发布和查询变换' }
    ],
    minimalPractice: {
      terminal: '终端',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'roscore &', explanation: '启动 ROS Master' },
        { command: 'rosrun tf2_tools view_frames', explanation: '生成坐标系图（需要先有 TF 数据）' },
        { command: 'rosrun tf2_ros tf2_echo base_link laser_link', explanation: '查询两个坐标系之间的变换' }
      ],
      expectedOutput: 'tf2_echo 显示两个坐标系之间的变换矩阵'
    },
    misconceptions: [
      {
        misconception: 'TF 可以连接任意两个坐标系',
        rootCause: '不理解 TF 树的约束',
        fix: 'TF 坐标系必须形成树，不能有环。每个坐标系只能有一个父节点。如果要查询的两个坐标系在树中没有路径，会报错。'
      },
      {
        misconception: '坐标变换是静态的',
        rootCause: '不理解 TF 的时间戳',
        fix: 'TF 变换带时间戳，随时间变化（如机器人移动）。查询时需要指定时间点。TF2 会缓存历史变换，支持时间插值。'
      },
      {
        misconception: 'TF 和 TF2 是一样的',
        rootCause: '不了解版本差异',
        fix: 'TF 是旧版（Python2 为主），TF2 是新版（性能更好，API 更清晰）。Noetic 推荐用 TF2。tf2_ros 提供发布者和监听器。'
      }
    ],
    practice: {
      basic: {
        task: '使用 static_transform_publisher 发布一个静态坐标变换',
        hints: ['rosrun tf2_ros static_transform_publisher x y z yaw pitch roll frame child'],
        verifyCommand: 'rosrun tf2_ros tf2_echo frame child'
      },
      intermediate: {
        task: '创建一个节点发布动态坐标变换（模拟旋转）',
        hints: ['tf2_ros.TransformBroadcaster()', 'geometry_msgs.TransformStamped()', '设置时间戳和坐标'],
        verifyCommand: 'rosrun tf view_chain'
      },
      advanced: {
        task: '创建一个节点查询两个坐标系的变换并发布到话题',
        hints: ['tf2_ros.Buffer()', 'tf2_ros.TransformListener()', 'buffer.lookup_transform()'],
        verifyCommand: 'rostopic echo /transform'
      }
    },
    pauseAndThink: [
      {
        question: '为什么 TF 树不能有环？',
        answer: 'TF 树表示坐标系的层级关系，每个坐标系通过父节点定义。如果有环，会形成矛盾：A 相对于 B，B 相对于 A，无法确定绝对位置。ROS 会检测并报错。'
      },
      {
        question: '什么时候用 static_transform_publisher？',
        answer: '静态坐标变换（传感器固定在机器人上）用 static_transform_publisher，简单高效。动态变换（机械臂关节）需要在节点中发布。静态变换使用 static_transform_publisher 会优化缓存。'
      }
    ],
    quiz: [
      {
        id: 'tf-quiz-1',
        question: 'TF 坐标系树的特点是？',
        options: ['可以有多个根节点', '每个节点只能有一个父节点', '可以形成环形结构', '不需要时间戳'],
        correctAnswer: 1,
        explanation: 'TF 树每个坐标系只能有一个父节点，形成单根树结构，不能有环。'
      },
      {
        id: 'tf-quiz-2',
        question: '查询坐标变换的命令是？',
        options: ['rosrun tf tf_echo', 'rosrun tf2_ros tf2_echo', 'tf_query', 'rosrun tf2 query'],
        correctAnswer: 1,
        explanation: 'rosrun tf2_ros tf2_echo <source> <target> 查询两个坐标系之间的变换。'
      },
      {
        id: 'tf-quiz-3',
        question: 'Python 中发布 TF 变换使用什么类？',
        options: ['tf2_ros.Publisher', 'tf2_ros.TransformBroadcaster', 'tf2_ros.TransformPublisher', 'tf.Broadcaster'],
        correctAnswer: 1,
        explanation: 'tf2_ros.TransformBroadcaster 用于发布坐标变换。'
      },
      {
        id: 'tf-quiz-4',
        question: 'TF2 相比 TF1 的优势是？',
        options: ['没有区别', '性能更好，API 更清晰', '只支持 Python', '不支持时间插值'],
        correctAnswer: 1,
        explanation: 'TF2 性能更好，API 更清晰，支持时间插值和更长的缓冲。'
      }
    ],
    reviewSummary: 'TF 管理坐标系变换。核心概念：坐标系树、父子关系、时间戳。tf2_ros 命令：tf2_echo, static_transform_publisher。Python：TransformBroadcaster 发布，Buffer+TransformListener 查询。',
    nextLesson: '理解了 TF，下一步学习 URDF 机器人模型。',
    nextLessonLink: 'urdf-xacro',
    sources: [
      { title: 'ROS Wiki - TF2 教程', url: 'http://wiki.ros.org/tf2/Tutorials', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - tf2_ros', url: 'http://wiki.ros.org/tf2_ros', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `TF/TF2 是 ROS 的坐标变换系统，用于跟踪多个坐标系之间的关系。

核心概念：
- **坐标系 (frame)**：描述位置的参考系
- **变换 (transform)**：两个坐标系之间的位置和旋转关系
- **TF 树**：所有坐标系形成的层级结构

TF 组件：
- **Broadcaster**：发布坐标变换
- **Listener**：监听并查询坐标变换
- **Buffer**：存储历史变换数据

常用工具：
- static_transform_publisher：发布静态变换
- tf2_echo：查询两个坐标系之间的变换
- view_frames：生成坐标系图`,
      whyImportant: 'TF 是机器人系统的核心组件，用于统一不同传感器和执行器的坐标系。',
      codeExamples: [
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
import tf2_ros
from geometry_msgs.msg import TransformStamped

rospy.init_node('tf_publisher')
broadcaster = tf2_ros.TransformBroadcaster()

rate = rospy.Rate(10)
while not rospy.is_shutdown():
    t = TransformStamped()
    t.header.stamp = rospy.Time.now()
    t.header.frame_id = "base_link"
    t.child_frame_id = "sensor_link"
    t.transform.translation.x = 0.1
    t.transform.translation.y = 0.0
    t.transform.translation.z = 0.2
    t.transform.rotation.w = 1.0  # 无旋转
    broadcaster.sendTransform(t)
    rate.sleep()`,
          description: 'Python 发布 TF 变换',
          expectedOutput: '发布 base_link 到 sensor_link 的变换'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
import tf2_ros

rospy.init_node('tf_listener')
buffer = tf2_ros.Buffer()
listener = tf2_ros.TransformListener(buffer)

rate = rospy.Rate(1)
while not rospy.is_shutdown():
    try:
        trans = buffer.lookup_transform('base_link', 'sensor_link', rospy.Time())
        rospy.loginfo(f"Translation: {trans.transform.translation}")
    except Exception as e:
        rospy.logwarn(f"Transform failed: {e}")
    rate.sleep()`,
          description: 'Python 查询 TF 变换',
          expectedOutput: '打印 base_link 到 sensor_link 的变换'
        }
      ],
      commonErrors: [
        {
          error: 'Frame does not exist',
          cause: '坐标系未发布或名称错误',
          solution: '用 rosrun tf view_frames 检查坐标系树'
        },
        {
          error: 'Extrapolation into the future',
          cause: '查询的变换时间在未来',
          solution: '使用 rospy.Time(0) 获取最新变换'
        },
        {
          error: 'TF tree has a loop',
          cause: '坐标系形成环',
          solution: '检查发布者，确保每个坐标系只有一个父节点'
        }
      ],
      tips: [
        '静态变换用 static_transform_publisher',
        '调试时用 view_frames 可视化坐标系树',
        '查询变换时处理异常'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki TF2 教程', url: 'http://wiki.ros.org/tf2/Tutorials' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-launch', 'urdf-xacro', 'rosbag'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== URDF/Xacro ====================
  {
    id: 'urdf-xacro',
    slug: 'urdf-xacro',
    title: 'URDF 机器人模型与 Xacro',
    category: 'transform',
    tags: ['urdf', 'xacro', '机器人模型', '仿真'],
    summary: '学习 URDF 机器人描述格式和 Xacro 宏语言，创建可仿真的机器人模型。',
    difficulty: 'intermediate',
    readingTime: 25,
    prerequisites: ['tf-transform'],
    introHook: {
      problem: '你想在仿真中使用自己的机器人模型，但不知道怎么描述机器人的结构',
      scenario: 'URDF 就像"机器人蓝图"：定义每个零件（link）的形状和颜色，定义零件之间的连接（joint）如何运动。Xacro 是蓝图模板语言，让蓝图更简洁。'
    },
    learningObjectives: [
      '理解 URDF 的基本结构',
      '理解 link 和 joint 的概念',
      '能编写基本的 URDF 文件',
      '能使用 Xacro 简化 URDF',
      '能在 RViz 和 Gazebo 中查看模型'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解机器人的运动学结构？', hint: '基座、连杆、关节' },
        { question: '你是否了解 XML 的基本语法？', hint: 'URDF 是 XML 格式' },
        { question: '你是否用过 TF？', hint: 'URDF 自动发布 TF 变换' }
      ]
    },
    intuition: {
      analogy: 'URDF 就像"乐高说明书"：定义每个积木块（link）长什么样，积木块之间怎么连接（joint），哪些连接可以转动（revolute）、哪些固定（fixed）。最终组装出完整的机器人模型。',
      boundaries: '类比局限：URDF 不仅是外观，还包括碰撞检测、物理属性、传感器模拟。Xacro 可以用宏和条件简化重复定义，比普通乐高说明书更灵活。'
    },
    timeline: [
      { time: '00:00', title: 'URDF 概念', description: 'link 和 joint 的作用' },
      { time: '05:00', title: '基本结构', description: 'XML 标签和属性' },
      { time: '10:00', title: 'Link 定义', description: '视觉、碰撞、惯性' },
      { time: '15:00', title: 'Joint 定义', description: '固定、旋转、移动关节' },
      { time: '20:00', title: 'Xacro 语法', description: '宏、变量、条件' },
      { time: '25:00', title: '实践验收', description: '创建机器人模型' }
    ],
    minimalPractice: {
      terminal: '终端',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'roslaunch urdf_tutorial display.launch model:=\'$(find urdf_tutorial)/urdf/01-myfirst.urdf\'', explanation: '在 RViz 中显示示例 URDF' },
        { command: 'check_urdf my_robot.urdf', explanation: '检查 URDF 文件语法' },
        { command: 'urdf_to_graphiz my_robot.urdf', explanation: '生成机器人结构图' }
      ],
      expectedOutput: 'RViz 显示机器人模型，终端输出 TF 树'
    },
    misconceptions: [
      {
        misconception: 'URDF 只是为了显示模型外观',
        rootCause: '不了解 URDF 的完整功能',
        fix: 'URDF 包含：1) visual（可视化）；2) collision（碰撞检测）；3) inertial（物理仿真）；4) sensor（传感器模拟）。缺少这些会导致仿真异常。'
      },
      {
        misconception: 'Xacro 是必须的',
        rootCause: '不理解 Xacro 的定位',
        fix: 'Xacro 是 URDF 的预处理工具，用于简化重复结构。简单模型可以直接写 URDF。复杂模型推荐用 Xacro，减少代码量。'
      },
      {
        misconception: '关节类型可以随便选',
        rootCause: '不理解物理约束',
        fix: 'joint 类型取决于物理运动：fixed（固定连接）、revolute（旋转关节，有限位）、continuous（无限旋转，如轮子）、prismatic（滑动关节）。选择错误会导致仿真异常。'
      }
    ],
    practice: {
      basic: {
        task: '创建一个简单的 URDF，包含两个 link 和一个 fixed joint',
        hints: ['<link name="base_link">', '<link name="top_link">', '<joint type="fixed">'],
        verifyCommand: 'check_urdf my_robot.urdf'
      },
      intermediate: {
        task: '使用 Xacro 重写 URDF，使用宏简化重复结构',
        hints: ['<xacro:macro>', '<xacro:property>', 'xacro my_robot.urdf.xacro'],
        verifyCommand: 'rosrun xacro xacro my_robot.urdf.xacro'
      },
      advanced: {
        task: '添加 Gazebo 物理属性和传感器插件',
        hints: ['<gazebo>', '<sensor type="ray">', '<plugin filename="libgazebo_ros_laser.so">'],
        verifyCommand: 'roslaunch my_robot gazebo.launch'
      }
    },
    pauseAndThink: [
      {
        question: '为什么 URDF 需要 collision 和 inertial？',
        answer: 'visual 只是显示，不影响物理。collision 用于碰撞检测，inertial 用于物理仿真（质量、惯性张量）。缺少这些会导致 Gazebo 中机器人穿透地面、翻倒、不受力。'
      },
      {
        question: 'URDF 和 SDF 有什么区别？',
        answer: 'URDF 是 ROS 标准格式，支持 ROS 工具链（RViz、TF）。SDF（Simulation Description Format）是 Gazebo 的格式，支持更复杂的结构（闭环、多关节）。ROS 可以通过模型转换使用 SDF。'
      }
    ],
    quiz: [
      {
        id: 'urdf-quiz-1',
        question: 'URDF 中定义机器人零件外观的标签是？',
        options: ['<link>', '<joint>', '<visual>', '<collision>'],
        correctAnswer: 2,
        explanation: '<visual> 定义零件的外观（形状、颜色）。<link> 是零件容器，<collision> 用于碰撞检测。'
      },
      {
        id: 'urdf-quiz-2',
        question: '关节类型 continuous 的特点是？',
        options: ['固定不动', '有限角度旋转', '无限旋转', '直线移动'],
        correctAnswer: 2,
        explanation: 'continuous 关节可以无限旋转，适合轮子等需要持续转动的关节。'
      },
      {
        id: 'urdf-quiz-3',
        question: 'Xacro 的主要作用是？',
        options: ['替代 URDF', '简化 URDF 编写', '在 Gazebo 中运行', '生成 TF 树'],
        correctAnswer: 1,
        explanation: 'Xacro 是 URDF 预处理器，通过宏、变量、条件语句简化复杂 URDF 的编写。'
      },
      {
        id: 'urdf-quiz-4',
        question: '检查 URDF 文件语法的命令是？',
        options: ['check_urdf', 'urdf_check', 'validate_urdf', 'rosrun urdf check'],
        correctAnswer: 0,
        explanation: 'check_urdf <file.urdf> 检查 URDF 文件语法是否正确。'
      }
    ],
    reviewSummary: 'URDF 定义机器人模型：link（零件）和 joint（连接）。joint 类型：fixed、revolute、continuous、prismatic。Xacro 简化重复结构。Gazebo 需要 collision 和 inertial。',
    nextLesson: '掌握了 URDF，下一步学习 rosbag 数据记录。',
    nextLessonLink: 'rosbag',
    sources: [
      { title: 'ROS Wiki - URDF 教程', url: 'http://wiki.ros.org/urdf/Tutorials', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - Xacro', url: 'http://wiki.ros.org/xacro', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `URDF（Unified Robot Description Format）是 ROS 的机器人描述格式。

核心元素：
- **link**：机器人的刚性部件
- **joint**：连接两个 link 的关节
- **transmission**：驱动关节的传动装置

Link 属性：
- visual：可视化形状和颜色
- collision：碰撞检测形状
- inertial：物理仿真属性

Joint 类型：
- fixed：固定连接
- revolute：有限角度旋转
- continuous：无限旋转
- prismatic：直线移动`,
      whyImportant: 'URDF 是 ROS 机器人模型的统一标准，用于仿真、可视化和控制。',
      codeExamples: [
        {
          language: 'xml',
          code: `<?xml version="1.0"?>
<robot name="my_robot">
  <!-- 基座连杆 -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.3 0.2"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.3 0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10"/>
      <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
    </inertial>
  </link>
  
  <!-- 轮子连杆 -->
  <link name="wheel_link">
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.05"/>
      </geometry>
    </visual>
  </link>
  
  <!-- 连接关节 -->
  <joint name="wheel_joint" type="continuous">
    <parent link="base_link"/>
    <child link="wheel_link"/>
    <axis xyz="0 0 1"/>
  </joint>
</robot>`,
          description: '基本 URDF 示例',
          expectedOutput: 'RViz 中显示机器人模型'
        }
      ],
      commonErrors: [
        {
          error: 'Joint parent/child link does not exist',
          cause: 'joint 引用的 link 未定义',
          solution: '确保所有 joint 的 parent 和 child link 都已定义'
        },
        {
          error: 'URDF is not a valid XML',
          cause: 'XML 语法错误',
          solution: '使用 check_urdf 检查语法，确保标签正确闭合'
        },
        {
          error: 'No visual/collision/inertial for link',
          cause: 'link 缺少必要属性',
          solution: '为 Gazebo 仿真的 link 添加 collision 和 inertial'
        }
      ],
      tips: [
        '使用 check_urdf 验证 URDF 文件',
        '复杂模型用 Xacro 简化',
        'Gazebo 需要完整的 collision 和 inertial'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki URDF', url: 'http://wiki.ros.org/urdf' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['tf-transform', 'rosbag'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== Rosbag ====================
  {
    id: 'rosbag',
    slug: 'rosbag',
    title: 'Rosbag 数据记录与回放',
    category: 'tools',
    tags: ['rosbag', '数据记录', '回放', '调试'],
    summary: '学习使用 rosbag 记录和回放 ROS 话题数据，用于调试和分析。',
    difficulty: 'intermediate',
    readingTime: 15,
    prerequisites: ['ros-topic', 'ros-launch'],
    introHook: {
      problem: '你的机器人出了问题，但问题只在某些特定情况下出现，你想记录数据后分析',
      scenario: 'rosbag 就像一个"黑匣子"：记录飞行中的所有数据，事后分析事故原因。记录时打开，回放时重现当时场景。'
    },
    learningObjectives: [
      '理解 rosbag 的作用和使用场景',
      '能使用 rosbag record 记录话题数据',
      '能使用 rosbag play 回放记录的数据',
      '能使用 rosbag info 查看记录文件信息',
      '能在 launch 文件中使用 rosbag'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解话题的异步通信？', hint: 'rosbag 记录话题消息' },
        { question: '你是否需要调试机器人问题？', hint: 'rosbag 用于记录和分析' },
        { question: '你是否了解时间戳的概念？', hint: 'rosbag 按时间回放' }
      ]
    },
    intuition: {
      analogy: 'rosbag 就像一个"录像机"：可以录制某个时间段的画面（话题数据），之后随时回放。回放时就像时光倒流，重现当时的场景。',
      boundaries: '类比局限：rosbag 记录的是结构化数据，不是视频。可以筛选话题记录。回放可以加速、减速、循环。bag 文件可能很大，注意磁盘空间。'
    },
    timeline: [
      { time: '00:00', title: 'Rosbag 概念', description: '数据记录的作用' },
      { time: '02:00', title: 'record 命令', description: '记录话题数据' },
      { time: '05:00', title: 'play 命令', description: '回放记录的数据' },
      { time: '08:00', title: 'info 命令', description: '查看 bag 文件信息' },
      { time: '11:00', title: '高级选项', description: '筛选、压缩、时间控制' },
      { time: '14:00', title: '实践验收', description: '记录和回放实验' }
    ],
    minimalPractice: {
      terminal: '终端',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'rosbag record -a -O test.bag', explanation: '记录所有话题到 test.bag（运行几秒后 Ctrl+C）' },
        { command: 'rosbag info test.bag', explanation: '查看 bag 文件信息' },
        { command: 'rosbag play test.bag', explanation: '回放记录的数据' }
      ],
      expectedOutput: 'rosbag info 显示话题列表和消息数量；play 回放数据'
    },
    misconceptions: [
      {
        misconception: 'rosbag 可以记录所有东西',
        rootCause: '不了解记录范围限制',
        fix: 'rosbag 记录话题消息，不记录服务调用、参数、节点内部状态。-a 记录所有话题，但可能遗漏快照或大型数据。'
      },
      {
        misconception: '回放时必须用原来的节点',
        rootCause: '不理解回放的独立性',
        fix: '回放时 rosbag 充当发布者，发布记录的话题。其他节点可以正常订阅，不需要原来的节点运行。这是调试的关键。'
      },
      {
        misconception: 'bag 文件不会很大',
        rootCause: '低估了数据量',
        fix: '高频传感器数据（激光雷达、图像）会产生巨大的 bag 文件。使用 -b 限制单个文件大小，或 --lz4 压缩。磁盘空间很重要。'
      }
    ],
    practice: {
      basic: {
        task: '使用 rosbag record 记录小海龟的话题，然后回放',
        hints: ['rosbag record /turtle1/cmd_vel /turtle1/pose', 'rosbag play recorded.bag'],
        verifyCommand: 'rosbag info recorded.bag'
      },
      intermediate: {
        task: '筛选记录特定话题，使用压缩选项',
        hints: ['rosbag record --lz4 /topic1 /topic2', 'rosbag info 显示压缩信息'],
        verifyCommand: 'rosbag info --yaml compressed.bag'
      },
      advanced: {
        task: '在 launch 文件中自动记录和回放',
        hints: ['<node pkg="rosbag" type="record" args="-a"/>', '<node pkg="rosbag" type="play" args="data.bag"/>'],
        verifyCommand: 'rosnode list | grep record'
      }
    },
    pauseAndThink: [
      {
        question: '回放时原来的时间戳有什么作用？',
        answer: 'rosbag 记录每条消息的时间戳。回放时可以按原始时间间隔发布消息（--clock），或者尽可能快地发布（默认）。--clock 使用模拟时钟，适合需要时间同步的场景。'
      },
      {
        question: '为什么回放时有些节点收不到数据？',
        answer: '可能原因：1) 节点在 bag 开始后才启动，错过了初始消息；2) 话题名称被重映射；3) 消息类型不匹配。使用 --topics 确认话题，检查 rosnode info。'
      }
    ],
    quiz: [
      {
        id: 'bag-quiz-1',
        question: '记录所有话题的 rosbag 命令选项是？',
        options: ['-A', '-a', '--all', '-all'],
        correctAnswer: 1,
        explanation: '-a 记录所有话题（小写）。-A 不是 rosbag 选项。'
      },
      {
        id: 'bag-quiz-2',
        question: '查看 bag 文件信息的命令是？',
        options: ['rosbag show', 'rosbag info', 'rosbag list', 'rosbag view'],
        correctAnswer: 1,
        explanation: 'rosbag info <file.bag> 显示 bag 文件的话题、消息数量、时长等信息。'
      },
      {
        id: 'bag-quiz-3',
        question: '回放时使用模拟时钟的选项是？',
        options: ['--time', '--clock', '--simulate', '--fake-time'],
        correctAnswer: 1,
        explanation: '--clock 使用模拟时钟回放，配合 /use_sim_time 参数使用。'
      },
      {
        id: 'bag-quiz-4',
        question: 'rosbag 不记录什么？',
        options: ['话题消息', '服务调用', '消息时间戳', '消息类型'],
        correctAnswer: 1,
        explanation: 'rosbag 只记录话题消息，不记录服务调用、参数服务器内容或节点内部状态。'
      }
    ],
    reviewSummary: 'rosbag 记录和回放话题数据。record -a 记录所有，play 回放，info 查看。常用选项：--lz4 压缩、--clock 模拟时钟、-O 指定输出文件。调试利器。',
    nextLesson: '掌握了 rosbag，你已经完成了 ROS 核心知识学习。',
    nextLessonLink: '',
    sources: [
      { title: 'ROS Wiki - Rosbag 命令行工具', url: 'http://wiki.ros.org/rosbag/Commandline', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - Rosbag Cookbook', url: 'http://wiki.ros.org/rosbag/Cookbook', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `Rosbag 是 ROS 的数据记录和回放工具，用于记录话题消息到文件。

主要功能：
- **record**：记录话题数据到 .bag 文件
- **play**：回放 .bag 文件中的数据
- **info**：查看 .bag 文件信息
- **filter**：筛选 bag 文件内容

使用场景：
- 调试：记录问题发生时的数据
- 测试：用真实数据测试算法
- 分析：离线分析机器人行为`,
      whyImportant: 'Rosbag 是调试和分析机器人行为的关键工具，可以记录和重现问题。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 记录特定话题
rosbag record /camera/image_raw /scan /odom -O my_data.bag

# 记录所有话题
rosbag record -a -O all_data.bag

# 查看信息
rosbag info my_data.bag

# 回放
rosbag play my_data.bag

# 循环回放
rosbag play -l my_data.bag

# 从指定时间开始
rosbag play -s 10 my_data.bag

# 使用模拟时钟
rosbag play --clock my_data.bag`,
          description: 'Rosbag 常用命令',
          expectedOutput: '记录、查看、回放 bag 文件'
        }
      ],
      commonErrors: [
        {
          error: 'bag file is empty',
          cause: '没有记录到任何数据',
          solution: '确保 roscore 运行，话题有数据发布'
        },
        {
          error: 'Cannot open bag file',
          cause: '文件路径错误或权限问题',
          solution: '检查文件路径和读取权限'
        },
        {
          error: 'Playback failed',
          cause: '消息类型不匹配或时间戳问题',
          solution: '用 rosbag info 检查内容，确保订阅者使用正确的消息类型'
        }
      ],
      tips: [
        '使用 --lz4 压缩减少文件大小',
        '大文件用 -b 限制单个文件大小',
        '回放前用 rosbag info 查看内容'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki Rosbag', url: 'http://wiki.ros.org/rosbag' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-topic', 'ros-debugging'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== ROS Debugging ====================
  {
    id: 'ros-debugging',
    slug: 'ros-debugging',
    title: 'ROS 调试与问题排查',
    category: 'tools',
    tags: ['调试', 'roswtf', '诊断', '错误排查'],
    summary: '学习 ROS 的调试工具和方法，掌握常见问题的诊断流程。',
    difficulty: 'intermediate',
    readingTime: 20,
    prerequisites: ['ros-architecture', 'ros-topic', 'rosbag'],
    introHook: {
      problem: '你的 ROS 程序出了问题，但不知道从哪里开始排查',
      scenario: '调试 ROS 就像医生诊断病人：先问症状（错误信息），再检查（工具诊断），最后开方（修复方案）。'
    },
    learningObjectives: [
      '能使用 roswtf 检查系统问题',
      '能使用 rqt_graph 分析节点关系',
      '能诊断话题和服务通信问题',
      '能分析日志定位错误',
      '掌握常见问题的排查流程'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解 ROS 的通信架构？', hint: '节点、话题、服务的关系' },
        { question: '你是否遇到过 ROS 报错但不知道原因？', hint: '调试是解决问题的关键' },
        { question: '你是否了解 Linux 的日志查看？', hint: 'ROS 日志在 ~/.ros/log' }
      ]
    },
    intuition: {
      analogy: '调试 ROS 就像"排查电路故障"：用万用表（roswtf）检测哪里断了，用电路图（rqt_graph）看连接关系，用示波器（rostopic echo）看信号是否正常。',
      boundaries: '类比局限：ROS 问题不只有"断路"，还有"短路"（冲突）、"干扰"（延迟）、"接错"（类型不匹配）。需要系统化的排查流程。'
    },
    timeline: [
      { time: '00:00', title: '调试思路', description: '问题定位方法论' },
      { time: '03:00', title: 'roswtf', description: '系统诊断工具' },
      { time: '07:00', title: 'rqt 工具', description: 'rqt_graph, rqt_console' },
      { time: '11:00', title: '日志分析', description: 'rosout 和日志文件' },
      { time: '15:00', title: '常见问题', description: '连接、环境、依赖' },
      { time: '18:00', title: '实践验收', description: '模拟故障排查' }
    ],
    minimalPractice: {
      terminal: '终端',
      currentDirectory: '~',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'roswtf', explanation: '运行系统诊断' },
        { command: 'rqt_graph', explanation: '打开节点图可视化' },
        { command: 'rqt_console', explanation: '打开日志控制台' }
      ],
      expectedOutput: 'roswtf 报告潜在问题；rqt_graph 显示节点关系'
    },
    misconceptions: [
      {
        misconception: 'roswtf 能发现所有问题',
        rootCause: '高估了工具的能力',
        fix: 'roswtf 只检查常见配置问题，不能检测逻辑错误、性能问题。需要结合其他工具（日志、调试器）和自己的分析。'
      },
      {
        misconception: '报错信息太复杂看不懂',
        rootCause: '没有分析错误信息的经验',
        fix: '错误信息通常包含：错误类型、位置（文件、行号）、原因。从上往下看，找到第一个 ERROR。复制关键信息搜索。'
      },
      {
        misconception: '调试就是改代码直到能跑',
        rootCause: '没有系统的调试方法',
        fix: '调试步骤：1) 复现问题；2) 定位问题（最小化）；3) 分析原因；4) 修复；5) 验证。盲目修改只会引入新问题。'
      }
    ],
    practice: {
      basic: {
        task: '运行 roswtf 检查当前系统',
        hints: ['确保 roscore 运行', '运行 roswtf', '分析报告的问题'],
        verifyCommand: 'roswtf'
      },
      intermediate: {
        task: '使用 rqt_graph 分析节点关系，找出断开的连接',
        hints: ['rqt_graph', '检查节点是否有话题连接', '未连接的节点可能是问题'],
        verifyCommand: 'rqt_graph'
      },
      advanced: {
        task: '分析一个实际的报错，定位并修复',
        hints: ['查看 rosout 日志', '用 rqt_console 过滤', '找到第一个错误'],
        verifyCommand: 'cat ~/.ros/log/latest/rosout.log | grep ERROR'
      }
    },
    pauseAndThink: [
      {
        question: '为什么节点发布话题但另一个节点收不到？',
        answer: '可能原因：1) 话题名称不匹配（重映射问题）；2) 消息类型不匹配；3) QoS 不兼容；4) 发布者在订阅者启动前已经发布完。用 rostopic info 和 rosnode info 诊断。'
      },
      {
        question: '如何让日志更有用？',
        answer: '使用不同级别：DEBUG（开发调试）、INFO（关键流程）、WARN（潜在问题）、ERROR（错误）、FATAL（致命错误）。避免过多日志，关键点用 INFO，异常分支用 WARN/ERROR。'
      }
    ],
    quiz: [
      {
        id: 'debug-quiz-1',
        question: '检查 ROS 系统问题的命令是？',
        options: ['roscheck', 'roswtf', 'rosdiagnose', 'rosdebug'],
        correctAnswer: 1,
        explanation: 'roswtf（ROS What The Fail）检查系统配置和潜在问题。'
      },
      {
        id: 'debug-quiz-2',
        question: '可视化节点和话题关系的工具是？',
        options: ['rqt_view', 'rqt_graph', 'rqt_node', 'rosgraph'],
        correctAnswer: 1,
        explanation: 'rqt_graph 显示节点和话题的连接关系图。'
      },
      {
        id: 'debug-quiz-3',
        question: 'ROS 日志文件存储在哪里？',
        options: ['/var/log/ros', '~/.ros/log', '/tmp/ros', '~/.roslog'],
        correctAnswer: 1,
        explanation: '~/.ros/log/<timestamp>/ 存储 ROS 日志文件，latest 指向最新日志。'
      },
      {
        id: 'debug-quiz-4',
        question: '节点启动后立即退出，可能的原因是？',
        options: ['网络问题', '缺少依赖或初始化失败', '话题不匹配', '参数错误'],
        correctAnswer: 1,
        explanation: '节点立即退出通常是初始化失败，如缺少依赖、配置错误。检查日志找具体原因。'
      }
    ],
    reviewSummary: '调试工具：roswtf（系统检查）、rqt_graph（节点关系）、rqt_console（日志）。排查流程：复现 -> 定位 -> 分析 -> 修复 -> 验证。日志在 ~/.ros/log，关注 ERROR 和 WARN。',
    nextLesson: '恭喜你完成了 ROS 核心知识学习！',
    nextLessonLink: '',
    sources: [
      { title: 'ROS Wiki - roswtf', url: 'http://wiki.ros.org/roswtf', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki - 调试指南', url: 'http://wiki.ros.org/ROS/Debugging', sourceType: 'official', version: 'ROS Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `ROS 调试需要系统性方法。

调试工具：
- **roswtf**：检查系统配置问题
- **rqt_graph**：可视化节点和话题
- **rqt_console**：查看日志消息
- **rostopic**：检查话题数据
- **rosnode**：检查节点状态

常见问题类型：
- 连接问题：节点无法通信
- 环境问题：source、路径错误
- 依赖问题：缺少包或库
- 资源问题：内存、CPU`,
      whyImportant: '调试能力决定了解决问题的效率。系统性的调试方法可以快速定位问题。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 检查系统问题
roswtf

# 查看节点图
rqt_graph

# 查看日志控制台
rqt_console

# 检查话题
rostopic list
rostopic echo /topic_name

# 检查节点
rosnode list
rosnode info /node_name

# 查看日志文件
cat ~/.ros/log/latest/rosout.log | grep ERROR`,
          description: '调试命令集合',
          expectedOutput: '根据命令显示系统状态'
        }
      ],
      commonErrors: [
        {
          error: 'Unable to contact master',
          cause: 'roscore 未运行或网络问题',
          solution: '启动 roscore，检查 ROS_MASTER_URI 设置'
        },
        {
          error: 'Node not found',
          cause: '节点未启动或名称错误',
          solution: '用 rosnode list 检查节点名'
        },
        {
          error: 'Topic type mismatch',
          cause: '发布者和订阅者消息类型不同',
          solution: '用 rostopic info 检查消息类型，确保一致'
        }
      ],
      tips: [
        '从 roswtf 开始检查',
        '用 rqt_graph 可视化系统结构',
        '检查日志中的第一个错误'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki 调试', url: 'http://wiki.ros.org/ROS/Debugging' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-architecture', 'ros-topic', 'rosbag'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== Publisher 与 Subscriber 编程 ====================
  {
    id: 'ros-publisher-subscriber',
    slug: 'ros-publisher-subscriber',
    title: 'Publisher 与 Subscriber 编程',
    category: 'ros-comm',
    tags: ['Publisher', 'Subscriber', 'rospy', '话题通信', 'Python'],
    summary: '学习如何编写 ROS Publisher 和 Subscriber 节点，掌握话题通信的核心编程技能。',
    difficulty: 'intermediate',
    readingTime: 25,
    prerequisites: ['ros-topic', 'ros-message'],
    introHook: {
      problem: '你已经理解了话题和消息的概念，但不知道如何编写代码让节点真正发布和接收数据',
      scenario: '你的机器人需要读取传感器数据并发布到话题，同时订阅其他节点的控制命令——这需要你亲手写 Publisher 和 Subscriber'
    },
    learningObjectives: [
      '能创建包含 Publisher 的 ROS Python 节点',
      '能创建包含 Subscriber 的 ROS Python 节点',
      '能正确定义和自定义 ROS 消息类型',
      '能配置 package.xml 和 CMakeLists.txt',
      '能使用 catkin_make 构建并运行自定义节点'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解话题是节点间通信的"命名通道"？', hint: '话题名如 /chatter，节点通过它找到彼此' },
        { question: '你是否知道消息类型定义了数据的结构？', hint: '如 std_msgs/String 包含一个 string data 字段' },
        { question: '你是否熟悉 Python 的基本语法？', hint: 'import、class、def、while 循环' }
      ]
    },
    intuition: {
      analogy: 'Publisher 就像一个电台主播，不停向空中发送广播信号（消息）。Subscriber 就像收音机，调到正确的频率（话题名）就能收到信号。你可以有多个收音机同时收一个频道（多订阅者），也可以有多个主播在同一个频道广播（多发布者）。',
      boundaries: '类比局限：电台广播是单向的，ROS 话题也是单向的。如果需要双向请求-响应，要用 Service；如果需要可中断的长任务，要用 Action。'
    },
    timeline: [
      { time: '00:00', title: '场景导入', description: '为什么需要手写 Publisher/Subscriber' },
      { time: '02:00', title: '创建包', description: 'catkin_create_pkg 创建包含依赖的包' },
      { time: '05:00', title: '消息定义', description: '自定义 .msg 文件和编译' },
      { time: '08:00', title: 'Publisher', description: '编写发布者节点代码' },
      { time: '14:00', title: 'Subscriber', description: '编写订阅者节点代码' },
      { time: '20:00', title: '构建运行', description: 'catkin_make、source、rosrun' },
      { time: '23:00', title: '实践验收', description: '完成练习并检查结果' }
    ],
    minimalPractice: {
      terminal: '终端1: roscore\n终端2: 运行talker\n终端3: 运行listener',
      currentDirectory: '~/catkin_ws/src/beginner_tutorials',
      source: 'source /opt/ros/noetic/setup.bash && source ~/catkin_ws/devel/setup.bash',
      commands: [
        { step: '创建工作空间和包', command: 'mkdir -p ~/catkin_ws/src && cd ~/catkin_ws/src && catkin_create_pkg beginner_tutorials std_msgs rospy roscpp', explanation: '创建包含 rospy 依赖的新包' },
        { step: '创建 scripts 目录', command: 'cd beginner_tutorials && mkdir scripts && cd scripts', explanation: 'Python 脚本放在 scripts 目录' },
        { step: '编写 Publisher', command: '创建 talker.py（见下方代码）', explanation: '发布者节点发布 String 消息到 chatter 话题' },
        { step: '编写 Subscriber', command: '创建 listener.py（见下方代码）', explanation: '订阅者节点接收 chatter 话题消息' },
        { step: '添加执行权限', command: 'chmod +x talker.py listener.py', explanation: 'Python 脚本需要可执行权限' },
        { step: '构建工作空间', command: 'cd ~/catkin_ws && catkin_make', explanation: '编译工作空间' },
        { step: '运行节点', command: 'rosrun beginner_tutorials talker.py\nrosrun beginner_tutorials listener.py', explanation: '分别在两个终端运行' }
      ],
      expectedOutput: 'talker 输出: "hello world x.xxxxxx"\nlistener 输出: "I heard hello world x.xxxxxx"'
    },
    diagram: {
      type: 'flow',
      data: {
        nodes: [
          { id: 'talker', label: 'Talker Node\n(Publisher)', type: 'node' },
          { id: 'chatter', label: '/chatter\n(std_msgs/String)', type: 'topic' },
          { id: 'listener', label: 'Listener Node\n(Subscriber)', type: 'node' }
        ],
        edges: [
          { from: 'talker', to: 'chatter', label: 'publish' },
          { from: 'chatter', to: 'listener', label: 'subscribe' }
        ]
      }
    },
    misconceptions: [
      {
        misconception: '忘记 spin() 或 spinOnce()',
        rootCause: '不理解 ROS 需要一个主循环来处理回调',
        fix: '在 Subscriber 程序中必须调用 rospy.spin() 或 rospy.spinOnce()'
      },
      {
        misconception: '消息类型不匹配',
        rootCause: '发布和订阅使用了不同的消息类型',
        fix: '确保 Publisher 和 Subscriber 使用相同的消息类型，如 String'
      },
      {
        misconception: '忘记给 Python 脚本添加执行权限',
        rootCause: 'Linux 下文件默认没有执行权限',
        fix: '运行 chmod +x script.py'
      },
      {
        misconception: '构建后忘记 source',
        rootCause: '不理解 catkin_make 后需要 source devel/setup.bash',
        fix: '每次构建后都要 source ~/catkin_ws/devel/setup.bash'
      }
    ],
    practice: {
      basic: [
        { task: '修改发布频率', hint: '修改 rospy.Rate(10) 的参数', verifyCommand: 'rostopic hz /chatter' },
        { task: '修改消息内容', hint: '修改 talker.py 中的消息字符串', verifyCommand: 'rostopic echo /chatter' }
      ],
      intermediate: [
        { task: '创建自定义消息类型', hint: '创建 msg/Num.msg 文件，修改 CMakeLists.txt', verifyCommand: 'rosmsg show beginner_tutorials/Num' },
        { task: '发布自定义消息', hint: '修改 Publisher 使用自定义消息', verifyCommand: 'rostopic echo /chatter' }
      ],
      advanced: [
        { task: '多话题发布订阅', hint: '一个节点同时发布和订阅不同话题', verifyCommand: 'rqt_graph' },
        { task: '回调队列优化', hint: '使用 rospy.Timer 或多线程处理高频消息', verifyCommand: '检查 CPU 占用' }
      ]
    },
    pauseAndThink: [
      {
        question: '为什么 Publisher 不需要 spin() 而 Subscriber 需要？',
        answer: 'Publisher 只是发送数据，不等待响应。Subscriber 需要持续监听话题，spin() 让 ROS 进入循环等待回调。'
      },
      {
        question: '如果两个 Publisher 发布到同一话题，Subscriber 会收到什么？',
        answer: 'Subscriber 会收到两个 Publisher 的消息，按时间顺序交替。这就是 ROS 的多对多通信模型。'
      }
    ],
    quiz: [
      {
        id: 'pubsub-q1',
        type: 'concept',
        question: 'rospy.Publisher 的 queue_size 参数是什么作用？',
        options: ['控制消息最大长度', '控制发布频率', '控制订阅者数量', '控制消息优先级'],
        correctAnswer: 0,
        explanation: 'queue_size 决定了当订阅者处理慢时，队列中最多保留多少条消息。'
      },
      {
        id: 'pubsub-q2',
        type: 'output',
        question: '运行 talker.py 后，rostopic echo /chatter 显示什么？',
        options: ['无输出', 'data: "hello world"', 'hello world', 'ERROR'],
        correctAnswer: 1,
        explanation: 'rostopic echo 显示完整的消息结构，包括字段名 data。'
      },
      {
        id: 'pubsub-q3',
        type: 'debug',
        question: '节点运行但 rostopic list 不显示话题，可能原因？',
        options: ['忘记 source', 'queue_size 太小', 'roscore 未启动', '节点名错误'],
        correctAnswer: 2,
        explanation: '没有 roscore，节点无法注册话题到 Master，因此话题列表为空。'
      },
      {
        id: 'pubsub-q4',
        type: 'sequence',
        question: '正确构建并运行节点的顺序？',
        options: ['catkin_make -> source -> rosrun', 'rosrun -> catkin_make -> source', 'source -> catkin_make -> rosrun', 'catkin_make -> rosrun -> source'],
        correctAnswer: 0,
        explanation: '先构建工作空间，然后 source 环境，最后运行节点。'
      }
    ],
    reviewSummary: {
      keyPoints: ['Publisher 发布消息到话题', 'Subscriber 订阅话题接收消息', '必须 spin() 处理回调', '构建后 source'],
      mustKnowCommands: ['catkin_create_pkg', 'catkin_make', 'rosrun', 'rostopic echo'],
      reviewQuestions: ['如何创建一个发布速度命令的 Publisher？', 'Subscriber 的回调函数参数是什么？']
    },
    nextLesson: {
      title: 'Service 请求-响应通信',
      link: 'ros-service',
      reason: '当你需要同步的请求-响应通信时，使用 Service 而不是 Topic。'
    },
    sources: [
      { title: 'ROS Wiki: Writing Publisher/Subscriber (Python)', url: 'http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28python%29', sourceType: 'official', version: 'ROS1 Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki: rospy Overview', url: 'http://wiki.ros.org/rospy', sourceType: 'official', version: 'ROS1 Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `Publisher 和 Subscriber 是 ROS 话题通信的核心编程接口。

**Publisher（发布者）**
- 在节点中创建 Publisher 对象
- 指定话题名和消息类型
- 定期调用 publish() 发送消息

**Subscriber（订阅者）**
- 在节点中创建 Subscriber 对象
- 指定话题名、消息类型和回调函数
- 调用 spin() 进入循环等待消息

**代码示例 (rospy)**

\`\`\`python
# talker.py - Publisher
#!/usr/bin/env python
import rospy
from std_msgs.msg import String

def publisher():
    rospy.init_node('talker')
    pub = rospy.Publisher('chatter', String, queue_size=10)
    rate = rospy.Rate(10)  # 10hz
    
    while not rospy.is_shutdown():
        msg = String()
        msg.data = "hello world %s" % rospy.get_time()
        pub.publish(msg)
        rate.sleep()

if __name__ == '__main__':
    try:
        publisher()
    except rospy.ROSInterruptException:
        pass
\`\`\`

\`\`\`python
# listener.py - Subscriber
#!/usr/bin/env python
import rospy
from std_msgs.msg import String

def callback(data):
    rospy.loginfo("I heard %s", data.data)

def subscriber():
    rospy.init_node('listener')
    rospy.Subscriber('chatter', String, callback)
    rospy.spin()

if __name__ == '__main__':
    subscriber()
\`\`\`

**package.xml 关键配置**
\`\`\`xml
<build_depend>rospy</build_depend>
<build_depend>std_msgs</build_depend>
<exec_depend>rospy</exec_depend>
<exec_depend>std_msgs</exec_depend>
\`\`\``,
      whyImportant: 'Publisher/Subscriber 是 ROS 最基础的通信方式，几乎所有 ROS 节点都会用到。',
      codeExamples: [
        {
          language: 'python',
          code: `# 完整的 Publisher 示例
#!/usr/bin/env python
import rospy
from std_msgs.msg import String

def main():
    # 初始化节点
    rospy.init_node('my_publisher')
    
    # 创建 Publisher
    # 参数: 话题名, 消息类型, 队列大小
    pub = rospy.Publisher('chatter', String, queue_size=10)
    
    # 设置发布频率
    rate = rospy.Rate(10)  # 10 Hz
    
    while not rospy.is_shutdown():
        # 创建消息
        msg = String()
        msg.data = "Hello ROS!"
        
        # 发布消息
        pub.publish(msg)
        rospy.loginfo("Published: %s", msg.data)
        
        # 按频率休眠
        rate.sleep()

if __name__ == '__main__':
    try:
        main()
    except rospy.ROSInterruptException:
        pass`,
          description: '完整的 Publisher 节点',
          expectedOutput: '每秒发布10条消息'
        },
        {
          language: 'python',
          code: `# 完整的 Subscriber 示例
#!/usr/bin/env python
import rospy
from std_msgs.msg import String

# 回调函数 - 收到消息时自动调用
def callback(msg):
    rospy.loginfo("Received: %s", msg.data)

def main():
    # 初始化节点
    rospy.init_node('my_subscriber')
    
    # 创建 Subscriber
    # 参数: 话题名, 消息类型, 回调函数
    rospy.Subscriber('chatter', String, callback)
    
    # 进入循环等待消息
    rospy.spin()

if __name__ == '__main__':
    main()`,
          description: '完整的 Subscriber 节点',
          expectedOutput: '收到消息时打印内容'
        }
      ],
      commonErrors: [
        {
          error: 'ModuleNotFoundError: No module named rospy',
          cause: '忘记 source ROS 环境',
          solution: 'source /opt/ros/noetic/setup.bash'
        },
        {
          error: '话题无数据',
          cause: '忘记调用 spin() 或发布频率为 0',
          solution: '检查 rospy.spin() 和 Rate()'
        },
        {
          error: 'Permission denied',
          cause: 'Python 脚本没有执行权限',
          solution: 'chmod +x script.py'
        }
      ],
      tips: [
        '使用 rospy.loginfo() 而不是 print()',
        'queue_size 建议设为 10',
        '回调函数不要阻塞太久'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki: Writing Publisher/Subscriber', url: 'http://wiki.ros.org/ROS/Tutorials/WritingPublisherSubscriber%28python%29' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-topic', 'ros-message', 'ros-service'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== Action 长任务通信 ====================
  {
    id: 'ros-action',
    slug: 'ros-action',
    title: 'Action 长任务通信',
    category: 'ros-comm',
    tags: ['Action', 'actionlib', '长任务', '反馈', '目标'],
    summary: '学习 ROS Action 机制，处理需要长时间执行并可反馈进度的任务。',
    difficulty: 'intermediate',
    readingTime: 30,
    prerequisites: ['ros-topic', 'ros-service', 'ros-publisher-subscriber'],
    introHook: {
      problem: '你的机器人需要执行一个耗时任务（如导航到目标点），Service 会阻塞等待，Topic 无法知道任务进度',
      scenario: '导航节点发送"前往坐标(5,3)"的请求，需要在移动过程中显示进度，并能随时取消任务——这正是 Action 的应用场景'
    },
    learningObjectives: [
      '理解 Action 与 Topic、Service 的区别',
      '能定义 .action 文件包含 Goal/Result/Feedback',
      '能使用 SimpleActionServer 创建 Action 服务器',
      '能使用 SimpleActionClient 发送目标并接收反馈',
      '能正确配置 package.xml 和 CMakeLists.txt'
    ],
    prerequisite: {
      questions: [
        { question: '你是否理解 Service 是同步请求-响应模式？', hint: '客户端发送请求后阻塞等待响应' },
        { question: '你是否熟悉 Topic 的异步发布-订阅模式？', hint: '发布者不等待订阅者' },
        { question: '你是否知道什么是回调函数？', hint: '函数作为参数传入，在特定事件发生时调用' }
      ]
    },
    intuition: {
      analogy: 'Action 就像外卖配送：你下单（Goal）后，骑手开始送餐（执行），APP 实时显示进度（Feedback），送到后通知你（Result）。你可以随时取消订单。这比打电话问"送到了吗"（Service）高效，也比看群消息（Topic）精确。',
      boundaries: '类比局限：Action 只能用于有明确开始和结束的任务。对于持续不断的数据流（如摄像头图像），还是用 Topic。'
    },
    timeline: [
      { time: '00:00', title: '场景导入', description: '为什么需要 Action 机制' },
      { time: '03:00', title: '概念对比', description: 'Action vs Topic vs Service' },
      { time: '06:00', title: 'Action定义', description: '创建 .action 文件' },
      { time: '10:00', title: '服务器', description: '编写 Action Server' },
      { time: '17:00', title: '客户端', description: '编写 Action Client' },
      { time: '24:00', title: '构建运行', description: 'catkin_make, rosrun' },
      { time: '28:00', title: '实践验收', description: '完成练习并检查结果' }
    ],
    minimalPractice: {
      terminal: '终端1: roscore\n终端2: 运行action_server\n终端3: 运行action_client',
      currentDirectory: '~/catkin_ws/src/action_tutorials',
      source: 'source /opt/ros/noetic/setup.bash && source ~/catkin_ws/devel/setup.bash',
      commands: [
        { step: '创建包', command: 'cd ~/catkin_ws/src && catkin_create_pkg action_tutorials actionlib rospy', explanation: '添加 actionlib 依赖' },
        { step: '创建 action 目录', command: 'cd action_tutorials && mkdir -p action', explanation: 'Action 定义文件放在 action 目录' },
        { step: '创建 .action 文件', command: '创建 action/Count.action（见下方）', explanation: '定义 Goal/Result/Feedback' },
        { step: '配置 CMakeLists.txt', command: '添加 actionlib 依赖和 action 文件生成', explanation: '见下方配置' },
        { step: '构建', command: 'cd ~/catkin_ws && catkin_make', explanation: '生成 Action 消息类型' },
        { step: '运行服务器', command: 'rosrun action_tutorials count_server.py', explanation: '启动 Action 服务器' },
        { step: '运行客户端', command: 'rosrun action_tutorials count_client.py', explanation: '发送目标' }
      ],
      expectedOutput: '客户端: Goal sent\n服务器: Counting 1...10\n客户端: Feedback: 50%\n客户端: Result: 10'
    },
    diagram: {
      type: 'flow',
      data: {
        nodes: [
          { id: 'client', label: 'Action Client', type: 'node' },
          { id: 'goal', label: 'Goal Topic\n(count/goal)', type: 'topic' },
          { id: 'server', label: 'Action Server', type: 'node' },
          { id: 'feedback', label: 'Feedback Topic\n(count/feedback)', type: 'topic' },
          { id: 'result', label: 'Result Topic\n(count/result)', type: 'topic' }
        ],
        edges: [
          { from: 'client', to: 'goal', label: 'send goal' },
          { from: 'goal', to: 'server', label: 'receive' },
          { from: 'server', to: 'feedback', label: 'publish' },
          { from: 'feedback', to: 'client', label: 'receive' },
          { from: 'server', to: 'result', label: 'publish' },
          { from: 'result', to: 'client', label: 'receive' }
        ]
      }
    },
    misconceptions: [
      {
        misconception: 'Action 就是 Topic',
        rootCause: '不理解 Action 内部用多个 Topic 实现',
        fix: 'Action 是高级抽象，内部使用 5 个 Topic (goal, cancel, status, feedback, result)'
      },
      {
        misconception: '忘记 set_succeeded',
        rootCause: '不理解 Action 必须明确标记完成',
        fix: '在任务完成时调用 set_succeeded()，失败时调用 set_aborted()'
      },
      {
        misconception: '阻塞在 send_goal',
        rootCause: '不理解 send_goal 是异步的',
        fix: '使用 wait_for_result() 阻塞，或使用回调函数异步处理'
      },
      {
        misconception: '没有配置 action 文件生成',
        rootCause: '忘记在 CMakeLists.txt 添加 action 生成',
        fix: '添加 add_action_files() 和 generate_messages()'
      }
    ],
    practice: {
      basic: [
        { task: '修改计数上限', hint: '修改 Goal 中的 count 字段', verifyCommand: '观察输出计数范围' },
        { task: '修改反馈频率', hint: '修改 rate.sleep() 频率', verifyCommand: '观察反馈间隔' }
      ],
      intermediate: [
        { task: '添加取消功能', hint: '使用 client.cancel_goal()', verifyCommand: '发送目标后按 Ctrl+C' },
        { task: '添加抢占处理', hint: '检查 is_preempt_requested()', verifyCommand: '发送新目标观察旧目标状态' }
      ],
      advanced: [
        { task: '多目标管理', hint: '使用 SimpleActionClient 的多目标队列', verifyCommand: '同时发送多个目标' },
        { task: '动态重新规划', hint: '收到新目标时取消当前目标', verifyCommand: '连续发送不同目标' }
      ]
    },
    pauseAndThink: [
      {
        question: '为什么 Action 不像 Service 那样阻塞？',
        answer: 'Action 设计为异步执行。客户端发送目标后立即返回，通过 Feedback 话题接收进度，通过 Result 话题接收结果。'
      },
      {
        question: '一个 Action Server 能同时处理多个目标吗？',
        answer: 'SimpleActionServer 只能处理一个目标，新目标会抢占旧目标。如需多目标，使用 ActionServer 直接类。'
      }
    ],
    quiz: [
      {
        id: 'action-q1',
        type: 'concept',
        question: 'Action 与 Service 的主要区别？',
        options: ['Action 异步，Service 同步', 'Action 同步，Service 异步', '两者都是同步', '两者都是异步'],
        correctAnswer: 0,
        explanation: 'Service 客户端阻塞等待响应；Action 客户端发送目标后立即返回，异步接收反馈和结果。'
      },
      {
        id: 'action-q2',
        type: 'output',
        question: 'Action Server 调用 set_succeeded 后客户端收到什么？',
        options: ['Feedback', 'Result', 'Goal', 'Status'],
        correctAnswer: 1,
        explanation: 'set_succeeded 表示任务成功完成，客户端收到 Result。'
      },
      {
        id: 'action-q3',
        type: 'debug',
        question: '客户端卡在 wait_for_server，可能原因？',
        options: ['服务器未启动', 'Goal 格式错误', 'Feedback 未发布', 'Result 未收到'],
        correctAnswer: 0,
        explanation: 'wait_for_server 阻塞等待服务器就绪，如果服务器未启动会一直等待。'
      },
      {
        id: 'action-q4',
        type: 'sequence',
        question: 'Action 通信的正确顺序？',
        options: ['Goal→Feedback→Result', 'Result→Goal→Feedback', 'Feedback→Goal→Result', 'Goal→Result→Feedback'],
        correctAnswer: 0,
        explanation: '先发送目标，执行过程中持续反馈，最后返回结果。'
      }
    ],
    reviewSummary: {
      keyPoints: ['Action 用于长任务', 'Goal/Result/Feedback 三要素', '异步执行可取消', '使用 actionlib 库'],
      mustKnowCommands: ['catkin_create_pkg ... actionlib', 'add_action_files()', 'SimpleActionServer', 'SimpleActionClient'],
      reviewQuestions: ['如何定义一个带进度反馈的 Action？', '如何处理用户取消请求？']
    },
    nextLesson: {
      title: 'TF 坐标变换',
      link: 'tf-transform',
      reason: '机器人各部件坐标不同，Action 执行过程中需要了解坐标系变换。'
    },
    sources: [
      { title: 'ROS Wiki: actionlib', url: 'http://wiki.ros.org/actionlib', sourceType: 'official', version: 'ROS1 Noetic', verifiedAt: '2024-01-01' },
      { title: 'ROS Wiki: Action Description', url: 'http://wiki.ros.org/actionlib/DetailedDescription', sourceType: 'official', version: 'ROS1 Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: `Action 是 ROS 提供的长任务通信机制，结合了 Topic 的异步特性和 Service 的请求-响应模式。

**核心概念**
- **Goal（目标）**：客户端发送的任务请求
- **Feedback（反馈）**：执行过程中持续发送的进度信息
- **Result（结果）**：任务完成后的最终结果

**Action vs Topic vs Service**

| 特性 | Topic | Service | Action |
|------|-------|---------|--------|
| 通信模式 | 发布-订阅 | 请求-响应 | 目标-反馈-结果 |
| 同步性 | 异步 | 同步阻塞 | 异步非阻塞 |
| 适用场景 | 持续数据流 | 快速查询 | 长任务 |
| 取消能力 | 无 | 无 | 有 |
| 进度反馈 | 无 | 无 | 有 |

**定义 Action 文件**
\`\`\`
# Count.action
# Goal - 发送的目标
uint32 count_to
---
# Result - 最终结果
uint32 final_count
---
# Feedback - 执行过程中的反馈
float32 percentage
\`\`\`

**Action Server (Python)**
\`\`\`python
#!/usr/bin/env python
import rospy
import actionlib
from actionlib_msgs.msg import GoalStatus
from action_tutorials.msg import CountAction, CountGoal, CountResult, CountFeedback

class CountServer:
    def __init__(self):
        self.server = actionlib.SimpleActionServer('count', CountAction, self.execute, False)
        self.server.start()
    
    def execute(self, goal):
        rate = rospy.Rate(1)
        count = 0
        
        while count < goal.count_to:
            if self.server.is_preempt_requested():
                self.server.set_preempted()
                return
            
            count += 1
            feedback = CountFeedback()
            feedback.percentage = count / float(goal.count_to) * 100
            self.server.publish_feedback(feedback)
            rate.sleep()
        
        result = CountResult()
        result.final_count = count
        self.server.set_succeeded(result)

if __name__ == '__main__':
    rospy.init_node('count_server')
    server = CountServer()
    rospy.spin()
\`\`\`

**CMakeLists.txt 配置**
\`\`\`cmake
find_package(catkin REQUIRED COMPONENTS actionlib roscpp rospy std_msgs actionlib_msgs)

add_action_files(
  DIRECTORY action
  FILES Count.action
)

generate_messages(
  DEPENDENCIES actionlib_msgs std_msgs
)

catkin_package()
\`\`\``,
      whyImportant: 'Action 是处理长任务的标准方式，导航、机械臂规划等都使用 Action。',
      codeExamples: [
        {
          language: 'python',
          code: `# Action Client 示例
#!/usr/bin/env python
import rospy
import actionlib
from action_tutorials.msg import CountAction, CountGoal

def feedback_cb(feedback):
    rospy.loginfo("Progress: %.1f%%", feedback.percentage)

def main():
    rospy.init_node('count_client')
    client = actionlib.SimpleActionClient('count', CountAction)
    client.wait_for_server()
    
    goal = CountGoal()
    goal.count_to = 10
    
    client.send_goal(goal, feedback_cb=feedback_cb)
    client.wait_for_result()
    
    result = client.get_result()
    rospy.loginfo("Result: %d", result.final_count)

if __name__ == '__main__':
    main()`,
          description: 'Action Client 发送目标并接收反馈',
          expectedOutput: '显示进度和最终结果'
        }
      ],
      commonErrors: [
        {
          error: 'ModuleNotFoundError: actionlib',
          cause: '忘记添加 actionlib 依赖',
          solution: '在 package.xml 添加 <depend>actionlib</depend>'
        },
        {
          error: 'Action file not found',
          cause: '.action 文件位置错误',
          solution: '确保放在 package/action/ 目录'
        },
        {
          error: 'Client hangs on wait_for_server',
          cause: '服务器未启动或名称不匹配',
          solution: '检查服务器是否运行，话题名是否一致'
        }
      ],
      tips: [
        '使用 SimpleActionServer 简化开发',
        'Feedback 不要发布太频繁',
        '处理 preempt_requested 支持取消'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki: actionlib', url: 'http://wiki.ros.org/actionlib' }
    ],
    applicableVersions: ['ROS Noetic'],
    relatedArticles: ['ros-service', 'ros-topic', 'ros-publisher-subscriber'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== 编程基础 - C语言 ====================
  {
    id: 'c-basics-intro',
    slug: 'c-basics-intro',
    title: 'C语言入门：从编译到运行',
    category: 'programming-basics',
    tags: ['C语言', '编译', 'gcc', '基础'],
    summary: '理解C语言的编译过程，掌握gcc基本用法，为理解ROS底层和硬件接口打下基础。',
    difficulty: 'beginner',
    readingTime: 25,
    prerequisites: [],
    introHook: {
      problem: '你想理解ROS底层是如何工作的，但看到C代码就头疼，不理解编译过程',
      scenario: '就像做菜需要了解食材特性，理解ROS底层需要C语言基础，尤其是编译、内存和指针'
    },
    learningObjectives: [
      '理解C语言的编译过程：预处理、编译、汇编、链接',
      '能使用gcc编译简单的C程序',
      '理解源文件、目标文件、可执行文件的区别',
      '能排查简单的编译错误和链接错误'
    ],
    prerequisite: {
      questions: [
        { question: '你是否知道什么是源代码和可执行文件？', hint: '源代码是人类可读的文本，可执行文件是机器可运行的程序' },
        { question: '你是否使用过终端命令？', hint: 'gcc编译需要在终端中执行命令' }
      ]
    },
    intuition: {
      analogy: '编译就像翻译：C代码是中文，机器码是机器语言。gcc是翻译官，把你的代码翻译成机器能理解的指令。',
      boundaries: '类比局限：编译不仅是翻译，还会检查语法错误、优化代码、链接库函数。不同编译器可能有不同行为。'
    },
    timeline: [
      { time: '00:00', title: '场景导入', description: '为什么ROS开发者需要了解C语言' },
      { time: '03:00', title: '编译过程', description: '预处理、编译、汇编、链接四步骤' },
      { time: '08:00', title: 'gcc使用', description: 'gcc基本命令和常用选项' },
      { time: '12:00', title: '实践编译', description: '编写并编译第一个C程序' },
      { time: '18:00', title: '错误排查', description: '常见编译错误和解决方法' },
      { time: '23:00', title: '总结', description: '回顾要点并布置练习' }
    ],
    minimalPractice: {
      terminal: '终端（Ubuntu 20.04）',
      currentDirectory: '~（用户主目录）',
      source: '无需 source',
      commands: [
        { command: 'mkdir -p ~/c_test && cd ~/c_test', explanation: '创建测试目录' },
        { command: 'cat > hello.c << "EOF"\n#include <stdio.h>\nint main() {\n    printf("Hello, ROS!\\n");\n    return 0;\n}\nEOF', explanation: '创建简单的C程序' },
        { command: 'gcc hello.c -o hello', explanation: '编译C程序为可执行文件' },
        { command: './hello', explanation: '运行编译后的程序' },
        { command: 'gcc -E hello.c -o hello.i', explanation: '只执行预处理步骤' }
      ],
      expectedOutput: 'Hello, ROS!'
    },
    misconceptions: [
      {
        misconception: '认为C语言过时了，不需要学',
        rootCause: '只看到上层应用开发，不理解底层系统',
        fix: 'ROS核心、驱动、嵌入式系统大量使用C。理解C有助于理解系统行为和排查底层问题。'
      },
      {
        misconception: '认为编译就是"运行代码"',
        rootCause: '混淆解释型语言和编译型语言的区别',
        fix: 'Python是解释执行，边翻译边运行。C需要先编译成机器码，然后才能运行。编译是单独的步骤。'
      }
    ],
    practice: {
      basic: {
        task: '编写一个计算两数之和的C程序并编译运行',
        hints: ['使用 printf 输出结果', 'gcc -o 指定输出文件名'],
        verifyCommand: 'ls -la ~/c_test/sum && ~/c_test/sum'
      },
      intermediate: {
        task: '使用gcc -Wall编译，解释所有警告信息',
        hints: ['-Wall 开启所有警告', '警告可能是未使用变量或类型问题'],
        verifyCommand: 'gcc -Wall ~/c_test/hello.c -o hello 2>&1 | head -5'
      },
      advanced: {
        task: '分步骤编译：预处理、编译、汇编、链接，观察每步产物',
        hints: ['gcc -E 预处理', 'gcc -S 编译为汇编', 'gcc -c 汇编为目标文件'],
        verifyCommand: 'ls ~/c_test/hello.* | wc -l'
      }
    },
    pauseAndThink: [
      {
        question: '为什么同一份C代码在不同系统上需要重新编译？',
        answer: '不同系统的机器码格式、系统调用、库函数可能不同。编译产物是特定于平台的，需要针对目标平台重新编译。'
      }
    ],
    quiz: [
      {
        id: 'c-quiz-1',
        question: 'gcc将C代码转换为可执行文件的正确顺序是？',
        options: ['链接->编译->汇编', '预处理->编译->汇编->链接', '编译->预处理->链接', '汇编->编译->链接'],
        correctAnswer: 1,
        explanation: '预处理处理#include和#define，编译转为汇编，汇编转为机器码，链接合并目标文件和库。'
      },
      {
        id: 'c-quiz-2',
        question: '编译时出现"undefined reference"错误，最可能的原因是？',
        options: ['语法错误', '缺少链接库', '缺少头文件', '内存不足'],
        correctAnswer: 1,
        explanation: 'undefined reference表示链接阶段找不到函数定义，通常是忘记链接库或函数未实现。'
      }
    ],
    reviewSummary: 'C语言编译四步骤：预处理(#include, #define展开)、编译(转为汇编)、汇编(转为机器码)、链接(合并目标文件)。常用gcc选项：-c只编译不链接，-Wall显示警告，-o指定输出文件。',
    nextLesson: '掌握C语言编译后，下一步学习变量类型和内存管理。',
    nextLessonLink: 'c-memory-basics',
    sources: [
      { title: 'GCC Manual', url: 'https://gcc.gnu.org/onlinedocs/', sourceType: 'official', version: 'GCC 9.4', verifiedAt: '2024-01-01' },
      { title: 'C语言编译过程详解', url: 'https://akaedu.github.io/book/ch02.html', sourceType: 'tutorial', version: 'C99', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: 'C语言是ROS底层的重要组成部分。虽然ROS主要使用C++和Python，但很多底层驱动、串口通信、传感器协议解析都使用C编写。理解C的编译过程有助于排查跨语言问题和理解系统行为。',
      whyImportant: '掌握编译过程可以理解链接错误、头文件缺失等问题；C是理解内存管理和指针的基础。',
      codeExamples: [
        {
          language: 'c',
          code: `#include <stdio.h>  // 标准输入输出头文件

int main() {
    printf("Hello, ROS World!\\n");
    return 0;  // 返回0表示程序正常结束
}`,
          description: '最简单的C程序',
          expectedOutput: 'Hello, ROS World!'
        },
        {
          language: 'bash',
          code: `# 编译C程序
gcc hello.c -o hello

# 分步骤编译
gcc -E hello.c -o hello.i    # 预处理
gcc -S hello.i -o hello.s    # 编译为汇编
gcc -c hello.s -o hello.o    # 汇编为目标文件
gcc hello.o -o hello         # 链接

# 查看编译产物大小
ls -l hello*`,
          description: 'gcc编译命令'
        }
      ],
      commonErrors: [
        {
          error: 'undefined reference to `printf\'',
          cause: '链接阶段找不到函数定义',
          solution: '确保包含正确的头文件，对于标准库函数通常自动链接'
        },
        {
          error: 'fatal error: stdio.h: No such file',
          cause: '系统缺少C标准库头文件',
          solution: '安装开发工具包：sudo apt install build-essential'
        }
      ],
      tips: [
        '使用 -Wall 选项显示所有警告',
        '使用 -g 选项添加调试信息',
        '使用 -O2 选项进行优化'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'GCC Documentation', url: 'https://gcc.gnu.org/onlinedocs/' }
    ],
    applicableVersions: ['Ubuntu 20.04'],
    relatedArticles: ['c-memory-basics', 'cpp-for-ros-intro'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== 编程基础 - C++ for ROS ====================
  {
    id: 'cpp-for-ros-intro',
    slug: 'cpp-for-ros-intro',
    title: 'C++ for ROS：从编译到节点',
    category: 'programming-basics',
    tags: ['C++', 'roscpp', '编译', 'CMake'],
    summary: '掌握C++基础语法和roscpp开发，理解ROS C++节点的生命周期。',
    difficulty: 'intermediate',
    readingTime: 30,
    prerequisites: ['c-basics-intro'],
    introHook: {
      problem: '你想用C++写ROS节点，但看到CMakeLists.txt和package.xml就发愁',
      scenario: '就像组装家具需要读懂说明书，开发ROS C++节点需要理解CMake构建系统和catkin工作空间'
    },
    learningObjectives: [
      '理解C++与C的主要区别：类、引用、STL',
      '能编写CMakeLists.txt编译ROS节点',
      '理解roscpp的NodeHandle、Publisher、Subscriber',
      '能实现一个完整的talker节点'
    ],
    prerequisite: {
      questions: [
        { question: '你是否了解C++的类和对象概念？', hint: '类是蓝图，对象是根据蓝图创建的实例' },
        { question: '你是否知道CMake是什么？', hint: 'CMake是跨平台的构建系统，ROS使用catkin_make' }
      ]
    },
    intuition: {
      analogy: 'CMake就像建筑图纸，告诉编译器如何把源代码建成可执行程序。CMakeLists.txt是图纸，catkin_make是施工队。',
      boundaries: '类比局限：CMake还能管理依赖、设置编译选项、生成安装脚本。它不仅是编译，还是整个构建流程的管理者。'
    },
    timeline: [
      { time: '00:00', title: '场景导入', description: '为什么ROS主要用C++' },
      { time: '03:00', title: 'C++基础', description: '类、引用、STL容器' },
      { time: '10:00', title: 'CMake入门', description: 'CMakeLists.txt基本结构' },
      { time: '15:00', title: 'roscpp节点', description: 'NodeHandle、init、spin' },
      { time: '22:00', title: '实践', description: '编写talker节点' },
      { time: '28:00', title: '总结', description: '回顾并布置练习' }
    ],
    minimalPractice: {
      terminal: '终端（Ubuntu 20.04）',
      currentDirectory: '~/catkin_ws/src',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'catkin_create_pkg cpp_tutorial roscpp rospy std_msgs', explanation: '创建ROS包' },
        { command: 'cd cpp_tutorial && cat > src/talker.cpp << "EOF"\n#include "ros/ros.h"\n#include "std_msgs/String.h"\n\nint main(int argc, char **argv) {\n  ros::init(argc, argv, "talker");\n  ros::NodeHandle nh;\n  ros::Publisher chatter_pub = nh.advertise<std_msgs::String>("chatter", 1000);\n  ros::Rate loop_rate(10);\n  int count = 0;\n  while (ros::ok()) {\n    std_msgs::String msg;\n    msg.data = "hello world " + std::to_string(count++);\n    ROS_INFO("%s", msg.data.c_str());\n    chatter_pub.publish(msg);\n    ros::spinOnce();\n    loop_rate.sleep();\n  }\n  return 0;\n}\nEOF', explanation: '创建talker节点' },
        { command: 'catkin_make', explanation: '编译工作空间' },
        { command: 'source ~/catkin_ws/devel/setup.bash && rosrun cpp_tutorial talker', explanation: '运行节点' }
      ],
      expectedOutput: 'hello world 0, hello world 1, ...'
    },
    misconceptions: [
      {
        misconception: '认为C++就是C加了一些东西',
        rootCause: '不理解面向对象编程的本质',
        fix: 'C++引入了类、继承、多态、模板等。它不只是语法扩展，而是一种新的编程范式。'
      },
      {
        misconception: '把所有代码都写在头文件里',
        rootCause: '不理解C++编译模型和分离编译',
        fix: '头文件(.h)声明接口，源文件(.cpp)实现。分离编译可以减少编译时间，避免循环依赖。'
      }
    ],
    practice: {
      basic: {
        task: '创建一个发布 Int 消息的节点',
        hints: ['使用 std_msgs/Int', '修改 advertise 模板参数'],
        verifyCommand: 'rostopic echo /int_topic'
      },
      intermediate: {
        task: '修改CMakeLists.txt添加可执行目标',
        hints: ['add_executable', 'target_link_libraries'],
        verifyCommand: 'catkin_make && rosrun cpp_tutorial talker'
      },
      advanced: {
        task: '实现一个Subscriber接收chatter话题',
        hints: ['subscribe()方法', '回调函数签名'],
        verifyCommand: 'rostopic pub /chatter std_msgs/String "test"'
      }
    },
    pauseAndThink: [
      {
        question: '为什么ROS用CMake而不是直接用gcc？',
        answer: 'CMake管理复杂的依赖关系、自动找到ROS包、生成Makefile。ROS项目有大量包和依赖，手动用gcc几乎不可能。'
      }
    ],
    quiz: [
      {
        id: 'cpp-quiz-1',
        question: 'ros::spin()和ros::spinOnce()的区别是？',
        options: ['spinOnce处理所有回调后返回', 'spin一直阻塞，spinOnce处理一次', '没有区别', 'spin更快'],
        correctAnswer: 1,
        explanation: 'spin()进入无限循环处理回调，spinOnce()处理一批回调后返回，适合需要在循环中做其他操作的情况。'
      }
    ],
    reviewSummary: 'C++核心：类、引用、STL。CMakeLists核心：find_package、add_executable、target_link_libraries。roscpp核心：ros::init、NodeHandle、advertise/subscribe、spin。',
    nextLesson: '继续学习Python for ROS，对比两种语言差异。',
    nextLessonLink: 'python-for-ros-intro',
    sources: [
      { title: 'ROS C++ Wiki', url: 'http://wiki.ros.org/roscpp', sourceType: 'official', version: 'Noetic', verifiedAt: '2024-01-01' },
      { title: 'CMake Tutorial', url: 'https://cmake.org/cmake/help/latest/guide/tutorial/', sourceType: 'official', version: 'CMake 3.16', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: 'C++是ROS的主要开发语言之一。相比Python，C++性能更好、类型更安全，适合实时控制、计算密集型任务。roscpp是ROS的C++客户端库，提供节点管理、消息通信等功能。',
      whyImportant: '大多数ROS核心功能和高性能节点使用C++开发。理解C++和CMake是ROS开发的基本功。',
      codeExamples: [
        {
          language: 'cpp',
          code: `// CMakeLists.txt 最小模板
cmake_minimum_required(VERSION 3.0.2)
project(my_package)

find_package(catkin REQUIRED COMPONENTS roscpp rospy std_msgs)

catkin_package()

include_directories(\${catkin_INCLUDE_DIRS})

add_executable(my_node src/my_node.cpp)
target_link_libraries(my_node \${catkin_LIBRARIES})`,
          description: 'ROS包的CMakeLists.txt'
        }
      ],
      commonErrors: [
        {
          error: 'undefined reference to `ros::init\'',
          cause: '忘记链接roscpp库',
          solution: '在target_link_libraries中添加${catkin_LIBRARIES}'
        },
        {
          error: 'catkin_package not found',
          cause: '没有source ROS环境',
          solution: 'source /opt/ros/noetic/setup.bash'
        }
      ],
      tips: [
        '使用 catkin_make -DCMAKE_BUILD_TYPE=Release 发布版本',
        '用 roslint 检查代码风格',
        '用 catkin config 管理编译选项'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki: roscpp', url: 'http://wiki.ros.org/roscpp' }
    ],
    applicableVersions: ['Ubuntu 20.04', 'ROS Noetic'],
    relatedArticles: ['c-basics-intro', 'python-for-ros-intro', 'ros-publisher-subscriber'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== 编程基础 - Python for ROS ====================
  {
    id: 'python-for-ros-intro',
    slug: 'python-for-ros-intro',
    title: 'Python for ROS：快速开发节点',
    category: 'programming-basics',
    tags: ['Python', 'rospy', '快速开发', '脚本'],
    summary: '掌握Python基础和rospy开发，快速实现ROS节点原型和工具。',
    difficulty: 'beginner',
    readingTime: 25,
    prerequisites: [],
    introHook: {
      problem: '你想快速验证一个ROS想法，但C++开发周期太长',
      scenario: '就像写便签用铅笔，快速原型用Python。几行代码就能发布话题，几分钟就能验证想法'
    },
    learningObjectives: [
      '掌握Python基础：变量、函数、类、模块',
      '能使用rospy创建Publisher和Subscriber',
      '理解Python节点与C++节点的开发效率差异',
      '能正确设置Python脚本的执行权限'
    ],
    prerequisite: {
      questions: [
        { question: '你是否写过Python程序？', hint: 'Python使用缩进表示代码块' },
        { question: '你是否知道Python脚本需要执行权限？', hint: 'chmod +x script.py' }
      ]
    },
    intuition: {
      analogy: 'Python就像口语，C++就像书面语。Python代码更接近自然语言，开发更快但执行效率较低。',
      boundaries: '类比局限：Python有完整的类型系统和面向对象特性。它不仅是脚本语言，还能开发大型项目。'
    },
    timeline: [
      { time: '00:00', title: '场景导入', description: 'Python在ROS中的角色' },
      { time: '03:00', title: 'Python基础', description: '变量、容器、函数' },
      { time: '08:00', title: 'rospy入门', description: 'init_node、Publisher、Subscriber' },
      { time: '14:00', title: '实践', description: '编写talker和listener' },
      { time: '20:00', title: '对比', description: 'Python vs C++' },
      { time: '23:00', title: '总结', description: '何时选择Python' }
    ],
    minimalPractice: {
      terminal: '终端（Ubuntu 20.04）',
      currentDirectory: '~/catkin_ws/src',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: 'catkin_create_pkg py_tutorial rospy std_msgs', explanation: '创建Python包' },
        { command: 'mkdir -p py_tutorial/scripts && cat > py_tutorial/scripts/talker.py << "EOF"\n#!/usr/bin/env python3\nimport rospy\nfrom std_msgs.msg import String\n\ndef talker():\n    pub = rospy.Publisher("chatter", String, queue_size=10)\n    rospy.init_node("talker", anonymous=True)\n    rate = rospy.Rate(10)\n    while not rospy.is_shutdown():\n        hello_str = "hello world %s" % rospy.get_time()\n        rospy.loginfo(hello_str)\n        pub.publish(hello_str)\n        rate.sleep()\n\nif __name__ == "__main__":\n    talker()\nEOF', explanation: '创建talker脚本' },
        { command: 'chmod +x py_tutorial/scripts/talker.py', explanation: '添加执行权限' },
        { command: 'catkin_make && source ~/catkin_ws/devel/setup.bash', explanation: '编译和source' },
        { command: 'rosrun py_tutorial talker.py', explanation: '运行节点' }
      ],
      expectedOutput: 'hello world 时间戳'
    },
    misconceptions: [
      {
        misconception: '认为Python性能太差不值得学',
        rootCause: '只看执行速度，忽略开发效率',
        fix: 'Python适合原型开发、工具脚本、高层逻辑。性能关键部分用C++，其他用Python，各取所长。'
      },
      {
        misconception: '忘记在Python脚本加shebang',
        rootCause: '不理解Linux如何识别脚本解释器',
        fix: '第一行必须是 #!/usr/bin/env python3，否则rosrun无法正确执行。'
      }
    ],
    practice: {
      basic: {
        task: '创建一个打印当前时间的节点',
        hints: ['rospy.get_time()获取时间', 'rospy.loginfo输出日志'],
        verifyCommand: 'rosrun py_tutorial timer.py'
      },
      intermediate: {
        task: '创建Subscriber订阅chatter并打印',
        hints: ['rospy.Subscriber', '回调函数'],
        verifyCommand: 'rostopic pub /chatter std_msgs/String "test"'
      },
      advanced: {
        task: '实现一个Service服务端',
        hints: ['rospy.Service', '定义srv文件'],
        verifyCommand: 'rosservice call /my_service'
      }
    },
    pauseAndThink: [
      {
        question: '为什么ROS Noetic默认用Python 3？',
        answer: 'Python 2已于2020年停止维护。Python 3有更好的Unicode支持、类型注解、异步编程等特性。'
      }
    ],
    quiz: [
      {
        id: 'py-quiz-1',
        question: 'rospy中的Rate(10)表示？',
        options: ['每秒10次循环', '等待10秒', '队列大小10', '优先级10'],
        correctAnswer: 0,
        explanation: 'Rate(10)创建一个每秒10次的循环控制对象，配合rate.sleep()使用。'
      },
      {
        id: 'py-quiz-2',
        question: 'Python脚本第一行应该是？',
        options: ['# coding: utf-8', '#!/usr/bin/env python3', 'import rospy', '# Python script'],
        correctAnswer: 1,
        explanation: 'shebang行告诉系统用哪个解释器运行脚本，必须放在文件开头。'
      }
    ],
    reviewSummary: 'Python核心：变量、函数、类。rospy核心：init_node、Publisher、Subscriber、Rate。注意事项：shebang、执行权限、Python 3。',
    nextLesson: '对比C++和Python实现同一功能，选择合适语言。',
    nextLessonLink: 'cpp-python-comparison',
    sources: [
      { title: 'ROS Python Wiki', url: 'http://wiki.ros.org/rospy', sourceType: 'official', version: 'Noetic', verifiedAt: '2024-01-01' },
      { title: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/', sourceType: 'official', version: 'Python 3.8', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: 'Python是ROS快速开发的首选语言。相比C++，Python代码更简洁，不需要编译，适合原型验证、工具开发、数据处理等场景。rospy是ROS的Python客户端库。',
      whyImportant: 'Python开发效率高，很多ROS工具和脚本使用Python。理解rospy是ROS开发的基本技能。',
      codeExamples: [
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
from std_msgs.msg import String

def callback(data):
    rospy.loginfo(rospy.get_caller_id() + " I heard %s", data.data)

def listener():
    rospy.init_node('listener', anonymous=True)
    rospy.Subscriber("chatter", String, callback)
    rospy.spin()

if __name__ == '__main__':
    listener()`,
          description: 'rospy Subscriber示例'
        }
      ],
      commonErrors: [
        {
          error: 'ModuleNotFoundError: No module named rospy',
          cause: '没有source ROS环境',
          solution: 'source /opt/ros/noetic/setup.bash'
        },
        {
          error: 'Permission denied',
          cause: '脚本没有执行权限',
          solution: 'chmod +x script.py'
        }
      ],
      tips: [
        '使用 #!/usr/bin/env python3 确保Python 3',
        '使用 rospy.logxxx 替代 print 以便调试',
        '避免在回调中做耗时操作'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki: rospy', url: 'http://wiki.ros.org/rospy' }
    ],
    applicableVersions: ['Ubuntu 20.04', 'ROS Noetic'],
    relatedArticles: ['cpp-for-ros-intro', 'ros-publisher-subscriber'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  // ==================== 编程基础 - 语言桥接 ====================
  {
    id: 'cpp-python-comparison',
    slug: 'cpp-python-comparison',
    title: 'C++ vs Python：同一个温度传感器节点',
    category: 'programming-basics',
    tags: ['C++', 'Python', '对比', 'roscpp', 'rospy'],
    summary: '对比实现同一个温度传感器节点，理解C++和Python在ROS开发中的差异与选择。',
    difficulty: 'intermediate',
    readingTime: 20,
    prerequisites: ['cpp-for-ros-intro', 'python-for-ros-intro'],
    introHook: {
      problem: '你知道C++和Python都能写ROS节点，但不清楚如何选择',
      scenario: '就像选择工具：螺丝刀还是电钻？各有适用场景，理解差异才能做出正确选择'
    },
    learningObjectives: [
      '能对比C++和Python的ROS节点实现差异',
      '理解性能、开发效率、类型安全的权衡',
      '能根据场景选择合适的开发语言',
      '理解回调、Rate、spin在两种语言中的实现'
    ],
    prerequisite: {
      questions: [
        { question: '你是否用两种语言写过ROS节点？', hint: '如果没有，先完成前置课程' },
        { question: '你是否理解编译型语言和解释型语言的差异？', hint: 'C++需要编译，Python解释执行' }
      ]
    },
    intuition: {
      analogy: 'C++像手工打造的机械表，精密度高性能好但制作慢；Python像智能手表，功能多开发快但续航一般。',
      boundaries: '类比局限：Python也能写高性能代码（配合numpy等），C++也能快速开发（配合现代特性）。关键是场景和团队。'
    },
    timeline: [
      { time: '00:00', title: '场景导入', description: '温度传感器节点需求' },
      { time: '02:00', title: 'C++实现', description: 'roscpp版本代码' },
      { time: '07:00', title: 'Python实现', description: 'rospy版本代码' },
      { time: '12:00', title: '对比分析', description: '代码量、性能、开发时间' },
      { time: '16:00', title: '选择指南', description: '何时用哪种语言' },
      { time: '19:00', title: '总结', description: '最佳实践' }
    ],
    minimalPractice: {
      terminal: '终端（Ubuntu 20.04）',
      currentDirectory: '~/catkin_ws/src',
      source: 'source /opt/ros/noetic/setup.bash',
      commands: [
        { command: '# C++版本需要更多代码，Python版本更简洁', explanation: '这是注释说明' },
        { command: '# 性能测试：C++发布10000条消息约0.1秒，Python约0.5秒', explanation: '这是注释说明' }
      ],
      expectedOutput: '对比两种语言的实现差异'
    },
    misconceptions: [
      {
        misconception: '认为Python只适合学习，生产环境必须用C++',
        rootCause: '过度强调性能，忽略开发效率',
        fix: '很多生产环境大量使用Python（工具、可视化、高层逻辑）。关键是识别瓶颈，用合适的语言解决问题。'
      },
      {
        misconception: '混用语言时不用考虑类型一致性',
        rootCause: '不理解消息类型在跨语言通信中的重要性',
        fix: '消息类型在ROS中是跨语言的。Python和C++必须使用相同的.msg定义，否则通信失败。'
      }
    ],
    practice: {
      basic: {
        task: '统计两种语言实现同一功能的代码行数差异',
        hints: ['wc -l 统计行数', 'C++通常多30-50%'],
        verifyCommand: 'wc -l talker.cpp talker.py'
      },
      intermediate: {
        task: '测量发布1000条消息的时间',
        hints: ['time命令', 'rostopic hz测量频率'],
        verifyCommand: 'time rosrun pkg node'
      },
      advanced: {
        task: '分析C++和Python节点的内存占用',
        hints: ['top或htop查看', 'Python解释器占用更大'],
        verifyCommand: 'ps aux | grep ros'
      }
    },
    pauseAndThink: [
      {
        question: '为什么同一个节点，C++编译后几MB，Python脚本只有几KB？',
        answer: 'C++编译后包含完整机器码，Python脚本只是源代码，运行时需要解释器翻译。但Python解释器本身占用内存。'
      }
    ],
    quiz: [
      {
        id: 'cpp-py-quiz-1',
        question: '以下场景最适合Python的是？',
        options: ['实时控制（1000Hz）', '快速原型验证', '嵌入式驱动', '核心算法'],
        correctAnswer: 1,
        explanation: 'Python开发快，适合原型验证。实时控制、驱动、核心算法通常用C++。'
      },
      {
        id: 'cpp-py-quiz-2',
        question: 'C++ ROS节点相比Python的优势是？',
        options: ['开发更快', '类型安全、性能好', '代码更短', '不需要编译'],
        correctAnswer: 1,
        explanation: 'C++编译时类型检查，运行效率高。但开发周期长，代码量大。'
      }
    ],
    reviewSummary: 'C++优势：性能、类型安全、实时性；Python优势：开发效率、灵活性、工具丰富。选择原则：实时/嵌入式用C++，原型/工具用Python，混合使用各取所长。',
    nextLesson: '继续学习ROS核心概念，如话题和消息。',
    nextLessonLink: 'ros-topic',
    sources: [
      { title: 'ROS Language Comparison', url: 'http://wiki.ros.org/ROS/Introduction#Choosing_a_Language', sourceType: 'official', version: 'Noetic', verifiedAt: '2024-01-01' }
    ],
    content: {
      explanation: '同一个温度传感器节点，C++需要更多代码但性能更好，Python更简洁但执行较慢。理解两者差异，才能在不同场景做出正确选择。',
      whyImportant: 'ROS项目通常混合使用多种语言。理解语言差异有助于架构设计和团队协作。',
      codeExamples: [
        {
          language: 'cpp',
          code: `// C++ 温度传感器节点
#include "ros/ros.h"
#include "std_msgs/Float64.h"
#include <random>

int main(int argc, char **argv) {
  ros::init(argc, argv, "temp_sensor");
  ros::NodeHandle nh;
  ros::Publisher temp_pub = nh.advertise<std_msgs::Float64>("temperature", 10);
  ros::Rate loop_rate(1);
  
  std::default_random_engine generator;
  std::normal_distribution<double> distribution(25.0, 2.0);
  
  while (ros::ok()) {
    std_msgs::Float64 msg;
    msg.data = distribution(generator);
    ROS_INFO("Temperature: %.2f", msg.data);
    temp_pub.publish(msg);
    ros::spinOnce();
    loop_rate.sleep();
  }
  return 0;
}`,
          description: 'C++版本（需要编译）'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
# Python 温度传感器节点
import rospy
from std_msgs.msg import Float64
import random

def temp_sensor():
    pub = rospy.Publisher('temperature', Float64, queue_size=10)
    rospy.init_node('temp_sensor', anonymous=True)
    rate = rospy.Rate(1)
    
    while not rospy.is_shutdown():
        temp = random.gauss(25.0, 2.0)
        rospy.loginfo(f"Temperature: {temp:.2f}")
        pub.publish(temp)
        rate.sleep()

if __name__ == '__main__':
    temp_sensor()`,
          description: 'Python版本（直接运行）'
        }
      ],
      commonErrors: [
        {
          error: 'Python节点无法import自定义消息',
          cause: '消息包没有被catkin编译',
          solution: '先编译消息包，再source devel/setup.bash'
        },
        {
          error: 'C++节点编译时找不到消息头文件',
          cause: '依赖顺序问题',
          solution: '确保CMakeLists.txt中generate_messages()在add_executable之前'
        }
      ],
      tips: [
        '快速原型用Python，稳定后用C++重写',
        '团队熟悉的语言优先',
        '混合项目注意消息类型版本一致'
      ]
    },
    rosVersion: 'ROS1',
    officialSources: [
      { title: 'ROS Wiki: Choosing a Language', url: 'http://wiki.ros.org/ROS/Introduction#Choosing_a_Language' }
    ],
    applicableVersions: ['Ubuntu 20.04', 'ROS Noetic'],
    relatedArticles: ['cpp-for-ros-intro', 'python-for-ros-intro', 'ros-topic'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];
// 导出辅助函数
export function getArticleBySlug(slug: string): KnowledgeArticle | undefined {
  return knowledgeArticles.find(article => article.slug === slug);
}

export function getArticlesByCategory(category: string): KnowledgeArticle[] {
  return knowledgeArticles.filter(article => article.category === category);
}

export function searchArticles(query: string): KnowledgeArticle[] {
  const lowerQuery = query.toLowerCase();
  return knowledgeArticles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.summary.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getRelatedArticles(article: KnowledgeArticle): KnowledgeArticle[] {
  return knowledgeArticles
    .filter(a => a.slug !== article.slug && article.relatedArticles.includes(a.slug))
    .slice(0, 3);
}

// 导出分类列表
export { categories } from './types';