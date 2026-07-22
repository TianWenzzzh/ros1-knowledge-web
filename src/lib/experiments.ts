import type { Experiment } from './types';

export const experiments: Experiment[] = [
  {
    id: 'exp-turtlesim',
    slug: 'turtlesim',
    title: '小海龟入门实验',
    category: 'ROS基础',
    difficulty: 'beginner',
    duration: 30,
    prerequisites: ['已完成 ROS 安装', '熟悉基本终端操作'],
    objectives: ['理解节点和话题的基本概念', '掌握 rostopic 命令使用', '学会发布和订阅话题'],
    steps: [
      {
        title: '启动 ROS 系统',
        description: '首先启动 roscore，这是 ROS 的核心服务。',
        commands: ['roscore']
      },
      {
        title: '启动小海龟节点',
        description: '在新终端中启动小海龟仿真器和键盘控制节点。',
        commands: [
          'rosrun turtlesim turtlesim_node',
          'rosrun turtlesim turtle_teleop_key'
        ],
        tips: ['使用方向键控制海龟移动', '确保终端窗口是激活状态']
      },
      {
        title: '观察话题通信',
        description: '使用 rostopic 命令观察话题数据。',
        commands: [
          'rostopic list',
          'rostopic echo /turtle1/pose',
          'rostopic hz /turtle1/pose'
        ]
      },
      {
        title: '手动发布话题',
        description: '使用 rostopic pub 命令控制海龟移动。',
        commands: [
          'rostopic pub /turtle1/cmd_vel geometry_msgs/Twist "linear:\\n  x: 2.0\\nangular:\\n  z: 1.8" -1'
        ]
      }
    ],
    verificationCommands: ['rostopic list', 'rosnode list'],
    expectedResults: ['看到 /turtle1/cmd_vel 和 /turtle1/pose 等话题', '看到 /turtlesim 和 /teleop_turtle 节点'],
    commonErrors: [
      { error: 'Unable to contact master', cause: 'roscore 未运行', solution: '先在新终端启动 roscore' },
      { error: 'Topic not found', cause: '节点未启动', solution: '确认 turtlesim_node 已运行' }
    ],
    nextSteps: ['尝试让海龟画圆', '使用 rqt_graph 查看节点关系', '编写 Python 节点控制海龟']
  },
  {
    id: 'exp-topic-service',
    slug: 'topic-service',
    title: '话题与服务通信实验',
    category: '通信机制',
    difficulty: 'beginner',
    duration: 45,
    prerequisites: ['完成小海龟实验', '了解 Python 基础'],
    objectives: ['理解发布-订阅模式', '理解请求-响应模式', '编写简单的发布者和订阅者'],
    steps: [
      {
        title: '创建包',
        description: '创建一个新的 ROS 包用于存放代码。',
        commands: [
          'cd ~/catkin_ws/src',
          'catkin_create_pkg my_communication std_msgs rospy',
          'cd ~/catkin_ws && catkin_make'
        ]
      },
      {
        title: '编写发布者节点',
        description: '创建一个简单的发布者，持续发布消息。',
        commands: ['mkdir -p ~/catkin_ws/src/my_communication/scripts']
        // 代码需要单独创建文件
      },
      {
        title: '编写订阅者节点',
        description: '创建订阅者接收并打印消息。'
      },
      {
        title: '测试运行',
        description: '运行发布者和订阅者，观察通信效果。',
        commands: [
          'roscore &',
          'rosrun my_communication publisher.py',
          'rosrun my_communication subscriber.py'
        ]
      }
    ],
    verificationCommands: ['rostopic echo /chatter', 'rostopic hz /chatter'],
    expectedResults: ['看到消息持续发布', '订阅者正确接收消息'],
    commonErrors: [
      { error: 'Module not found', cause: 'Python 路径问题', solution: 'chmod +x 添加执行权限，检查环境变量' }
    ],
    nextSteps: ['添加自定义消息类型', '创建服务端和客户端', '使用 launch 文件启动']
  },
  {
    id: 'exp-custom-package',
    slug: 'custom-package',
    title: '自定义 ROS 包实验',
    category: 'ROS基础',
    difficulty: 'intermediate',
    duration: 60,
    prerequisites: ['完成话题服务实验', '了解 CMake 基础'],
    objectives: ['创建完整的 ROS 包结构', '编写 C++ 节点', '配置 CMakeLists.txt'],
    steps: [
      {
        title: '创建包结构',
        description: '创建包并设置目录结构。',
        commands: [
          'cd ~/catkin_ws/src',
          'catkin_create_pkg my_robot rospy roscpp std_msgs'
        ]
      },
      {
        title: '编写 C++ 节点',
        description: '创建 src/my_node.cpp 文件。'
      },
      {
        title: '配置编译',
        description: '修改 CMakeLists.txt 添加编译规则。'
      },
      {
        title: '编译运行',
        description: '编译并运行节点。',
        commands: ['cd ~/catkin_ws && catkin_make', 'rosrun my_robot my_node']
      }
    ],
    verificationCommands: ['rosrun my_robot my_node'],
    expectedResults: ['节点正常运行并输出信息'],
    commonErrors: [
      { error: 'undefined reference', cause: '编译配置错误', solution: '检查 CMakeLists.txt 中的依赖和链接' }
    ],
    nextSteps: ['添加参数配置', '创建 launch 文件', '添加单元测试']
  },
  {
    id: 'exp-tf-urdf',
    slug: 'tf-urdf',
    title: 'TF 和 URDF 模型实验',
    category: '坐标与模型',
    difficulty: 'intermediate',
    duration: 90,
    prerequisites: ['完成自定义包实验', '了解 XML 基础'],
    objectives: ['理解 TF 坐标变换', '创建简单的 URDF 模型', '使用 robot_state_publisher'],
    steps: [
      {
        title: '创建 URDF 文件',
        description: '创建一个简单的两轮机器人模型。'
      },
      {
        title: '检查模型',
        description: '使用 check_urdf 检查模型正确性。',
        commands: ['check_urdf my_robot.urdf']
      },
      {
        title: '在 RViz 中查看',
        description: '使用 robot_state_publisher 显示模型。',
        commands: [
          'roscore',
          'rosparam set robot_description -t my_robot.urdf',
          'rosrun robot_state_publisher robot_state_publisher',
          'rosrun rviz rviz'
        ]
      },
      {
        title: '添加 TF 广播',
        description: '编写节点广播 TF 变换。'
      }
    ],
    verificationCommands: ['rqt_tf_tree', 'rosrun tf tf_echo base_link odom'],
    expectedResults: ['TF 树结构正确', 'RViz 中显示正确的机器人模型'],
    commonErrors: [
      { error: 'Root link does not exist', cause: 'URDF 结构问题', solution: '检查 link 和 joint 连接关系' }
    ],
    nextSteps: ['使用 Xacro 重构模型', '添加 Gazebo 属性', '创建复杂机器人模型']
  },
  {
    id: 'exp-gazebo',
    slug: 'gazebo',
    title: 'Gazebo 仿真实验',
    category: '仿真',
    difficulty: 'intermediate',
    duration: 120,
    prerequisites: ['完成 TF/URDF 实验', '了解物理仿真概念'],
    objectives: ['配置 Gazebo 仿真环境', '加载机器人模型', '添加传感器插件'],
    steps: [
      {
        title: '创建 Gazebo 包',
        description: '创建仿真相关的包结构。'
      },
      {
        title: '配置 URDF',
        description: '在 URDF 中添加 Gazebo 属性和传感器插件。'
      },
      {
        title: '创建 Launch 文件',
        description: '编写启动仿真的 launch 文件。'
      },
      {
        title: '启动仿真',
        description: '运行仿真并测试。',
        commands: ['roslaunch my_robot_gazebo my_robot.launch']
      }
    ],
    verificationCommands: ['rostopic list | grep scan', 'rostopic echo /odom'],
    expectedResults: ['Gazebo 窗口显示机器人', '传感器话题正常发布数据'],
    commonErrors: [
      { error: 'Model not found', cause: '模型路径错误', solution: '检查 GAZEBO_MODEL_PATH 配置' }
    ],
    nextSteps: ['添加差速控制器', '配置导航功能', '创建自定义世界']
  },
  {
    id: 'exp-slam',
    slug: 'slam',
    title: 'SLAM 建图实验',
    category: '导航',
    difficulty: 'intermediate',
    duration: 90,
    prerequisites: ['完成 Gazebo 实验', '了解 SLAM 概念'],
    objectives: ['使用 Gmapping 建图', '手动控制机器人', '保存和加载地图'],
    steps: [
      {
        title: '启动仿真环境',
        description: '启动带机器人的仿真世界。',
        commands: ['roslaunch turtlebot3_gazebo turtlebot3_world.launch']
      },
      {
        title: '启动 SLAM',
        description: '启动 Gmapping 建图节点。',
        commands: ['roslaunch turtlebot3_slam turtlebot3_slam.launch slam_methods:=gmapping']
      },
      {
        title: '控制建图',
        description: '使用键盘控制机器人在环境中移动，构建地图。',
        commands: ['roslaunch turtlebot3_teleop turtlebot3_teleop_key.launch']
      },
      {
        title: '保存地图',
        description: '建图完成后保存地图文件。',
        commands: ['rosrun map_server map_saver -f my_map']
      }
    ],
    verificationCommands: ['rostopic list | grep map', 'rosrun map_server map_server my_map.yaml'],
    expectedResults: ['RViz 中显示完整地图', '地图文件保存成功'],
    commonErrors: [
      { error: 'No transform from map', cause: 'TF 树问题', solution: '检查机器人状态发布' }
    ],
    nextSteps: ['使用 Cartographer 建图', '尝试导航功能', '多房间建图']
  },
  {
    id: 'exp-navigation',
    slug: 'navigation',
    title: '导航功能实验',
    category: '导航',
    difficulty: 'intermediate',
    duration: 120,
    prerequisites: ['完成 SLAM 实验', '了解路径规划'],
    objectives: ['配置导航参数', '实现自主导航', '调试避障功能'],
    steps: [
      {
        title: '加载地图',
        description: '启动导航并加载之前保存的地图。',
        commands: ['roslaunch turtlebot3_navigation turtlebot3_navigation.launch map_file:=$HOME/my_map.yaml']
      },
      {
        title: '初始定位',
        description: '使用 2D Pose Estimate 设置初始位置。'
      },
      {
        title: '发送导航目标',
        description: '使用 2D Nav Goal 发送目标点，观察导航过程。'
      },
      {
        title: '调整参数',
        description: '根据导航效果调整 costmap 和规划器参数。'
      }
    ],
    verificationCommands: ['rostopic echo /move_base/status'],
    expectedResults: ['机器人能够自主导航到目标点', '能够避开障碍物'],
    commonErrors: [
      { error: 'Path planning failed', cause: '目标不可达或参数问题', solution: '检查目标位置和 costmap 配置' }
    ],
    nextSteps: ['添加新的目标点', '调整速度参数', '实现多点导航']
  },
  {
    id: 'exp-integration',
    slug: 'integration',
    title: '综合项目实验',
    category: '综合应用',
    difficulty: 'advanced',
    duration: 180,
    prerequisites: ['完成所有基础实验', '能够独立编写节点'],
    objectives: ['整合所有学习内容', '完成完整的机器人应用', '调试和优化系统'],
    steps: [
      {
        title: '项目规划',
        description: '确定项目目标：例如自主巡逻机器人。'
      },
      {
        title: '创建包结构',
        description: '规划并创建所需的包。'
      },
      {
        title: '实现核心功能',
        description: '编写导航、状态机等核心节点。'
      },
      {
        title: '集成测试',
        description: '集成所有功能并测试。'
      },
      {
        title: '优化完善',
        description: '优化性能，处理边界情况。'
      }
    ],
    verificationCommands: ['roslaunch my_patrol_robot patrol.launch'],
    expectedResults: ['机器人能够自主巡逻', '遇到障碍物能够避障'],
    commonErrors: [
      { error: '各种集成问题', cause: '系统复杂性', solution: '逐步调试，日志分析' }
    ],
    nextSteps: ['添加更多功能', '迁移到真机测试', '分享项目经验']
  }
];