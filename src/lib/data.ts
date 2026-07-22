import type { KnowledgeArticle } from './types';

// 24篇知识文章数据
export const knowledgeArticles: KnowledgeArticle[] = [
  // Linux/Ubuntu 基础
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
          cause: '命令未安装或不在 PATH 中',
          solution: '使用 sudo apt install 安装对应软件包'
        }
      ],
      tips: [
        '善用 Tab 键自动补全，可以大幅提高输入效率',
        '使用 Ctrl+C 终止当前运行的命令',
        '使用 history 查看历史命令，用 !数字 快速执行',
        'man 命令名 可以查看命令的详细帮助',
        '命令 --help 可以快速查看常用选项'
      ],
      practice: [
        '在 home 目录下创建一个 catkin_ws 工作空间目录结构',
        '使用 grep 在 .bashrc 中查找所有 ROS 相关配置',
        '编写一个简单的 shell 脚本并添加执行权限'
      ]
    },
    officialSources: [
      { title: 'Ubuntu 官方文档', url: 'https://ubuntu.com/tutorials/command-line-for-beginners' },
      { title: 'Linux 命令行大全', url: 'https://www.gnu.org/software/bash/manual/' }
    ],
    applicableVersions: ['Ubuntu 18.04', 'Ubuntu 20.04'],
    relatedArticles: ['ubuntu-setup', 'git-basics', 'ros-installation'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
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
    content: {
      explanation: `Ubuntu 是 ROS 官方支持的操作系统。本节介绍如何安装 Ubuntu 并配置完整的 ROS 开发环境。

安装方式选择：
1. 虚拟机（VMware/VirtualBox）：安全但性能较低
2. 双系统：性能好但配置稍复杂
3. WSL2（Windows Subsystem）：Windows 下的 Linux 子系统

推荐配置：
- Ubuntu 18.04 对应 ROS Melodic
- Ubuntu 20.04 对应 ROS Noetic`,
      whyImportant: '正确配置的开发环境是顺利进行 ROS 开发的前提。环境配置问题往往是最常见的入门障碍。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 添加 ROS 软件源（Noetic）
sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'

# 添加密钥
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654

# 更新并安装
sudo apt update
sudo apt install ros-noetic-desktop-full

# 环境配置
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc`,
          description: '安装 ROS Noetic',
          expectedOutput: '安装完成后可以使用 rosversion -d 查看版本'
        },
        {
          language: 'bash',
          code: `# 安装构建工具
sudo apt install python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential

# 初始化 rosdep
sudo rosdep init
rosdep update

# 创建工作空间
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/
catkin_make

# 添加工作空间到环境
echo "source ~/catkin_ws/devel/setup.bash" >> ~/.bashrc`,
          description: '配置开发环境和工作空间',
          expectedOutput: '工作空间创建成功，环境变量正确配置'
        }
      ],
      commonErrors: [
        {
          error: 'rosdep update 失败',
          cause: '网络问题导致无法访问国外服务器',
          solution: '使用国内镜像源或配置代理'
        },
        {
          error: 'catkin_make 找不到命令',
          cause: 'ROS 未正确安装或环境变量未配置',
          solution: '检查 ROS 安装，确认 source /opt/ros/noetic/setup.bash'
        }
      ],
      tips: [
        '使用国内镜像源可以大幅提高安装速度',
        '建议将环境配置写入 .bashrc 自动执行',
        '安装完成后运行 roscore 验证安装是否成功',
        '保持系统和软件包更新：sudo apt update && sudo apt upgrade'
      ],
      practice: [
        '完成 ROS Noetic 的完整安装',
        '创建 catkin 工作空间并编译',
        '运行 roscore 验证安装成功'
      ]
    },
    officialSources: [
      { title: 'ROS Noetic 安装指南', url: 'http://wiki.ros.org/noetic/Installation/Ubuntu' }
    ],
    applicableVersions: ['Ubuntu 18.04 + ROS Melodic', 'Ubuntu 20.04 + ROS Noetic'],
    relatedArticles: ['linux-basics', 'catkin-workspace'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'git-basics',
    slug: 'git-basics',
    title: 'Git 版本控制基础',
    category: 'linux-ubuntu',
    tags: ['Git', '版本控制', 'GitHub', '代码管理'],
    summary: '学习 Git 的基本操作，掌握代码版本管理技能，用于保存和分享你的 ROS 项目。',
    difficulty: 'beginner',
    readingTime: 12,
    prerequisites: ['linux-basics'],
    content: {
      explanation: `Git 是分布式版本控制系统，是机器人开发者必备技能。通过 Git，你可以：
- 保存代码的不同版本
- 与团队协作开发
- 备份重要项目
- 使用 GitHub/GitLab 托管代码

核心概念：
- Repository（仓库）：项目的存储库
- Commit（提交）：保存代码变更
- Branch（分支）：独立的开发线
- Remote（远程）：远程服务器上的仓库`,
      whyImportant: 'ROS 项目通常涉及多个包和复杂的代码结构。使用 Git 可以轻松管理代码版本、回退错误修改、与他人协作开发。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 配置用户信息
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 初始化仓库
cd ~/catkin_ws/src/my_package
git init

# 添加文件并提交
git add .
git commit -m "Initial commit"

# 连接远程仓库并推送
git remote add origin https://github.com/username/my_package.git
git push -u origin main`,
          description: 'Git 基本配置和初始化'
        },
        {
          language: 'bash',
          code: `# 克隆现有仓库
git clone https://github.com/ros/ros_tutorials.git

# 查看状态
git status

# 查看提交历史
git log --oneline

# 创建并切换分支
git checkout -b feature/new-node

# 合并分支
git checkout main
git merge feature/new-node`,
          description: '分支操作和常用命令'
        }
      ],
      commonErrors: [
        {
          error: 'fatal: not a git repository',
          cause: '当前目录不是 Git 仓库',
          solution: '先运行 git init 初始化仓库'
        },
        {
          error: 'Permission denied (publickey)',
          cause: 'SSH 密钥未配置或无权限',
          solution: '配置 SSH 密钥或使用 HTTPS 方式'
        }
      ],
      tips: [
        '每次完成一个功能点就提交，不要积累太多改动',
        '提交信息要清晰描述这次改动的内容',
        '使用 .gitignore 排除 build、devel 等编译产物',
        '定期 push 到远程仓库，避免代码丢失'
      ],
      practice: [
        '创建一个 GitHub 账号并配置 SSH 密钥',
        '创建一个 ROS 包并用 Git 管理',
        '创建分支、修改代码、合并分支'
      ]
    },
    officialSources: [
      { title: 'Git 官方文档', url: 'https://git-scm.com/doc' },
      { title: 'GitHub 指南', url: 'https://docs.github.com/cn' }
    ],
    applicableVersions: ['Git 2.x'],
    relatedArticles: ['linux-basics', 'catkin-workspace'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // ROS 基础
  {
    id: 'ros-architecture',
    slug: 'ros-architecture',
    title: 'ROS 系统架构概述',
    category: 'ros-basics',
    tags: ['ROS', '架构', '节点', '话题', '服务'],
    summary: '了解 ROS 的整体架构设计，理解节点、话题、服务等核心概念之间的关系。',
    difficulty: 'beginner',
    readingTime: 15,
    prerequisites: ['linux-basics'],
    content: {
      explanation: `ROS（Robot Operating System）是一个用于编写机器人软件的框架。它提供了：
- 硬件抽象层
- 底层设备驱动
- 进程间通信机制
- 包管理系统

核心概念：
1. 节点（Node）：执行计算的进程
2. 话题（Topic）：节点间传递消息的命名通道
3. 消息（Message）：话题中传递的数据类型
4. 服务（Service）：请求-响应式通信
5. 参数服务器（Parameter Server）：共享配置数据
6. 动作（Action）：带反馈的长时间任务

ROS master（roscore）负责节点发现和连接建立。`,
      whyImportant: '理解 ROS 架构是开发机器人应用的基础。所有 ROS 程序都围绕这些核心概念设计，深入理解它们能帮助你更好地组织代码结构。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 启动 ROS master
roscore

# 在新终端中查看运行状态
rosnode list
rostopic list
rosservice list

# 查看参数服务器
rosparam list`,
          description: '启动 roscore 并查看系统状态',
          expectedOutput: '看到 /rosout 等默认话题和节点'
        }
      ],
      commonErrors: [
        {
          error: 'Unable to contact master',
          cause: 'roscore 未运行',
          solution: '先在新终端运行 roscore'
        }
      ],
      tips: [
        'roscore 是 ROS 系统的核心，必须保持运行',
        '一个节点应该只做一件事，保持简单',
        '话题命名要有意义，如 /camera/image_raw',
        '使用 rostopic hz 查看话题发布频率'
      ],
      practice: [
        '启动 roscore 并使用 rostopic list 查看所有话题',
        '运行 turtlesim 并理解其架构',
        '使用 rqt_graph 可视化节点和话题关系'
      ]
    },
    officialSources: [
      { title: 'ROS 架构概述', url: 'http://wiki.ros.org/ROS/Concepts' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['roscore', 'ros-node', 'ros-topic'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'roscore',
    slug: 'roscore',
    title: 'roscore 启动与配置',
    category: 'ros-basics',
    tags: ['roscore', 'Master', '启动', '配置'],
    summary: '学习 roscore 的作用、启动方法和常见配置，理解 ROS Master 的工作原理。',
    difficulty: 'beginner',
    readingTime: 10,
    prerequisites: ['ros-architecture'],
    content: {
      explanation: `roscore 是 ROS 系统的核心服务，它启动：
1. ROS Master：节点注册和发现服务
2. Parameter Server：参数存储服务
3. rosout：日志记录节点

当节点启动时，它会向 Master 注册自己发布和订阅的话题。Master 负责让发布者和订阅者建立连接。

roscore 命令选项：
- roscore：默认在 11311 端口启动
- roscore -p 端口号：指定端口
- roscore -h：显示帮助`,
      whyImportant: 'roscore 是 ROS 1 系统运行的基础。没有 roscore，节点无法发现彼此，通信无法建立。理解它的工作原理有助于排查通信问题。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 启动 roscore
roscore

# 指定端口启动
roscore -p 11312

# 后台运行
roscore &

# 查看 Master 是否运行
rostopic list`,
          description: 'roscore 启动命令',
          expectedOutput: '启动后显示 "started core service" 等信息'
        },
        {
          language: 'bash',
          code: `# 设置 ROS_MASTER_URI（多机通信时）
export ROS_MASTER_URI=http://192.168.1.100:11311

# 查看 Master URI
echo $ROS_MASTER_URI`,
          description: '配置 Master URI'
        }
      ],
      commonErrors: [
        {
          error: 'Unable to start roscore',
          cause: 'ROS 未正确安装或端口被占用',
          solution: '检查 ROS 安装，使用 roscore -p 更换端口'
        },
        {
          error: 'Connection refused',
          cause: 'ROS_MASTER_URI 配置错误',
          solution: '检查环境变量，确保指向正确的 Master'
        }
      ],
      tips: [
        '开发时建议一直保持 roscore 运行',
        '多机器人项目要注意 ROS_MASTER_URI 配置',
        '可以使用 roslaunch 自动启动 roscore',
        'roscore 只需要运行一个实例'
      ],
      practice: [
        '启动 roscore 并观察输出信息',
        '使用 rqt_graph 查看 roscore 启动后的系统状态',
        '尝试指定不同端口启动 roscore'
      ]
    },
    officialSources: [
      { title: 'roscore 文档', url: 'http://wiki.ros.org/roscore' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-architecture', 'ros-node'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'ros-node',
    slug: 'ros-node',
    title: 'ROS 节点详解',
    category: 'ros-basics',
    tags: ['节点', 'Node', 'rosnode', '进程'],
    summary: '深入理解 ROS 节点的概念、创建方法、生命周期和管理技巧。',
    difficulty: 'beginner',
    readingTime: 15,
    prerequisites: ['ros-architecture', 'roscore'],
    content: {
      explanation: `节点（Node）是 ROS 中执行计算的基本单元。每个节点都是一个独立的进程，专注于单一任务：
- 传感器驱动节点
- 数据处理节点
- 控制节点
- 视觉处理节点

节点通过话题和服务与其他节点通信。

节点生命周期：
1. 初始化：ros::init()
2. 创建句柄：ros::NodeHandle
3. 注册订阅/发布
4. 循环处理
5. 关闭清理`,
      whyImportant: '节点是 ROS 应用的核心组成部分。合理设计节点结构能让系统更清晰、更易维护。了解节点的运行机制有助于调试和优化。',
      codeExamples: [
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
from std_msgs.msg import String

def callback(data):
    rospy.loginfo(rospy.get_caller_id() + " I heard %s", data.data)

def listener():
    # 初始化节点
    rospy.init_node('listener', anonymous=True)
    
    # 订阅话题
    rospy.Subscriber('chatter', String, callback)
    
    # 保持运行
    rospy.spin()

if __name__ == '__main__':
    listener()`,
          description: 'Python 节点示例'
        },
        {
          language: 'bash',
          code: `# 查看运行的节点
rosnode list

# 查看节点信息
rosnode info /listener

# 测试节点连接
rosnode ping /listener

# 终止节点
rosnode kill /listener`,
          description: '节点管理命令'
        }
      ],
      commonErrors: [
        {
          error: 'Node not found',
          cause: '节点未启动或名称错误',
          solution: '使用 rosnode list 查看实际节点名'
        },
        {
          error: 'Failed to contact master',
          cause: 'roscore 未运行',
          solution: '先启动 roscore'
        }
      ],
      tips: [
        '节点命名要体现功能，如 laser_driver、path_planner',
        '使用 anonymous=True 避免重名冲突',
        '一个节点只做一件事，保持简单',
        '使用 rqt_graph 可视化节点关系'
      ],
      practice: [
        '创建一个简单的发布者节点',
        '创建一个订阅者节点并与发布者通信',
        '使用 rosnode 命令查看和管理节点'
      ]
    },
    officialSources: [
      { title: 'ROS 节点教程', url: 'http://wiki.ros.org/ROS/Tutorials/UnderstandingNodes' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-architecture', 'ros-topic', 'ros-message'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // 通信机制
  {
    id: 'ros-topic',
    slug: 'ros-topic',
    title: 'ROS 话题通信详解',
    category: 'communication',
    tags: ['话题', 'Topic', '发布', '订阅', 'rostopic'],
    summary: '学习 ROS 话题的概念、使用方法和最佳实践，掌握发布-订阅通信模式。',
    difficulty: 'beginner',
    readingTime: 18,
    prerequisites: ['ros-node'],
    content: {
      explanation: `话题（Topic）是 ROS 中最常用的通信方式，采用发布-订阅模式：
- 发布者（Publisher）：向话题发送消息
- 订阅者（Subscriber）：从话题接收消息
- 消息（Message）：话题中传递的数据

特点：
- 异步通信，松耦合
- 一对多、多对多通信
- 适合传感器数据等连续数据流

常用命令：
- rostopic list：列出所有话题
- rostopic echo：显示话题内容
- rostopic pub：发布消息
- rostopic hz：查看发布频率`,
      whyImportant: '话题是 ROS 最核心的通信机制。大部分传感器数据、控制指令都通过话题传输。熟练掌握话题操作是开发机器人应用的基础。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 启动小海龟演示
roscore &
rosrun turtlesim turtlesim_node &
rosrun turtlesim turtle_teleop_key

# 查看话题
rostopic list
rostopic echo /turtle1/pose
rostopic hz /turtle1/pose

# 发布消息控制海龟
rostopic pub /turtle1/cmd_vel geometry_msgs/Twist "linear:
  x: 2.0
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 1.8" -r 1`,
          description: '使用 rostopic 命令',
          expectedOutput: '海龟按照命令移动'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
from geometry_msgs.msg import Twist

# 初始化节点
rospy.init_node('velocity_publisher')

# 创建发布者
pub = rospy.Publisher('/turtle1/cmd_vel', Twist, queue_size=10)

# 发布消息
rate = rospy.Rate(1)  # 1 Hz
while not rospy.is_shutdown():
    vel = Twist()
    vel.linear.x = 2.0
    vel.angular.z = 1.0
    pub.publish(vel)
    rate.sleep()`,
          description: 'Python 发布者代码'
        }
      ],
      commonErrors: [
        {
          error: 'topic does not appear to be published',
          cause: '发布者未启动或话题名错误',
          solution: '使用 rostopic list 查看可用话题'
        },
        {
          error: 'no messages received',
          cause: '消息类型不匹配或网络问题',
          solution: '检查消息类型，确认 ROS_MASTER_URI 配置'
        }
      ],
      tips: [
        '话题命名要清晰：/传感器类型/数据类型',
        '使用 rostopic info 查看话题详情',
        'rostopic bw 可以查看话题带宽',
        '发布频率要合理，避免过载'
      ],
      practice: [
        '使用小海龟练习话题发布和订阅',
        '编写一个自定义的发布者节点',
        '使用 rostopic 命令控制海龟画圆'
      ]
    },
    officialSources: [
      { title: 'ROS 话题教程', url: 'http://wiki.ros.org/ROS/Tutorials/UnderstandingTopics' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-node', 'ros-message', 'ros-service'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'ros-message',
    slug: 'ros-message',
    title: 'ROS 消息定义与使用',
    category: 'communication',
    tags: ['消息', 'Message', 'msg', '数据类型', '自定义消息'],
    summary: '学习 ROS 消息的定义方式、基本类型和自定义消息的创建流程。',
    difficulty: 'beginner',
    readingTime: 15,
    prerequisites: ['ros-topic'],
    content: {
      explanation: `消息（Message）定义了话题中传输的数据结构。ROS 提供了丰富的内置消息类型：
- std_msgs：基础类型（String, Int32, Float64 等）
- geometry_msgs：几何数据（Point, Pose, Twist 等）
- sensor_msgs：传感器数据（Image, LaserScan, Imu 等）
- nav_msgs：导航数据（Odometry, Path 等）

自定义消息：
1. 在包中创建 msg/ 目录
2. 编写 .msg 文件
3. 修改 package.xml 和 CMakeLists.txt
4. 编译生成代码`,
      whyImportant: '消息定义了节点间通信的数据格式。理解消息结构能帮助你正确处理传感器数据，自定义消息让你能定义项目特有的数据类型。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 查看消息类型
rosmsg list
rosmsg show geometry_msgs/Twist

# 显示消息定义
rosmsg package sensor_msgs`,
          description: 'rosmsg 命令使用'
        },
        {
          language: 'msg',
          code: `# MyRobot.msg - 自定义消息示例
# 位置信息
geometry_msgs/Pose pose
# 速度信息
geometry_msgs/Twist velocity
# 状态标志
uint8 status
uint8 STATUS_STOP=0
uint8 STATUS_MOVE=1
uint8 STATUS_ERROR=2`,
          description: '自定义消息定义'
        },
        {
          language: 'cmake',
          code: `# CMakeLists.txt 添加消息生成
find_package(catkin REQUIRED COMPONENTS
  std_msgs
  geometry_msgs
  message_generation
)

add_message_files(
  FILES
  MyRobot.msg
)

generate_messages(
  DEPENDENCIES
  std_msgs
  geometry_msgs
)`,
          description: 'CMakeLists.txt 配置'
        }
      ],
      commonErrors: [
        {
          error: 'Could not find message',
          cause: '消息未正确生成或依赖未添加',
          solution: '检查 CMakeLists.txt 配置，重新编译'
        },
        {
          error: 'Undefined message type',
          cause: '消息头文件未包含',
          solution: '在代码中 #include <package_name/MyRobot.h>'
        }
      ],
      tips: [
        '使用数组类型：Type[] 表示变长数组',
        '使用 const 类型可以减少内存拷贝',
        '添加注释说明每个字段的含义',
        '消息名使用 PascalCase，字段使用 camelCase'
      ],
      practice: [
        '使用 rosmsg show 查看常用消息结构',
        '创建一个自定义消息包含多个字段',
        '编写节点发布和接收自定义消息'
      ]
    },
    officialSources: [
      { title: 'ROS 消息定义', url: 'http://wiki.ros.org/msg' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-topic', 'ros-service', 'catkin-workspace'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'ros-service',
    slug: 'ros-service',
    title: 'ROS 服务通信详解',
    category: 'communication',
    tags: ['服务', 'Service', 'rosservice', '请求-响应'],
    summary: '学习 ROS 服务的概念、定义方式和使用方法，掌握请求-响应通信模式。',
    difficulty: 'intermediate',
    readingTime: 18,
    prerequisites: ['ros-topic', 'ros-message'],
    content: {
      explanation: `服务（Service）是 ROS 的另一种通信方式，采用请求-响应模式：
- 客户端发送请求
- 服务端处理并返回响应
- 同步调用，适合短暂操作

与话题的区别：
- 话题：异步，持续数据流
- 服务：同步，一次性请求

适用场景：
- 计算路径
- 获取快照
- 切换模式
- 执行特定操作

常用命令：
- rosservice list：列出服务
- rosservice call：调用服务
- rosservice type：查看服务类型`,
      whyImportant: '服务适合需要即时响应的场景，如计算请求、状态查询、一次性配置。理解何时使用服务、何时使用话题是设计 ROS 系统的关键。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 查看小海龟的服务
rosservice list
rosservice type /turtle1/teleport_absolute

# 调用服务
rosservice call /turtle1/teleport_absolute 2 2 0

# 清除轨迹
rosservice call /clear`,
          description: 'rosservice 命令使用'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
from std_srvs.srv import Empty, EmptyResponse

def handle_clear(req):
    rospy.loginfo("Clearing...")
    return EmptyResponse()

def clear_server():
    rospy.init_node('clear_server')
    s = rospy.Service('clear', Empty, handle_clear)
    rospy.loginfo("Ready to clear.")
    rospy.spin()

if __name__ == "__main__":
    clear_server()`,
          description: 'Python 服务端代码'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
from std_srvs.srv import Empty

rospy.init_node('clear_client')
rospy.wait_for_service('clear')
try:
    clear = rospy.ServiceProxy('clear', Empty)
    response = clear()
    print("Service called successfully")
except rospy.ServiceException as e:
    print(f"Service call failed: {e}")`,
          description: 'Python 客户端代码'
        }
      ],
      commonErrors: [
        {
          error: 'Service not found',
          cause: '服务名错误或服务未启动',
          solution: '使用 rosservice list 查看可用服务'
        },
        {
          error: 'Service call failed',
          cause: '参数错误或服务端处理异常',
          solution: '检查服务类型和参数格式'
        }
      ],
      tips: [
        '服务处理要快，避免长时间阻塞',
        '耗时的操作考虑使用 Action',
        '使用 rosservice type 查看服务定义',
        '调用前可以用 rosservice find 搜索服务'
      ],
      practice: [
        '使用小海龟练习服务调用',
        '编写一个简单的服务端和客户端',
        '创建自定义服务定义'
      ]
    },
    officialSources: [
      { title: 'ROS 服务教程', url: 'http://wiki.ros.org/ROS/Tutorials/UnderstandingServices' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-topic', 'ros-action'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'ros-action',
    slug: 'ros-action',
    title: 'ROS 动作详解',
    category: 'communication',
    tags: ['动作', 'Action', 'actionlib', '反馈', '目标'],
    summary: '学习 ROS Action 的概念和使用方法，掌握带反馈的长时间任务处理。',
    difficulty: 'intermediate',
    readingTime: 20,
    prerequisites: ['ros-service'],
    content: {
      explanation: `动作（Action）用于处理需要较长时间执行的任务：
- Goal（目标）：客户端发送的任务请求
- Result（结果）：任务完成后的最终结果
- Feedback（反馈）：执行过程中的状态更新

与服务的区别：
- 服务：同步，无中间状态
- 动作：异步，有进度反馈，可取消

适用场景：
- 导航到目标点
- 机械臂抓取
- 复杂计算任务

ROS 提供 actionlib 库支持动作通信。`,
      whyImportant: '动作是处理长时间任务的最佳方式。机器人导航、机械臂运动等场景都需要实时反馈执行状态，动作提供了完整的解决方案。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 查看动作
rostopic list | grep goal
rostopic list | grep result
rostopic list | grep feedback

# 发送动作目标（简单示例）
rostopic pub /fibonacci/goal actionlib_tutorials/FibonacciActionGoal "header:
  seq: 1
  stamp: {secs: 0, nsecs: 0}
  frame_id: ''
goal_id:
  stamp: {secs: 0, nsecs: 0}
  id: 'goal_1'
goal:
  order: 20"`,
          description: '动作话题查看'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
import actionlib
from actionlib_tutorials.msg import FibonacciAction, FibonacciGoal

rospy.init_node('fibonacci_client')
client = actionlib.SimpleActionClient('fibonacci', FibonacciAction)
client.wait_for_server()

# 发送目标
goal = FibonacciGoal(order=20)
client.send_goal(goal)

# 等待结果
client.wait_for_result()
print(f"Result: {client.get_result()}")`,
          description: '动作客户端代码'
        }
      ],
      commonErrors: [
        {
          error: 'Action server not found',
          cause: '服务端未启动或名称错误',
          solution: '检查动作服务端是否运行'
        },
        {
          error: 'Goal rejected',
          cause: '目标参数无效或服务端拒绝',
          solution: '检查目标参数和动作定义'
        }
      ],
      tips: [
        '长时间任务优先考虑 Action',
        '提供有意义的 Feedback 便于用户了解进度',
        '支持 Goal 取消提升用户体验',
        '动作定义文件放在 action/ 目录'
      ],
      practice: [
        '研究 actionlib_tutorials 示例包',
        '编写一个带反馈的动作服务端',
        '实现动作的取消功能'
      ]
    },
    officialSources: [
      { title: 'actionlib 文档', url: 'http://wiki.ros.org/actionlib' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-service', 'ros-navigation'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'ros-parameter',
    slug: 'ros-parameter',
    title: 'ROS 参数服务器',
    category: 'communication',
    tags: ['参数', 'Parameter', 'rosparam', '配置'],
    summary: '学习 ROS 参数服务器的使用方法，掌握参数的设置、读取和管理技巧。',
    difficulty: 'beginner',
    readingTime: 12,
    prerequisites: ['ros-architecture'],
    content: {
      explanation: `参数服务器（Parameter Server）是 ROS 的共享配置存储：
- 存储全局配置参数
- 所有节点都可以访问
- 运行时可读写

参数类型：
- 整数、浮点数
- 字符串、布尔值
- 列表、字典

常用命令：
- rosparam list：列出参数
- rosparam get：获取参数
- rosparam set：设置参数
- rosparam load：从文件加载`,
      whyImportant: '参数服务器提供了集中管理配置的方式。机器人的尺寸、传感器参数、PID 增益等配置都可以存储在参数服务器，便于统一管理和修改。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 列出所有参数
rosparam list

# 获取参数值
rosparam get /rosdistro
rosparam get /run_id

# 设置参数
rosparam set /my_param 42

# 加载参数文件
rosparam load config/params.yaml

# 保存参数到文件
rosparam dump params.yaml`,
          description: 'rosparam 命令使用'
        },
        {
          language: 'yaml',
          code: `# params.yaml 示例
robot_name: my_robot
max_velocity: 1.5
sensor_rate: 30
controllers:
  left_wheel:
    p: 1.0
    i: 0.01
    d: 0.1
  right_wheel:
    p: 1.0
    i: 0.01
    d: 0.1`,
          description: 'YAML 参数文件格式'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy

rospy.init_node('param_example')

# 获取参数
robot_name = rospy.get_param('~robot_name', 'default_robot')
max_vel = rospy.get_param('~max_velocity', 1.0)

# 设置参数
rospy.set_param('~initialized', True)

# 检查参数是否存在
if rospy.has_param('~robot_name'):
    print(f"Robot name: {rospy.get_param('~robot_name')}")`,
          description: 'Python 参数操作'
        }
      ],
      commonErrors: [
        {
          error: 'Parameter not found',
          cause: '参数未设置或名称错误',
          solution: '使用 rosparam list 查看，检查参数名'
        },
        {
          error: 'Parameter is not set',
          cause: '访问未定义的参数',
          solution: '使用 get_param 时提供默认值'
        }
      ],
      tips: [
        '使用私有命名空间 ~ 避免参数冲突',
        '复杂配置使用 YAML 文件管理',
        'Launch 文件中可以预加载参数',
        '敏感参数不要硬编码，使用外部配置'
      ],
      practice: [
        '编写 YAML 配置文件并加载',
        '在节点中读取和使用参数',
        '使用 launch 文件设置参数'
      ]
    },
    officialSources: [
      { title: 'ROS 参数服务器', url: 'http://wiki.ros.org/Parameter%20Server' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-launch', 'ros-navigation'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // 工具
  {
    id: 'ros-launch',
    slug: 'ros-launch',
    title: 'ROS Launch 文件详解',
    category: 'tools',
    tags: ['Launch', 'roslaunch', '启动文件', '配置'],
    summary: '学习 roslaunch 的使用方法，掌握启动文件的编写技巧和最佳实践。',
    difficulty: 'intermediate',
    readingTime: 20,
    prerequisites: ['ros-node', 'ros-parameter'],
    content: {
      explanation: `Launch 文件是 XML 格式的配置文件，用于：
- 启动多个节点
- 设置参数
- 配置命名空间
- 管理节点依赖

优势：
- 一键启动复杂系统
- 参数集中管理
- 支持条件启动
- 自动启动 roscore

Launch 文件放在包的 launch/ 目录。

核心元素：
- <node>：启动节点
- <param>：设置参数
- <arg>：定义参数
- <include>：包含其他 launch 文件
- <group>：分组配置`,
      whyImportant: 'Launch 文件是管理 ROS 应用的核心方式。一个机器人系统通常需要启动十几个节点，使用 Launch 文件可以一键启动整个系统，大幅提高开发效率。',
      codeExamples: [
        {
          language: 'xml',
          code: `<!-- minimal.launch -->
<launch>
  <!-- 定义参数 -->
  <arg name="model" default="$(find urdf_tutorial)/robots/r2d2.urdf"/>
  <arg name="gui" default="true"/>
  
  <!-- 设置参数 -->
  <param name="robot_description" textfile="$(arg model)"/>
  
  <!-- 启动节点 -->
  <node name="robot_state_publisher" pkg="robot_state_publisher" 
        type="robot_state_publisher"/>
  
  <!-- 条件启动 -->
  <node if="$(arg gui)" name="joint_state_publisher_gui" 
        pkg="joint_state_publisher_gui" type="joint_state_publisher_gui"/>
  
  <!-- 包含其他 launch 文件 -->
  <include file="$(find urdf_tutorial)/launch/rviz.launch"/>
</launch>`,
          description: 'Launch 文件示例'
        },
        {
          language: 'bash',
          code: `# 启动 launch 文件
roslaunch my_package my_launch.launch

# 传递参数
roslaunch my_package my_launch.launch model:=my_robot.urdf

# 指定包和文件
roslaunch $(rospack find my_package)/launch/my_launch.launch

# 查看launch文件内容
roslaunch -a my_package my_launch.launch`,
          description: 'roslaunch 命令使用'
        }
      ],
      commonErrors: [
        {
          error: 'cannot locate package',
          cause: '包名错误或包不存在',
          solution: '使用 rospack find 检查包路径'
        },
        {
          error: 'unknown arg',
          cause: '使用了未定义的参数',
          solution: '在 launch 文件中添加 <arg> 定义'
        }
      ],
      tips: [
        '使用 $(find package) 定位包路径',
        '参数化常用配置，提高复用性',
        '复杂系统拆分多个 launch 文件',
        '使用 ns 属性设置命名空间'
      ],
      practice: [
        '编写一个启动多节点的 launch 文件',
        '使用 arg 参数化配置',
        '包含并传递参数给子 launch 文件'
      ]
    },
    officialSources: [
      { title: 'roslaunch 文档', url: 'http://wiki.ros.org/roslaunch' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-node', 'ros-parameter', 'catkin-workspace'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'catkin-workspace',
    slug: 'catkin-workspace',
    title: 'Catkin 工作空间详解',
    category: 'tools',
    tags: ['catkin', '工作空间', '编译', 'catkin_make', '包管理'],
    summary: '学习 Catkin 工作空间的结构、创建方法、编译流程和包管理技巧。',
    difficulty: 'beginner',
    readingTime: 18,
    prerequisites: ['ubuntu-setup'],
    content: {
      explanation: `Catkin 是 ROS 的构建系统，基于 CMake。工作空间结构：
\`\`\`
catkin_ws/
├── build/      # 编译产物（自动生成）
├── devel/      # 开发环境（自动生成）
└── src/        # 源代码
    ├── CMakeLists.txt
    └── package1/
        ├── CMakeLists.txt
        ├── package.xml
        ├── src/
        ├── include/
        ├── msg/
        ├── srv/
        └── launch/
\`\`\`

常用命令：
- catkin_make：编译工作空间
- catkin_make -DPYTHON_EXECUTABLE=...：指定 Python
- catkin clean：清理编译产物`,
      whyImportant: 'Catkin 工作空间是 ROS 开发的基础设施。理解工作空间结构、正确配置编译系统，是开发 ROS 包的前提。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 创建工作空间
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
catkin_make

# 配置环境
echo "source ~/catkin_ws/devel/setup.bash" >> ~/.bashrc
source ~/catkin_ws/devel/setup.bash

# 编译特定包
catkin_make --only-pkg-with-deps my_package

# 清理重新编译
catkin clean -y
catkin_make`,
          description: '工作空间操作命令'
        },
        {
          language: 'bash',
          code: `# 创建新包
cd ~/catkin_ws/src
catkin_create_pkg my_package std_msgs rospy roscpp

# 包结构
my_package/
├── CMakeLists.txt
├── package.xml
├── src/
│   └── my_node.cpp
├── include/my_package/
├── msg/
├── srv/
└── launch/`,
          description: '创建 ROS 包'
        }
      ],
      commonErrors: [
        {
          error: 'catkin_make: command not found',
          cause: 'ROS 环境未配置',
          solution: 'source /opt/ros/noetic/setup.bash'
        },
        {
          error: 'Could not find a package configuration file',
          cause: '依赖包未安装',
          solution: '安装依赖：rosdep install --from-paths src --ignore-src'
        }
      ],
      tips: [
        '每次添加新文件后重新运行 catkin_make',
        '使用 rosdep 自动安装依赖',
        '大型项目考虑使用 catkin build（catkin_tools）',
        '.gitignore 中排除 build/ 和 devel/'
      ],
      practice: [
        '创建新的工作空间',
        '创建一个简单的 ROS 包',
        '编译并运行包中的节点'
      ]
    },
    officialSources: [
      { title: 'Catkin 工作空间', url: 'http://wiki.ros.org/catkin/workspaces' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ubuntu-setup', 'ros-node', 'ros-launch'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'rosbag',
    slug: 'rosbag',
    title: 'Rosbag 数据录制与回放',
    category: 'tools',
    tags: ['rosbag', '录制', '回放', '数据', '调试'],
    summary: '学习使用 rosbag 录制和回放话题数据，掌握数据记录和分析技巧。',
    difficulty: 'intermediate',
    readingTime: 15,
    prerequisites: ['ros-topic'],
    content: {
      explanation: `Rosbag 是 ROS 的数据记录工具：
- 录制话题数据到 .bag 文件
- 回放录制的消息
- 分析和可视化数据

应用场景：
- 记录传感器数据
- 离线调试
- 算法测试
- 性能分析

常用命令：
- rosbag record：录制
- rosbag play：回放
- rosbag info：查看信息
- rosbag filter：过滤转换`,
      whyImportant: 'Rosbag 是机器人开发必备工具。记录真实场景数据，在实验室反复回放测试，可以大幅提高开发效率，减少现场调试时间。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 录制所有话题
rosbag record -a

# 录制特定话题
rosbag record /camera/image_raw /scan /odom

# 录制并设置文件名
rosbag record -O my_data.bag /topic1 /topic2

# 限制录制时长（秒）
rosbag record --duration=60 /topic1

# 查看录制信息
rosbag info my_data.bag

# 回放数据
rosbag play my_data.bag

# 循环回放
rosbag play -l my_data.bag

# 指定回放速度
rosbag play -r 0.5 my_data.bag`,
          description: 'rosbag 基本命令'
        },
        {
          language: 'bash',
          code: `# 过滤 bag 文件
rosbag filter input.bag output.bag "topic == '/scan'"

# 导出话题数据
rostopic echo -b my_data.bag -p /scan > scan.csv

# 合并多个 bag
rosbag merge bag1.bag bag2.bag -o merged.bag`,
          description: 'rosbag 高级操作'
        }
      ],
      commonErrors: [
        {
          error: 'No messages recorded',
          cause: '话题名错误或没有数据',
          solution: '使用 rostopic list 确认话题存在'
        },
        {
          error: 'bag file is empty',
          cause: '录制时间太短或未录制成功',
          solution: '确认录制过程中有数据发布'
        }
      ],
      tips: [
        '录制时指定需要的话题，避免文件过大',
        '使用 --duration 限制录制时长',
        '回放前使用 rosbag info 查看内容',
        '配合 rqt_bag 可视化查看数据'
      ],
      practice: [
        '录制小海龟的话题数据',
        '回放并观察数据重现',
        '使用 filter 提取特定话题'
      ]
    },
    officialSources: [
      { title: 'rosbag 文档', url: 'http://wiki.ros.org/rosbag' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-topic', 'rqt-tools'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'rqt-tools',
    slug: 'rqt-tools',
    title: 'RQT 可视化工具集',
    category: 'tools',
    tags: ['rqt', '可视化', '调试', '图形界面'],
    summary: '学习 RQT 工具集的使用方法，掌握可视化调试和数据分析技巧。',
    difficulty: 'intermediate',
    readingTime: 18,
    prerequisites: ['ros-topic'],
    content: {
      explanation: `RQT 是 ROS 的图形化工具框架，包含：
- rqt_graph：节点和话题关系图
- rqt_plot：实时数据曲线
- rqt_image：图像显示
- rqt_console：日志查看
- rqt_reconfigure：动态参数调整
- rqt_bag：bag 文件可视化

启动方式：
- rqt：启动主界面
- rqt_graph：单独启动
- rqt --standalone rqt_plot：指定插件`,
      whyImportant: 'RQT 工具集提供了强大的可视化和调试能力。通过图形界面查看系统状态、分析数据曲线、可视化话题关系，能大幅提高开发效率。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 启动 RQT 主界面
rqt

# 单独启动常用工具
rqt_graph
rqt_plot
rqt_image_view
rqt_console

# 绘制话题数据曲线
rqt_plot /turtle1/pose/x /turtle1/pose/y

# 查看 TF 树
rqt_tf_tree

# 动态参数调整
rqt_reconfigure`,
          description: 'RQT 工具启动命令'
        }
      ],
      commonErrors: [
        {
          error: 'Plugin not found',
          cause: '插件未安装',
          solution: 'sudo apt install ros-noetic-rqt-插件名'
        },
        {
          error: 'No topics available',
          cause: '没有节点运行或话题未发布',
          solution: '先启动 ROS 节点'
        }
      ],
      tips: [
        '使用 rqt 时可以保存和加载布局配置',
        'rqt_plot 支持拖拽话题添加曲线',
        'rqt_graph 有多种显示模式可选',
        '可以创建自定义 RQT 插件'
      ],
      practice: [
        '使用 rqt_graph 查看小海龟系统结构',
        '使用 rqt_plot 绘制话题数据曲线',
        '探索 rqt 主界面的各种插件'
      ]
    },
    officialSources: [
      { title: 'RQT 文档', url: 'http://wiki.ros.org/rqt' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-topic', 'rosbag', 'rviz'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // 坐标与模型
  {
    id: 'tf-transform',
    slug: 'tf-transform',
    title: 'TF 坐标变换系统',
    category: 'transform',
    tags: ['TF', 'tf2', '坐标变换', '变换树'],
    summary: '学习 TF/TF2 坐标变换系统的原理和使用方法，掌握机器人坐标管理。',
    difficulty: 'intermediate',
    readingTime: 25,
    prerequisites: ['ros-topic', 'ros-message'],
    content: {
      explanation: `TF（Transform）是 ROS 的坐标变换系统：
- 管理多个坐标系之间的变换关系
- 支持时间序列查询
- 自动维护变换树

核心概念：
- Frame：坐标系，如 base_link、odom、map
- Transform：从一个 frame 到另一个的变换
- TF Tree：所有坐标系组成的树状结构

TF vs TF2：
- TF：旧版本，已弃用
- TF2：新版本，性能更好

常用工具：
- tf_echo：打印变换
- tf_monitor：监控 TF
- view_frames：生成 PDF
- rqt_tf_tree：可视化`,
      whyImportant: '机器人有多个坐标系（传感器、底盘、世界坐标等），TF 系统自动管理这些坐标变换，让数据在不同坐标系间转换。不理解 TF，就无法理解机器人的空间关系。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 查看 TF 树
rosrun tf view_frames
# 生成 frames.pdf

# 监控 TF
rosrun tf tf_monitor

# 打印特定变换
rosrun tf tf_echo base_link odom

# 可视化 TF 树
rqt_tf_tree`,
          description: 'TF 命令行工具'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
import tf

rospy.init_node('tf_listener')
listener = tf.TransformListener()

rate = rospy.Rate(10)
while not rospy.is_shutdown():
    try:
        # 获取变换
        (trans, rot) = listener.lookupTransform(
            '/base_link', '/odom', rospy.Time(0))
        print(f"Translation: {trans}")
        print(f"Rotation: {rot}")
    except (tf.LookupException, tf.ConnectivityException, tf.ExtrapolationException):
        pass
    rate.sleep()`,
          description: 'Python TF 监听器'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
import tf
from geometry_msgs.msg import TransformStamped

rospy.init_node('tf_broadcaster')
br = tf.TransformBroadcaster()
rate = rospy.Rate(10)

while not rospy.is_shutdown():
    # 发布变换
    br.sendTransform(
        (1.0, 2.0, 0.0),           # 平移
        (0.0, 0.0, 0.0, 1.0),      # 四元数旋转
        rospy.Time.now(),
        "child_frame",              # 子坐标系
        "parent_frame"              # 父坐标系
    )
    rate.sleep()`,
          description: 'Python TF 广播器'
        }
      ],
      commonErrors: [
        {
          error: 'Frame does not exist',
          cause: '坐标系未发布',
          solution: '检查节点是否正确发布 TF'
        },
        {
          error: 'Extrapolation into the future',
          cause: '查询未来时间的变换',
          solution: '使用 rospy.Time(0) 获取最新变换'
        }
      ],
      tips: [
        'TF 树必须是单树结构，不能有循环',
        '使用 rospy.Time(0) 获取最新可用变换',
        '定期检查 TF 树结构是否正确',
        'TF 发布频率建议 10Hz 以上'
      ],
      practice: [
        '创建一个 TF 广播器节点',
        '使用 rqt_tf_tree 查看 TF 树',
        '在代码中查询和变换坐标'
      ]
    },
    officialSources: [
      { title: 'TF 教程', url: 'http://wiki.ros.org/tf/Tutorials' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['urdf-xacro', 'rviz'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'urdf-xacro',
    slug: 'urdf-xacro',
    title: 'URDF 与 Xacro 机器人模型',
    category: 'transform',
    tags: ['URDF', 'Xacro', '机器人模型', '描述文件'],
    summary: '学习 URDF 和 Xacro 机器人描述文件的编写方法，掌握机器人模型定义技巧。',
    difficulty: 'intermediate',
    readingTime: 25,
    prerequisites: ['tf-transform'],
    content: {
      explanation: `URDF（Unified Robot Description Format）是 ROS 的机器人模型格式：
- 定义机器人的链接和关节
- 描述可视化形状
- 指定碰撞检测形状
- 配置物理属性

Xacro 是 URDF 的宏语言：
- 支持变量和宏
- 避免重复代码
- 更易维护

核心元素：
- <link>：刚体部件
- <joint>：连接两个 link
- <visual>：可视化形状
- <collision>：碰撞检测形状
- <inertial>：惯性参数`,
      whyImportant: '机器人模型是仿真的基础。正确的 URDF/Xacro 模型定义了机器人的物理结构和视觉外观，是仿真、控制、感知等所有功能的起点。',
      codeExamples: [
        {
          language: 'xml',
          code: `<?xml version="1.0"?>
<robot name="my_robot">
  <!-- 基座链接 -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.3 0.1"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 0.8 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.3 0.1"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10"/>
      <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
    </inertial>
  </link>
  
  <!-- 轮子链接 -->
  <link name="left_wheel">
    <visual>
      <geometry>
        <cylinder length="0.05" radius="0.1"/>
      </geometry>
    </visual>
  </link>
  
  <!-- 关节 -->
  <joint name="left_wheel_joint" type="continuous">
    <parent link="base_link"/>
    <child link="left_wheel"/>
    <origin xyz="0 0.2 0" rpy="1.5708 0 0"/>
  </joint>
</robot>`,
          description: '简单 URDF 示例'
        },
        {
          language: 'xml',
          code: `<?xml version="1.0"?>
<robot name="my_robot" xmlns:xacro="http://www.ros.org/wiki/xacro">
  <!-- 定义属性 -->
  <xacro:property name="wheel_radius" value="0.1"/>
  <xacro:property name="wheel_length" value="0.05"/>
  
  <!-- 定义宏 -->
  <xacro:macro name="wheel" params="prefix reflect">
    <link name="\${prefix}_wheel">
      <visual>
        <geometry>
          <cylinder length="\${wheel_length}" radius="\${wheel_radius}"/>
        </geometry>
      </visual>
    </link>
    
    <joint name="\${prefix}_wheel_joint" type="continuous">
      <parent link="base_link"/>
      <child link="\${prefix}_wheel"/>
      <origin xyz="0 \${reflect * 0.2} 0" rpy="1.5708 0 0"/>
    </joint>
  </xacro:macro>
  
  <!-- 使用宏 -->
  <xacro:wheel prefix="left" reflect="1"/>
  <xacro:wheel prefix="right" reflect="-1"/>
</robot>`,
          description: 'Xacro 示例'
        },
        {
          language: 'bash',
          code: `# 检查 URDF 文件
check_urdf my_robot.urdf

# 转换 Xacro 到 URDF
xacro my_robot.urdf.xacro > my_robot.urdf

# 在 RViz 中查看
roslaunch urdf_tutorial display.launch model:=my_robot.urdf`,
          description: 'URDF/Xacro 命令'
        }
      ],
      commonErrors: [
        {
          error: 'Root link does not exist',
          cause: 'URDF 没有根链接',
          solution: '确保所有 link 通过 joint 连接成树结构'
        },
        {
          error: 'Xacro parsing error',
          cause: 'Xacro 语法错误',
          solution: '使用 xacro 工具检查语法'
        }
      ],
      tips: [
        '优先使用 Xacro 编写模型',
        '使用 check_urdf 检查模型正确性',
        'collision 模型可以简化，提高性能',
        '惯性参数对仿真物理效果很重要'
      ],
      practice: [
        '创建一个简单的差速驱动机器人 URDF',
        '使用 Xacro 宏重构模型',
        '在 RViz 和 Gazebo 中加载模型'
      ]
    },
    officialSources: [
      { title: 'URDF 教程', url: 'http://wiki.ros.org/urdf/Tutorials' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['tf-transform', 'rviz', 'gazebo-simulation'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // 仿真
  {
    id: 'gazebo-simulation',
    slug: 'gazebo-simulation',
    title: 'Gazebo 仿真环境配置',
    category: 'simulation',
    tags: ['Gazebo', '仿真', '物理引擎', '环境'],
    summary: '学习 Gazebo 仿真器的配置和使用方法，掌握机器人仿真环境搭建技巧。',
    difficulty: 'intermediate',
    readingTime: 25,
    prerequisites: ['urdf-xacro'],
    content: {
      explanation: `Gazebo 是 ROS 的标准仿真器：
- 3D 物理仿真
- 传感器仿真
- 插件扩展
- 多机器人支持

核心组件：
- 世界文件：环境描述
- 模型文件：物体和机器人
- 插件：传感器、控制器
- 物理引擎：ODE、Bullet 等

常用命令：
- gazebo：启动仿真器
- roslaunch gazebo_ros：ROS 集成启动`,
      whyImportant: '仿真器让开发者在没有物理机器人的情况下测试算法。Gazebo 与 ROS 深度集成，是机器人开发的标准仿真平台。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 启动空世界
roslaunch gazebo_ros empty_world.launch

# 启动带小车的世界
roslaunch turtlebot3_gazebo turtlebot3_world.launch

# 在世界中生成模型
rosrun gazebo_ros spawn_urdf -file my_robot.urdf -urdf -model my_robot

# 直接启动模型
roslaunch my_robot_gazebo my_robot.launch`,
          description: 'Gazebo 启动命令'
        },
        {
          language: 'xml',
          code: `<!-- Gazebo launch 文件 -->
<launch>
  <!-- 启动空世界 -->
  <include file="$(find gazebo_ros)/launch/empty_world.launch">
    <arg name="world_name" value="$(find my_robot)/worlds/my_world.world"/>
    <arg name="paused" value="false"/>
    <arg name="use_sim_time" value="true"/>
    <arg name="gui" value="true"/>
  </include>
  
  <!-- 加载机器人模型到参数服务器 -->
  <param name="robot_description" 
         command="$(find xacro)/xacro $(find my_robot)/urdf/robot.urdf.xacro"/>
  
  <!-- 在 Gazebo 中生成模型 -->
  <node name="spawn_urdf" pkg="gazebo_ros" type="spawn_model"
        args="-urdf -model my_robot -param robot_description"/>
  
  <!-- 发布机器人状态 -->
  <node name="robot_state_publisher" pkg="robot_state_publisher" 
        type="robot_state_publisher"/>
</launch>`,
          description: 'Gazebo launch 文件'
        }
      ],
      commonErrors: [
        {
          error: 'Model not found',
          cause: '模型路径错误或未正确配置',
          solution: '检查 GAZEBO_MODEL_PATH 环境变量'
        },
        {
          error: 'Unable to spawn model',
          cause: 'URDF 格式问题或参数错误',
          solution: '使用 check_urdf 检查模型'
        }
      ],
      tips: [
        '使用 use_sim_time:=true 同步时间',
        '世界文件放在 worlds/ 目录',
        '使用 GUI 添加物体后保存世界文件',
        '传感器插件需要在 URDF 中配置'
      ],
      practice: [
        '创建一个简单的仿真世界',
        '加载自定义机器人模型',
        '添加障碍物和传感器'
      ]
    },
    officialSources: [
      { title: 'Gazebo 文档', url: 'http://gazebosim.org/' },
      { title: 'Gazebo ROS', url: 'http://wiki.ros.org/gazebo_ros' }
    ],
    applicableVersions: ['Gazebo 9 (ROS Melodic)', 'Gazebo 11 (ROS Noetic)'],
    relatedArticles: ['urdf-xacro', 'ros-navigation', 'sensor-integration'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // 导航
  {
    id: 'slam-mapping',
    slug: 'slam-mapping',
    title: 'SLAM 建图详解',
    category: 'navigation',
    tags: ['SLAM', '建图', 'gmapping', 'cartographer', '地图'],
    summary: '学习 SLAM 建图的原理和方法，掌握使用 Gmapping 和 Cartographer 生成地图。',
    difficulty: 'intermediate',
    readingTime: 22,
    prerequisites: ['gazebo-simulation', 'tf-transform'],
    content: {
      explanation: `SLAM（Simultaneous Localization and Mapping）是同时定位与建图技术：
- 使用激光雷达数据
- 构建环境地图
- 同时估计机器人位置

常用算法：
- Gmapping：基于粒子滤波，经典稳定
- Cartographer：Google 开源，精度高
- Hector SLAM：无需里程计

输出地图：
- 栅格地图（.pgm + .yaml）
- 占据网格表示`,
      whyImportant: 'SLAM 是自主导航的基础。没有地图，机器人就无法进行路径规划和导航。理解 SLAM 原理和工具是开发移动机器人的必备技能。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 使用 Gmapping 建图
roslaunch turtlebot3_slam turtlebot3_slam.launch slam_methods:=gmapping

# 使用 Cartographer 建图
roslaunch turtlebot3_slam turtlebot3_slam.launch slam_methods:=cartographer

# 保存地图
rosrun map_server map_saver -f my_map

# 加载地图
rosrun map_server map_server my_map.yaml`,
          description: 'SLAM 命令'
        },
        {
          language: 'xml',
          code: `<!-- Gmapping launch 片段 -->
<node pkg="gmapping" type="slam_gmapping" name="slam_gmapping" output="screen">
  <param name="base_frame" value="base_link"/>
  <param name="odom_frame" value="odom"/>
  <param name="map_update_interval" value="5.0"/>
  <param name="maxUrange" value="10.0"/>
  <param name="maxRange" value="10.0"/>
  <param name="linearUpdate" value="0.5"/>
  <param name="angularUpdate" value="0.5"/>
</node>`,
          description: 'Gmapping 配置'
        }
      ],
      commonErrors: [
        {
          error: 'No transform from map to odom',
          cause: 'TF 树断裂，缺少里程计或激光数据',
          solution: '检查传感器数据和 TF 发布'
        },
        {
          error: 'Map is empty',
          cause: '没有接收到传感器数据',
          solution: '确认话题和 TF 配置正确'
        }
      ],
      tips: [
        '建图时控制速度要慢',
        '避免快速转弯，保持里程计精度',
        '多次扫描同一区域提高精度',
        '建图完成后及时保存'
      ],
      practice: [
        '在仿真环境中使用 Gmapping 建图',
        '手动控制机器人绘制地图',
        '保存并加载地图'
      ]
    },
    officialSources: [
      { title: 'Gmapping', url: 'http://wiki.ros.org/gmapping' },
      { title: 'Cartographer', url: 'https://google-cartographer-ros.readthedocs.io/' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-navigation', 'sensor-integration'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'ros-navigation',
    slug: 'ros-navigation',
    title: 'ROS 导航框架详解',
    category: 'navigation',
    tags: ['导航', 'Navigation', 'move_base', '路径规划'],
    summary: '学习 ROS Navigation 框架的原理和配置方法，实现自主导航功能。',
    difficulty: 'intermediate',
    readingTime: 28,
    prerequisites: ['slam-mapping'],
    content: {
      explanation: `ROS Navigation 框架是移动机器人导航的标准方案：
- move_base：导航核心节点
- 全局规划器：A*、Dijkstra 等算法
- 局部规划器：DWA、TEB 等算法
- costmap：代价地图

核心话题：
- /cmd_vel：速度指令输出
- /odom：里程计输入
- /scan：激光雷达数据
- /map：地图数据

配置文件：
- costmap_common_params.yaml
- global_costmap_params.yaml
- local_costmap_params.yaml
- base_local_planner_params.yaml`,
      whyImportant: '导航框架是机器人自主移动的核心。配置好导航参数，机器人就能从一点移动到另一点，同时避障。这是移动机器人最常用的功能。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 启动导航
roslaunch turtlebot3_navigation turtlebot3_navigation.launch map_file:=$HOME/my_map.yaml

# 发送导航目标（命令行）
rostopic pub /move_base_simple/goal geometry_msgs/PoseStamped \
  "header:
    frame_id: 'map'
  pose:
    position: {x: 1.0, y: 0.0, z: 0.0}
    orientation: {x: 0, y: 0, z: 0, w: 1}"

# 使用 rviz 设置目标点
# 点击 "2D Nav Goal" 按钮在地图上点击`,
          description: '导航命令'
        },
        {
          language: 'yaml',
          code: `# costmap_common_params.yaml
robot_radius: 0.12
inflation_radius: 0.55

observation_sources: scan
scan: {
  sensor_frame: laser,
  data_type: LaserScan,
  topic: /scan,
  marking: true,
  clearing: true
}`,
          description: 'Costmap 配置'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
import actionlib
from move_base_msgs.msg import MoveBaseAction, MoveBaseGoal

def move_to_pose(x, y, w):
    rospy.init_node('navigation_client')
    client = actionlib.SimpleActionClient('move_base', MoveBaseAction)
    client.wait_for_server()
    
    goal = MoveBaseGoal()
    goal.target_pose.header.frame_id = "map"
    goal.target_pose.header.stamp = rospy.Time.now()
    goal.target_pose.pose.position.x = x
    goal.target_pose.pose.position.y = y
    goal.target_pose.pose.orientation.w = w
    
    client.send_goal(goal)
    client.wait_for_result()
    return client.get_state()`,
          description: 'Python 导航代码'
        }
      ],
      commonErrors: [
        {
          error: 'Path planning failed',
          cause: '目标点不可达或路径被阻挡',
          solution: '检查地图和代价地图配置'
        },
        {
          error: 'Aborted because no valid plan found',
          cause: '全局规划器无法找到路径',
          solution: '确认起点和终点都在自由空间'
        }
      ],
      tips: [
        '调整 inflation_radius 影响避障距离',
        'DWA 参数需要根据机器人调整',
        '观察 costmap 可视化帮助调试',
        '使用 rviz 的 2D Nav Goal 发送目标'
      ],
      practice: [
        '配置导航参数文件',
        '发送导航目标并观察执行',
        '调整参数改善导航效果'
      ]
    },
    officialSources: [
      { title: 'Navigation 框架', url: 'http://wiki.ros.org/navigation' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['slam-mapping', 'moveit-manipulation'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // 机械臂
  {
    id: 'moveit-manipulation',
    slug: 'moveit-manipulation',
    title: 'MoveIt 机械臂运动规划',
    category: 'manipulation',
    tags: ['MoveIt', '机械臂', '运动规划', '轨迹'],
    summary: '学习 MoveIt 框架的原理和配置方法，实现机械臂运动规划和控制。',
    difficulty: 'advanced',
    readingTime: 30,
    prerequisites: ['urdf-xacro', 'tf-transform'],
    content: {
      explanation: `MoveIt 是 ROS 的机械臂运动规划框架：
- 运动规划：路径计算
- 运动学求解：正逆运动学
- 碰撞检测：安全运动
- 轨迹执行：控制执行

核心组件：
- move_group：规划组
- Planning Pipeline：规划管道
- Motion Planning：运动规划
- Trajectory Execution：轨迹执行

支持的规划器：
- OMPL（Open Motion Planning Library）
- MoveIt 默认规划器`,
      whyImportant: 'MoveIt 是机械臂开发的标准框架。从工业机械臂到服务机器人手臂，MoveIt 提供了完整的运动规划解决方案，大大简化了机械臂开发。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 启动 MoveIt 演示
roslaunch panda_moveit_config demo.launch

# 启动带真机的 MoveIt
roslaunch my_robot_moveit_config moveit_planning_execution.launch

# 使用 MoveIt 命令行接口
rosrun moveit_commander moveit_commander_cmdline.py`,
          description: 'MoveIt 启动命令'
        },
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import sys
import rospy
import moveit_commander
import geometry_msgs.msg

# 初始化
moveit_commander.roscpp_initialize(sys.argv)
rospy.init_node('move_group_python_interface')
group_name = "panda_arm"
move_group = moveit_commander.MoveGroupCommander(group_name)

# 获取当前位置
pose = move_group.get_current_pose()
print(f"Current pose: {pose}")

# 设置目标位置
target_pose = geometry_msgs.msg.Pose()
target_pose.position.x = 0.5
target_pose.position.y = 0.0
target_pose.position.z = 0.5
target_pose.orientation.w = 1.0
move_group.set_pose_target(target_pose)

# 规划并执行
plan = move_group.plan()
move_group.execute(plan, wait=True)

# 关闭
moveit_commander.roscpp_shutdown()`,
          description: 'Python MoveIt 代码'
        }
      ],
      commonErrors: [
        {
          error: 'Failed to find solution',
          cause: '目标不可达或碰撞',
          solution: '检查目标位置是否在工作空间内'
        },
        {
          error: 'IK solver failed',
          cause: '逆运动学无解',
          solution: '调整目标姿态或位置'
        }
      ],
      tips: [
        '使用 RViz MotionPlanning 插件可视化调试',
        '调整 planning_time 增加规划时间',
        '使用 set_max_velocity_scaling_factor 控制速度',
        '配置 SRDF 文件定义规划组'
      ],
      practice: [
        '使用 MoveIt Setup Assistant 配置机械臂',
        '编写 Python 脚本控制机械臂运动',
        '实现避障运动'
      ]
    },
    officialSources: [
      { title: 'MoveIt 教程', url: 'https://ros-planning.github.io/moveit_tutorials/' }
    ],
    applicableVersions: ['ROS Melodic (MoveIt1)', 'ROS Noetic (MoveIt1)'],
    relatedArticles: ['urdf-xacro', 'ros-control'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'ros-control',
    slug: 'ros-control',
    title: 'ros_control 控制框架',
    category: 'manipulation',
    tags: ['ros_control', '控制器', 'PID', '硬件接口'],
    summary: '学习 ros_control 控制框架的架构和配置方法，实现机器人控制。',
    difficulty: 'advanced',
    readingTime: 25,
    prerequisites: ['gazebo-simulation', 'urdf-xacro'],
    content: {
      explanation: `ros_control 是 ROS 的控制框架：
- 硬件抽象层
- 控制器管理
- 控制回路执行

核心组件：
- Hardware Interface：硬件接口
- Controller Manager：控制器管理
- Controller：具体控制器实现
- Joint State Interface：关节状态接口

控制器类型：
- joint_state_controller：发布关节状态
- joint_trajectory_controller：轨迹控制
- diff_drive_controller：差速控制
- effort_controllers：力矩控制`,
      whyImportant: 'ros_control 提供了统一的控制接口，让同一套代码可以在仿真和真机上运行。理解 ros_control 是开发机器人控制系统的关键。',
      codeExamples: [
        {
          language: 'yaml',
          code: `# 控制器配置
mobile_base_controller:
  type: "diff_drive_controller/DiffDriveController"
  left_wheel: 'left_wheel_joint'
  right_wheel: 'right_wheel_joint'
  publish_rate: 50.0
  pose_covariance_diagonal: [0.001, 0.001, 1000000.0, 1000000.0, 1000000.0, 0.03]
  twist_covariance_diagonal: [0.001, 0.001, 0.001, 1000000.0, 1000000.0, 0.03]
  wheel_radius: 0.1
  wheel_separation: 0.4

  # 速度和加速度限制
  linear:
    x:
      has_velocity_limits: true
      max_velocity: 1.0
      has_acceleration_limits: true
      max_acceleration: 0.5
  angular:
    z:
      has_velocity_limits: true
      max_velocity: 2.0
      has_acceleration_limits: true
      max_acceleration: 1.0`,
          description: '差速控制器配置'
        },
        {
          language: 'bash',
          code: `# 加载控制器配置
rosservice call /controller_manager/load_controller "name: 'mobile_base_controller'"

# 启动控制器
rosservice call /controller_manager/switch_controller "{start_controllers: ['mobile_base_controller'], stop_controllers: [], strictness: 2}"

# 查看控制器状态
rosservice call /controller_manager/list_controllers`,
          description: '控制器管理命令'
        }
      ],
      commonErrors: [
        {
          error: 'Controller not found',
          cause: '控制器未加载或配置错误',
          solution: '检查控制器配置和加载状态'
        },
        {
          error: 'Failed to initialize',
          cause: '硬件接口配置问题',
          solution: '检查 URDF 中的 transmission 配置'
        }
      ],
      tips: [
        'URDF 中必须配置 transmission 标签',
        '使用 Gazebo 插件 ros_control 连接仿真',
        'joint_state_controller 是必需的',
        '调试时先用 position_controllers 测试'
      ],
      practice: [
        '配置差速驱动控制器',
        '在 Gazebo 中测试控制',
        '编写控制器启动脚本'
      ]
    },
    officialSources: [
      { title: 'ros_control 文档', url: 'http://wiki.ros.org/ros_control' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['gazebo-simulation', 'moveit-manipulation'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // 视觉
  {
    id: 'cv-bridge',
    slug: 'cv-bridge',
    title: 'cv_bridge 图像处理接口',
    category: 'vision',
    tags: ['cv_bridge', 'OpenCV', '图像', '摄像头'],
    summary: '学习使用 cv_bridge 在 ROS 和 OpenCV 之间转换图像格式，实现视觉处理。',
    difficulty: 'intermediate',
    readingTime: 18,
    prerequisites: ['ros-topic', 'sensor-integration'],
    content: {
      explanation: `cv_bridge 是 ROS 图像和 OpenCV 格式之间的转换桥梁：
- 将 sensor_msgs/Image 转换为 OpenCV Mat
- 将 OpenCV Mat 转换为 ROS 消息
- 支持多种编码格式

ROS 图像格式：
- sensor_msgs/Image：原始图像
- sensor_msgs/CompressedImage：压缩图像

常用编码：
- rgb8：RGB 24位
- bgr8：BGR 24位（OpenCV 默认）
- mono8：灰度图
- 16UC1：深度图`,
      whyImportant: 'OpenCV 是最流行的视觉库，cv_bridge 让你可以在 ROS 中使用 OpenCV 进行图像处理。这是机器人视觉开发的基础接口。',
      codeExamples: [
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy
import cv2
from sensor_msgs.msg import Image
from cv_bridge import CvBridge

class ImageProcessor:
    def __init__(self):
        rospy.init_node('image_processor')
        self.bridge = CvBridge()
        
        # 订阅图像话题
        self.image_sub = rospy.Subscriber(
            '/camera/image_raw', Image, self.image_callback)
        
        # 发布处理后的图像
        self.image_pub = rospy.Publisher(
            '/camera/processed', Image, queue_size=10)
    
    def image_callback(self, msg):
        try:
            # ROS 图像转 OpenCV
            cv_image = self.bridge.imgmsg_to_cv2(msg, 'bgr8')
            
            # OpenCV 处理
            gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
            edges = cv2.Canny(gray, 100, 200)
            
            # OpenCV 图像转 ROS
            processed_msg = self.bridge.cv2_to_imgmsg(edges, 'mono8')
            self.image_pub.publish(processed_msg)
            
        except Exception as e:
            rospy.logerr(f"Error: {e}")

if __name__ == '__main__':
    processor = ImageProcessor()
    rospy.spin()`,
          description: 'Python cv_bridge 示例'
        },
        {
          language: 'bash',
          code: `# 查看图像话题
rostopic list | grep image
rostopic info /camera/image_raw

# 发布测试图像
rosrun image_publisher image_publisher __image:=/test/image test.png

# 使用 rqt 查看图像
rqt_image_view /camera/image_raw`,
          description: '图像话题命令'
        }
      ],
      commonErrors: [
        {
          error: 'Image encoding mismatch',
          cause: '编码格式不匹配',
          solution: '确认图像编码格式，使用正确的转换参数'
        },
        {
          error: 'Failed to convert image',
          cause: '图像数据损坏或格式问题',
          solution: '检查图像话题数据是否正常'
        }
      ],
      tips: [
        '使用 cv_bridge.CvBridgeError 捕获转换异常',
        '深度图使用 passthrough 编码',
        '处理时注意图像尺寸和帧率',
        '可以用 cv2.imshow() 调试（需要 cv2.waitKey）'
      ],
      practice: [
        '编写图像订阅和处理节点',
        '实现边缘检测并发布结果',
        '处理深度摄像头数据'
      ]
    },
    officialSources: [
      { title: 'cv_bridge 文档', url: 'http://wiki.ros.org/cv_bridge' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['sensor-integration', 'rviz'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // 调试与迁移
  {
    id: 'ros-debugging',
    slug: 'ros-debugging',
    title: 'ROS 调试技巧与方法',
    category: 'debug-migration',
    tags: ['调试', 'Debug', '日志', '性能分析'],
    summary: '学习 ROS 程序的调试方法和技巧，掌握常见问题的排查流程。',
    difficulty: 'intermediate',
    readingTime: 20,
    prerequisites: ['ros-node', 'ros-topic'],
    content: {
      explanation: `ROS 调试的常用方法：

日志系统：
- DEBUG、INFO、WARN、ERROR、FATAL
- rospy.loginfo()、ROS_INFO()
- rosconsole 配置

调试工具：
- rqt_console：日志查看
- rqt_logger_level：日志级别调整
- rqt_graph：节点关系可视化
- rqt_plot：数据曲线
- roswtf：系统检查

性能分析：
- rosprofiler
- time 命令
- top/htop`,
      whyImportant: '调试是开发过程中不可避免的环节。掌握调试技巧能快速定位问题，提高开发效率。',
      codeExamples: [
        {
          language: 'python',
          code: `#!/usr/bin/env python3
import rospy

rospy.init_node('debug_example')

# 不同级别日志
rospy.logdebug("Debug message - detailed info")
rospy.loginfo("Info message - normal operation")
rospy.logwarn("Warning message - potential issue")
rospy.logerr("Error message - something wrong")
rospy.logfatal("Fatal message - critical error")

# 节点信息
rospy.loginfo(f"Node name: {rospy.get_name()}")
rospy.loginfo(f"Namespace: {rospy.get_namespace()}")`,
          description: 'Python 日志代码'
        },
        {
          language: 'bash',
          code: `# 设置日志级别
rosservice call /node_name/set_logger_level "{logger: 'ros', level: 'debug'}"

# 查看日志
rqt_console

# 系统检查
roswtf

# 查看节点资源使用
top -p $(pgrep -d',' -f ros)`,
          description: '调试命令'
        },
        {
          language: 'bash',
          code: `# 查看话题频率
rostopic hz /cmd_vel

# 查看话题带宽
rostopic bw /camera/image_raw

# 查看消息内容
rostopic echo /odom -n 1

# 查看节点信息
rosnode info /move_base

# 测试节点通信
rosnode ping /my_node`,
          description: '诊断命令'
        }
      ],
      commonErrors: [
        {
          error: 'Node crashed',
          cause: '代码异常或内存问题',
          solution: '查看 roslaunch 输出和 rosout 日志'
        },
        {
          error: 'High CPU usage',
          cause: '死循环或频繁操作',
          solution: '使用 top 分析，检查循环频率'
        }
      ],
      tips: [
        '使用 rospy.logdebug() 记录详细信息',
        'rqt_console 可以过滤和搜索日志',
        'roswtf 可以发现常见配置问题',
        '使用 try-except 捕获异常并记录'
      ],
      practice: [
        '使用 roswtf 检查系统问题',
        '在代码中添加适当的日志',
        '使用 rqt_console 分析日志'
      ]
    },
    officialSources: [
      { title: 'ROS 调试', url: 'http://wiki.ros.org/ROS/Debugging' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-node', 'rqt-tools'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: 'ros1-to-ros2',
    slug: 'ros1-to-ros2',
    title: 'ROS1 到 ROS2 迁移指南',
    category: 'debug-migration',
    tags: ['ROS2', '迁移', 'ROS1', '升级'],
    summary: '学习从 ROS1 迁移到 ROS2 的方法和注意事项，了解两个版本的主要差异。',
    difficulty: 'advanced',
    readingTime: 25,
    prerequisites: ['ros-architecture'],
    content: {
      explanation: `ROS2 是 ROS 的新版本，主要改进：
- 实时性支持
- 多机器人系统
- 商业级可靠性
- 跨平台支持

主要差异：
- 构建系统：catkin → colcon
- 初始化：ros::init → rclcpp::init
- 节点：ros::NodeHandle → rclcpp::Node
- 话题：Publisher/Subscriber API 变化
- 服务：Service API 变化
- Launch：XML → Python

ROS2 版本：
- Foxy Fitzroy（Ubuntu 20.04）
- Humble Hawksbill（Ubuntu 22.04）
- Iron Irwini`,
      whyImportant: 'ROS2 是未来趋势。新项目建议直接使用 ROS2，老项目也需要了解迁移方案。理解两版本差异有助于平滑过渡。',
      codeExamples: [
        {
          language: 'python',
          code: `# ROS1 Python
#!/usr/bin/env python
import rospy
from std_msgs.msg import String

def callback(msg):
    rospy.loginfo("I heard %s", msg.data)

rospy.init_node('listener')
rospy.Subscriber('chatter', String, callback)
rospy.spin()`,
          description: 'ROS1 订阅者'
        },
        {
          language: 'python',
          code: `# ROS2 Python
#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Listener(Node):
    def __init__(self):
        super().__init__('listener')
        self.subscription = self.create_subscription(
            String, 'chatter', self.callback, 10)
    
    def callback(self, msg):
        self.get_logger().info('I heard "%s"' % msg.data)

def main():
    rclpy.init()
    listener = Listener()
    rclpy.spin(listener)
    listener.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()`,
          description: 'ROS2 订阅者'
        },
        {
          language: 'bash',
          code: `# ROS1 命令
roscore
rosrun my_package my_node

# ROS2 命令
# 不需要 roscore
ros2 run my_package my_node

# ROS2 命令对比
# rostopic list → ros2 topic list
# rosservice list → ros2 service list
# rosnode list → ros2 node list
# roslaunch → ros2 launch`,
          description: 'ROS1 vs ROS2 命令'
        }
      ],
      commonErrors: [
        {
          error: 'Module not found: rclpy',
          cause: 'ROS2 未正确安装',
          solution: '安装 ROS2 并配置环境'
        },
        {
          error: 'ROS_MASTER_URI not set',
          cause: 'ROS1 环境变量冲突',
          solution: '确保 ROS1 和 ROS2 环境分离'
        }
      ],
      tips: [
        '新项目直接使用 ROS2',
        '可以使用 ros1_bridge 桥接通信',
        '先学习 ROS1 理解概念，再迁移 ROS2',
        'ROS2 文档：https://docs.ros.org/'
      ],
      practice: [
        '安装 ROS2 并运行示例节点',
        '对比 ROS1 和 ROS2 的代码差异',
        '使用 ros1_bridge 桥接通信'
      ]
    },
    officialSources: [
      { title: 'ROS2 文档', url: 'https://docs.ros.org/en/humble/' },
      { title: '迁移指南', url: 'https://docs.ros.org/en/rolling/How-To-Guides/Migrating-from-ROS1.html' }
    ],
    applicableVersions: ['ROS2 Foxy', 'ROS2 Humble', 'ROS2 Iron'],
    relatedArticles: ['ros-architecture', 'ros-node'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // 传感器
  {
    id: 'sensor-integration',
    slug: 'sensor-integration',
    title: 'ROS 传感器集成',
    category: 'tools',
    tags: ['传感器', '激光雷达', 'IMU', '摄像头'],
    summary: '学习常用传感器的 ROS 集成方法，包括激光雷达、IMU、摄像头等。',
    difficulty: 'intermediate',
    readingTime: 20,
    prerequisites: ['ros-topic', 'ros-message'],
    content: {
      explanation: `常用传感器类型：

激光雷达：
- 输出：sensor_msgs/LaserScan
- 品牌：RPLidar、Hokuyo、SICK

IMU：
- 输出：sensor_msgs/Imu
- 品牌：Xsens、Phidgets

摄像头：
- 输出：sensor_msgs/Image
- 驱动：usb_cam、uvc_camera

深度相机：
- 输出：RGB + Depth
- 品牌：Kinect、RealSense、Orbbec

编码器：
- 输出：里程计
- 接口：串口、GPIO`,
      whyImportant: '传感器是机器人感知世界的眼睛。正确集成和配置传感器是机器人系统的基础工作。',
      codeExamples: [
        {
          language: 'bash',
          code: `# RPLidar 启动
roslaunch rplidar_ros rplidar.launch

# 查看激光数据
rostopic echo /scan
rostopic hz /scan

# USB 摄像头启动
roslaunch usb_cam usb_cam-test.launch

# RealSense 启动
roslaunch realsense2_camera rs_camera.launch`,
          description: '传感器驱动启动'
        },
        {
          language: 'xml',
          code: `<!-- Gazebo 传感器插件 -->
<gazebo reference="laser_link">
  <sensor type="ray" name="laser">
    <pose>0 0 0.05 0 0 0</pose>
    <visualize>true</visualize>
    <update_rate>10</update_rate>
    <ray>
      <scan>
        <horizontal>
          <samples>360</samples>
          <resolution>1</resolution>
          <min_angle>-3.14159</min_angle>
          <max_angle>3.14159</max_angle>
        </horizontal>
      </scan>
      <range>
        <min>0.1</min>
        <max>10.0</max>
        <resolution>0.01</resolution>
      </range>
    </ray>
    <plugin name="laser_plugin" filename="libgazebo_ros_laser.so">
      <topicName>/scan</topicName>
      <frameName>laser_link</frameName>
    </plugin>
  </sensor>
</gazebo>`,
          description: 'Gazebo 传感器配置'
        }
      ],
      commonErrors: [
        {
          error: 'No scan data',
          cause: '传感器未连接或驱动问题',
          solution: '检查设备连接和权限'
        },
        {
          error: 'Permission denied',
          cause: 'USB 设备权限不足',
          solution: '添加 udev 规则或使用 sudo'
        }
      ],
      tips: [
        '使用 udev 规则固定设备名',
        '检查传感器帧率和数据质量',
        'Gazebo 仿真可以模拟传感器',
        '标定传感器提高精度'
      ],
      practice: [
        '配置并启动激光雷达驱动',
        '在 RViz 中可视化传感器数据',
        '在 Gazebo 中添加传感器模型'
      ]
    },
    officialSources: [
      { title: '传感器驱动', url: 'http://wiki.ros.org/Sensors' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['ros-message', 'rviz', 'slam-mapping'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  
  // RViz
  {
    id: 'rviz',
    slug: 'rviz',
    title: 'RViz 可视化工具详解',
    category: 'tools',
    tags: ['RViz', '可视化', '3D', '调试'],
    summary: '学习 RViz 可视化工具的使用方法，掌握机器人数据可视化技巧。',
    difficulty: 'beginner',
    readingTime: 18,
    prerequisites: ['ros-topic', 'tf-transform'],
    content: {
      explanation: `RViz 是 ROS 的 3D 可视化工具：
- 显示机器人模型
- 可视化传感器数据
- 查看地图和路径
- 交互式操作

常用显示类型：
- RobotModel：机器人模型
- LaserScan：激光数据
- PointCloud2：点云
- Image：图像
- Map：地图
- Path：路径
- TF：坐标变换

配置保存：
- .rviz 配置文件
- Launch 文件加载`,
      whyImportant: 'RViz 是开发和调试的必备工具。通过可视化直观了解机器人状态和数据，快速发现问题和验证算法效果。',
      codeExamples: [
        {
          language: 'bash',
          code: `# 启动 RViz
rosrun rviz rviz

# 加载配置文件
rosrun rviz rviz -d my_config.rviz

# 通过 launch 启动
roslaunch my_package rviz.launch`,
          description: 'RViz 启动命令'
        },
        {
          language: 'xml',
          code: `<!-- RViz launch 配置 -->
<launch>
  <node name="rviz" pkg="rviz" type="rviz" 
        args="-d $(find my_package)/rviz/my_config.rviz"/>
</launch>`,
          description: 'Launch 文件启动 RViz'
        },
        {
          language: 'bash',
          code: `# RViz 快捷键
# - 鼠标左键拖动：旋转视角
# - 鼠标右键拖动：缩放
# - 中键拖动：平移
# - Shift+左键：选择物体
# - F：聚焦到选中物体
# - r：重置视角`,
          description: 'RViz 操作技巧'
        }
      ],
      commonErrors: [
        {
          error: 'Fixed Frame does not exist',
          cause: 'TF 中没有该坐标系',
          solution: '检查 TF 树，确认正确的 frame_id'
        },
        {
          error: 'No data received',
          cause: '话题未发布或名称错误',
          solution: '使用 rostopic list 检查话题'
        }
      ],
      tips: [
        '保存常用 RViz 配置',
        '使用 Add 按钮添加显示项',
        '话题名称可以直接输入',
        '使用 2D Nav Goal 发送导航目标'
      ],
      practice: [
        '创建 RViz 配置文件',
        '添加并配置各种显示项',
        '通过 RViz 发送导航目标'
      ]
    },
    officialSources: [
      { title: 'RViz 用户指南', url: 'http://wiki.ros.org/rviz/UserGuide' }
    ],
    applicableVersions: ['ROS Melodic', 'ROS Noetic'],
    relatedArticles: ['tf-transform', 'ros-navigation', 'gazebo-simulation'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];

// 按分类获取文章
export function getArticlesByCategory(category: string): KnowledgeArticle[] {
  return knowledgeArticles.filter(a => a.category === category);
}

// 搜索文章
export function searchArticles(query: string): KnowledgeArticle[] {
  const lowerQuery = query.toLowerCase();
  return knowledgeArticles.filter(a => 
    a.title.toLowerCase().includes(lowerQuery) ||
    a.summary.toLowerCase().includes(lowerQuery) ||
    a.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
}

// 获取文章
export function getArticleBySlug(slug: string): KnowledgeArticle | undefined {
  return knowledgeArticles.find(a => a.slug === slug);
}

// 获取推荐文章
export function getRecommendedArticles(currentSlug: string, limit: number = 3): KnowledgeArticle[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];
  
  return knowledgeArticles
    .filter(a => a.slug !== currentSlug && 
      (a.category === current.category || 
       current.relatedArticles.includes(a.slug)))
    .slice(0, limit);
}