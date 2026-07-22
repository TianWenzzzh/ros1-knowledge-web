import type { CommandReference } from './types';

export const commandReferences: CommandReference[] = [
  // ROS 核心命令
  {
    id: 'cmd-roscore',
    command: 'roscore',
    description: '启动 ROS 主节点服务',
    category: 'ROS 核心',
    usage: '在终端中运行 roscore，会启动 ROS Master、rosout 日志节点和参数服务器',
    prerequisites: ['已安装 ROS Noetic', 'source /opt/ros/noetic/setup.bash'],
    tags: ['master', '节点', '启动'],
    examples: [
      { command: 'roscore', description: '启动 ROS Master (默认端口 11311)' },
      { command: 'roscore -p 11312', description: '使用指定端口启动' }
    ],
    relatedCommands: ['rosnode', 'rostopic']
  },
  {
    id: 'cmd-rosrun',
    command: 'rosrun',
    description: '运行 ROS 包中的节点',
    category: 'ROS 核心',
    usage: 'rosrun <package_name> <node_name> [args]',
    prerequisites: ['roscore 已运行', '目标包已安装'],
    tags: ['节点', '运行', '包'],
    examples: [
      { command: 'rosrun turtlesim turtlesim_node', description: '运行小海龟仿真器' },
      { command: 'rosrun turtlesim turtle_teleop_key', description: '运行小海龟键盘控制' },
      { command: 'rosrun rqt_graph rqt_graph', description: '运行节点图可视化' }
    ],
    relatedCommands: ['roslaunch', 'rosnode']
  },
  {
    id: 'cmd-roslaunch',
    command: 'roslaunch',
    description: '启动 launch 文件',
    category: 'ROS 核心',
    usage: 'roslaunch <package_name> <file_name.launch> [args:=value]',
    prerequisites: ['roscore（roslaunch 会自动启动）', 'launch 文件存在'],
    tags: ['launch', '节点', '启动'],
    examples: [
      { command: 'roslaunch turtlebot3_bringup turtlebot3_robot.launch', description: '启动 TurtleBot3 机器人' },
      { command: 'roslaunch my_pkg demo.launch debug:=true', description: '带参数启动' }
    ],
    relatedCommands: ['rosrun', 'rosnode']
  },
  {
    id: 'cmd-catkin-make',
    command: 'catkin_make',
    description: '编译 catkin 工作空间',
    category: '构建',
    usage: '在工作空间根目录运行，会编译 src 下所有包',
    prerequisites: ['已安装 catkin', '工作空间结构正确'],
    tags: ['编译', 'catkin', '工作空间'],
    examples: [
      { command: 'catkin_make', description: '标准编译' },
      { command: 'catkin_make -DCMAKE_BUILD_TYPE=Release', description: 'Release 模式编译' },
      { command: 'catkin_make -j4', description: '使用 4 核心并行编译' }
    ],
    relatedCommands: ['catkin', 'catkin_build']
  },
  {
    id: 'cmd-catkin-create-pkg',
    command: 'catkin_create_pkg',
    description: '创建新的 ROS 包',
    category: '构建',
    usage: 'catkin_create_pkg <package_name> [depend1] [depend2] [depend3]',
    prerequisites: ['位于工作空间 src 目录下'],
    tags: ['包', '创建', '依赖'],
    examples: [
      { command: 'catkin_create_pkg my_robot roscpp rospy std_msgs', description: '创建包含常用依赖的包' },
      { command: 'catkin_create_pkg my_pkg --catkin-deps roscpp', description: '指定 catkin 依赖' }
    ],
    relatedCommands: ['catkin_make', 'rospack']
  },

  // 节点命令
  {
    id: 'cmd-rosnode-list',
    command: 'rosnode list',
    description: '列出所有运行中的节点',
    category: '节点',
    usage: 'rosnode list',
    prerequisites: ['roscore 已运行', '节点已启动'],
    tags: ['节点', '列表', '调试'],
    examples: [
      { command: 'rosnode list', description: '列出所有节点' }
    ],
    relatedCommands: ['rosnode info', 'rosnode kill']
  },
  {
    id: 'cmd-rosnode-info',
    command: 'rosnode info',
    description: '显示节点详细信息',
    category: '节点',
    usage: 'rosnode info <node_name>',
    prerequisites: ['节点正在运行'],
    tags: ['节点', '信息', '调试'],
    examples: [
      { command: 'rosnode info /turtlesim', description: '查看小海龟节点信息' },
      { command: 'rosnode info /rosout', description: '查看日志节点信息' }
    ],
    relatedCommands: ['rosnode list', 'rosnode kill']
  },
  {
    id: 'cmd-rosnode-kill',
    command: 'rosnode kill',
    description: '终止节点',
    category: '节点',
    usage: 'rosnode kill <node_name>',
    prerequisites: ['节点正在运行'],
    tags: ['节点', '终止', '调试'],
    examples: [
      { command: 'rosnode kill /turtlesim', description: '终止小海龟节点' },
      { command: 'rosnode kill -a', description: '终止所有节点（慎用）' }
    ],
    relatedCommands: ['rosnode list', 'rosnode info']
  },

  // 话题命令
  {
    id: 'cmd-rostopic-list',
    command: 'rostopic list',
    description: '列出所有话题',
    category: '话题',
    usage: 'rostopic list',
    prerequisites: ['roscore 已运行'],
    tags: ['话题', '列表', '调试'],
    examples: [
      { command: 'rostopic list', description: '列出所有话题' },
      { command: 'rostopic list -v', description: '详细列出话题（含发布者和订阅者）' }
    ],
    relatedCommands: ['rostopic echo', 'rostopic pub']
  },
  {
    id: 'cmd-rostopic-echo',
    command: 'rostopic echo',
    description: '显示话题消息内容',
    category: '话题',
    usage: 'rostopic echo <topic_name>',
    prerequisites: ['话题存在', '有消息发布'],
    tags: ['话题', '消息', '调试'],
    examples: [
      { command: 'rostopic echo /turtle1/pose', description: '显示海龟位置' },
      { command: 'rostopic echo /cmd_vel -n 5', description: '显示 5 条消息后停止' }
    ],
    relatedCommands: ['rostopic list', 'rostopic pub']
  },
  {
    id: 'cmd-rostopic-pub',
    command: 'rostopic pub',
    description: '向话题发布消息',
    category: '话题',
    usage: 'rostopic pub <topic> <msg_type> <data>',
    prerequisites: ['话题类型已知', 'roscore 已运行'],
    tags: ['话题', '发布', '测试'],
    examples: [
      { command: 'rostopic pub /turtle1/cmd_vel geometry_msgs/Twist "linear: {x: 2.0}" -1', description: '发布一次速度命令' },
      { command: 'rostopic pub /cmd_vel geometry_msgs/Twist -r 10 "linear: {x: 0.5}"', description: '以 10Hz 持续发布' }
    ],
    relatedCommands: ['rostopic echo', 'rostopic list']
  },
  {
    id: 'cmd-rostopic-hz',
    command: 'rostopic hz',
    description: '显示话题消息频率',
    category: '话题',
    usage: 'rostopic hz <topic_name>',
    prerequisites: ['话题有消息发布'],
    tags: ['话题', '频率', '调试'],
    examples: [
      { command: 'rostopic hz /turtle1/pose', description: '显示位置更新频率' },
      { command: 'rostopic hz /scan', description: '显示激光扫描频率' }
    ],
    relatedCommands: ['rostopic bw', 'rostopic info']
  },

  // 服务命令
  {
    id: 'cmd-rosservice-list',
    command: 'rosservice list',
    description: '列出所有服务',
    category: '服务',
    usage: 'rosservice list',
    prerequisites: ['roscore 已运行', '节点已启动'],
    tags: ['服务', '列表', '调试'],
    examples: [
      { command: 'rosservice list', description: '列出所有服务' }
    ],
    relatedCommands: ['rosservice call', 'rosservice info']
  },
  {
    id: 'cmd-rosservice-call',
    command: 'rosservice call',
    description: '调用服务',
    category: '服务',
    usage: 'rosservice call <service_name> <args>',
    prerequisites: ['服务存在', '参数正确'],
    tags: ['服务', '调用', '测试'],
    examples: [
      { command: 'rosservice call /turtle1/teleport_absolute 2 2 0', description: '传送海龟到指定位置' },
      { command: 'rosservice call /clear', description: '清除小海龟轨迹' }
    ],
    relatedCommands: ['rosservice list', 'rosservice info']
  },

  // 参数命令
  {
    id: 'cmd-rosparam-list',
    command: 'rosparam list',
    description: '列出所有参数',
    category: '参数',
    usage: 'rosparam list',
    prerequisites: ['roscore 已运行'],
    tags: ['参数', '列表', '调试'],
    examples: [
      { command: 'rosparam list', description: '列出所有参数服务器参数' }
    ],
    relatedCommands: ['rosparam get', 'rosparam set']
  },
  {
    id: 'cmd-rosparam-get',
    command: 'rosparam get',
    description: '获取参数值',
    category: '参数',
    usage: 'rosparam get <param_name>',
    prerequisites: ['参数存在'],
    tags: ['参数', '读取', '调试'],
    examples: [
      { command: 'rosparam get /rosdistro', description: '获取 ROS 发行版名称' },
      { command: 'rosparam get /background_r', description: '获取小海龟背景色 R 值' }
    ],
    relatedCommands: ['rosparam set', 'rosparam list']
  },
  {
    id: 'cmd-rosparam-set',
    command: 'rosparam set',
    description: '设置参数值',
    category: '参数',
    usage: 'rosparam set <param_name> <value>',
    prerequisites: ['参数服务器运行中'],
    tags: ['参数', '设置', '配置'],
    examples: [
      { command: 'rosparam set /background_r 255', description: '设置背景色红色值' },
      { command: 'rosparam set /robot_name "my_robot"', description: '设置字符串参数' }
    ],
    relatedCommands: ['rosparam get', 'rosparam list']
  },

  // 包和工具命令
  {
    id: 'cmd-rospack-find',
    command: 'rospack find',
    description: '查找包路径',
    category: '包管理',
    usage: 'rospack find <package_name>',
    prerequisites: ['包已安装'],
    tags: ['包', '路径', '查找'],
    examples: [
      { command: 'rospack find roscpp', description: '查找 roscpp 包路径' },
      { command: 'rospack find turtlesim', description: '查找 turtlesim 包路径' }
    ],
    relatedCommands: ['roscd', 'rosls']
  },
  {
    id: 'cmd-roscd',
    command: 'roscd',
    description: '切换到包目录',
    category: '包管理',
    usage: 'roscd <package_name>[/<subdir>]',
    prerequisites: ['包已安装', '已 source setup.bash'],
    tags: ['包', '目录', '导航'],
    examples: [
      { command: 'roscd turtlesim', description: '切换到 turtlesim 包目录' },
      { command: 'roscd roscpp/include', description: '切换到 roscpp include 目录' }
    ],
    relatedCommands: ['rospack', 'rosls']
  },

  // TF 命令
  {
    id: 'cmd-tf-echo',
    command: 'tf_echo',
    description: '显示坐标变换',
    category: 'TF',
    usage: 'rosrun tf tf_echo <source_frame> <target_frame>',
    prerequisites: ['TF 节点运行中', 'frame 名称正确'],
    tags: ['TF', '变换', '调试'],
    examples: [
      { command: 'rosrun tf tf_echo world turtle1', description: '显示 world 到 turtle1 的变换' }
    ],
    relatedCommands: ['rqt_tf_tree', 'view_frames']
  },
  {
    id: 'cmd-view-frames',
    command: 'view_frames',
    description: '生成 TF 树图',
    category: 'TF',
    usage: 'rosrun tf view_frames',
    prerequisites: ['TF 节点运行中'],
    tags: ['TF', '可视化', '调试'],
    examples: [
      { command: 'rosrun tf view_frames', description: '生成 frames.pdf 文件' },
      { command: 'evince frames.pdf', description: '查看生成的 PDF' }
    ],
    relatedCommands: ['tf_echo', 'rqt_tf_tree']
  },

  // rosbag 命令
  {
    id: 'cmd-rosbag-record',
    command: 'rosbag record',
    description: '录制话题数据',
    category: 'rosbag',
    usage: 'rosbag record [-O output.bag] [topic1] [topic2] ...',
    prerequisites: ['roscore 已运行', '话题存在'],
    tags: ['rosbag', '录制', '数据'],
    examples: [
      { command: 'rosbag record -a', description: '录制所有话题' },
      { command: 'rosbag record /scan /tf -O my_data.bag', description: '录制指定话题并保存' }
    ],
    relatedCommands: ['rosbag play', 'rosbag info']
  },
  {
    id: 'cmd-rosbag-play',
    command: 'rosbag play',
    description: '回放 bag 文件',
    category: 'rosbag',
    usage: 'rosbag play <bag_file>',
    prerequisites: ['bag 文件存在', 'roscore 已运行'],
    tags: ['rosbag', '回放', '数据'],
    examples: [
      { command: 'rosbag play my_data.bag', description: '按录制速度回放' },
      { command: 'rosbag play my_data.bag -r 0.5', description: '半速回放' },
      { command: 'rosbag play my_data.bag -l', description: '循环回放' }
    ],
    relatedCommands: ['rosbag record', 'rosbag info']
  },
  {
    id: 'cmd-rosbag-info',
    command: 'rosbag info',
    description: '查看 bag 文件信息',
    category: 'rosbag',
    usage: 'rosbag info <bag_file>',
    prerequisites: ['bag 文件存在'],
    tags: ['rosbag', '信息', '数据'],
    examples: [
      { command: 'rosbag info my_data.bag', description: '显示 bag 文件详细信息' }
    ],
    relatedCommands: ['rosbag record', 'rosbag play']
  },

  // 调试命令
  {
    id: 'cmd-roswtf',
    command: 'roswtf',
    description: 'ROS 系统诊断工具',
    category: '调试',
    usage: 'roswtf [package]',
    prerequisites: ['ROS 环境已配置'],
    tags: ['调试', '诊断', '错误'],
    examples: [
      { command: 'roswtf', description: '检查当前 ROS 环境问题' },
      { command: 'roswtf my_package', description: '检查特定包的问题' }
    ],
    relatedCommands: ['rosnode', 'rostopic']
  },
  {
    id: 'cmd-rqt-graph',
    command: 'rqt_graph',
    description: '节点图可视化',
    category: '调试',
    usage: 'rqt_graph',
    prerequisites: ['roscore 已运行', 'rqt 已安装'],
    tags: ['调试', '可视化', '节点'],
    examples: [
      { command: 'rqt_graph', description: '打开节点图窗口' }
    ],
    relatedCommands: ['rqt', 'rosnode']
  },
  {
    id: 'cmd-rqt-console',
    command: 'rqt_console',
    description: '日志控制台',
    category: '调试',
    usage: 'rqt_console',
    prerequisites: ['roscore 已运行', '节点在输出日志'],
    tags: ['调试', '日志', '控制台'],
    examples: [
      { command: 'rqt_console', description: '打开日志查看窗口' }
    ],
    relatedCommands: ['rqt', 'rosout']
  }
];