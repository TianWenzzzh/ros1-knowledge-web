import type { CommandReference } from './types';

export const commandReferences: CommandReference[] = [
  // roscore 相关
  {
    id: 'cmd-roscore',
    command: 'roscore',
    description: '启动 ROS Master、参数服务器和日志节点',
    category: '核心命令',
    examples: [
      { command: 'roscore', description: '默认启动' },
      { command: 'roscore -p 11312', description: '指定端口启动' }
    ],
    relatedCommands: ['rosnode list', 'rostopic list']
  },
  {
    id: 'cmd-rosrun',
    command: 'rosrun',
    description: '运行包中的节点',
    category: '核心命令',
    examples: [
      { command: 'rosrun turtlesim turtlesim_node', description: '运行小海龟节点' },
      { command: 'rosrun package_name node_name', description: '运行指定节点' }
    ],
    relatedCommands: ['roslaunch']
  },
  {
    id: 'cmd-roslaunch',
    command: 'roslaunch',
    description: '启动 launch 文件',
    category: '核心命令',
    examples: [
      { command: 'roslaunch package_name file.launch', description: '启动 launch 文件' },
      { command: 'roslaunch package_name file.launch arg:=value', description: '传递参数' }
    ],
    relatedCommands: ['rosrun']
  },
  
  // 话题命令
  {
    id: 'cmd-rostopic-list',
    command: 'rostopic list',
    description: '列出所有活动话题',
    category: '话题命令',
    examples: [
      { command: 'rostopic list', description: '列出所有话题' },
      { command: 'rostopic list | grep cmd', description: '搜索特定话题' }
    ],
    relatedCommands: ['rostopic echo', 'rostopic info']
  },
  {
    id: 'cmd-rostopic-echo',
    command: 'rostopic echo',
    description: '显示话题消息内容',
    category: '话题命令',
    examples: [
      { command: 'rostopic echo /topic_name', description: '持续显示消息' },
      { command: 'rostopic echo /topic_name -n 1', description: '只显示一条消息' }
    ],
    relatedCommands: ['rostopic hz', 'rostopic bw']
  },
  {
    id: 'cmd-rostopic-pub',
    command: 'rostopic pub',
    description: '向话题发布消息',
    category: '话题命令',
    examples: [
      { command: 'rostopic pub /topic type "data" -1', description: '发布一次' },
      { command: 'rostopic pub /topic type "data" -r 10', description: '以 10Hz 发布' }
    ],
    relatedCommands: ['rostopic echo']
  },
  {
    id: 'cmd-rostopic-hz',
    command: 'rostopic hz',
    description: '显示话题发布频率',
    category: '话题命令',
    examples: [
      { command: 'rostopic hz /topic_name', description: '显示发布频率' }
    ],
    relatedCommands: ['rostopic bw', 'rostopic echo']
  },
  
  // 节点命令
  {
    id: 'cmd-rosnode-list',
    command: 'rosnode list',
    description: '列出所有运行的节点',
    category: '节点命令',
    examples: [
      { command: 'rosnode list', description: '列出所有节点' }
    ],
    relatedCommands: ['rosnode info', 'rosnode kill']
  },
  {
    id: 'cmd-rosnode-info',
    command: 'rosnode info',
    description: '显示节点详细信息',
    category: '节点命令',
    examples: [
      { command: 'rosnode info /node_name', description: '显示节点信息' }
    ],
    relatedCommands: ['rosnode list', 'rosnode ping']
  },
  
  // 服务命令
  {
    id: 'cmd-rosservice-list',
    command: 'rosservice list',
    description: '列出所有服务',
    category: '服务命令',
    examples: [
      { command: 'rosservice list', description: '列出所有服务' }
    ],
    relatedCommands: ['rosservice call', 'rosservice type']
  },
  {
    id: 'cmd-rosservice-call',
    command: 'rosservice call',
    description: '调用服务',
    category: '服务命令',
    examples: [
      { command: 'rosservice call /service_name "args"', description: '调用服务' }
    ],
    relatedCommands: ['rosservice list', 'rosservice type']
  },
  
  // 参数命令
  {
    id: 'cmd-rosparam-list',
    command: 'rosparam list',
    description: '列出所有参数',
    category: '参数命令',
    examples: [
      { command: 'rosparam list', description: '列出所有参数' },
      { command: 'rosparam get /param_name', description: '获取参数值' },
      { command: 'rosparam set /param_name value', description: '设置参数值' }
    ],
    relatedCommands: ['rosparam get', 'rosparam set']
  },
  
  // TF 命令
  {
    id: 'cmd-tf-echo',
    command: 'rosrun tf tf_echo',
    description: '打印坐标变换',
    category: 'TF 命令',
    examples: [
      { command: 'rosrun tf tf_echo source_frame target_frame', description: '打印变换' }
    ],
    relatedCommands: ['rqt_tf_tree', 'rosrun tf view_frames']
  },
  {
    id: 'cmd-view-frames',
    command: 'rosrun tf view_frames',
    description: '生成 TF 树 PDF',
    category: 'TF 命令',
    examples: [
      { command: 'rosrun tf view_frames', description: '生成 frames.pdf' }
    ],
    relatedCommands: ['rqt_tf_tree', 'rosrun tf tf_echo']
  },
  
  // rosbag 命令
  {
    id: 'cmd-rosbag-record',
    command: 'rosbag record',
    description: '录制话题数据',
    category: '录制命令',
    examples: [
      { command: 'rosbag record -a', description: '录制所有话题' },
      { command: 'rosbag record /topic1 /topic2', description: '录制特定话题' },
      { command: 'rosbag record -O name.bag /topic', description: '指定文件名' }
    ],
    relatedCommands: ['rosbag play', 'rosbag info']
  },
  {
    id: 'cmd-rosbag-play',
    command: 'rosbag play',
    description: '回放录制的数据',
    category: '录制命令',
    examples: [
      { command: 'rosbag play file.bag', description: '回放数据' },
      { command: 'rosbag play -l file.bag', description: '循环回放' },
      { command: 'rosbag play -r 0.5 file.bag', description: '0.5 倍速回放' }
    ],
    relatedCommands: ['rosbag record', 'rosbag info']
  },
  {
    id: 'cmd-rosbag-info',
    command: 'rosbag info',
    description: '显示 bag 文件信息',
    category: '录制命令',
    examples: [
      { command: 'rosbag info file.bag', description: '显示文件信息' }
    ],
    relatedCommands: ['rosbag record', 'rosbag play']
  },
  
  // 编译命令
  {
    id: 'cmd-catkin-make',
    command: 'catkin_make',
    description: '编译 catkin 工作空间',
    category: '编译命令',
    examples: [
      { command: 'catkin_make', description: '编译工作空间' },
      { command: 'catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python3', description: '指定 Python' }
    ],
    relatedCommands: ['catkin_create_pkg']
  },
  {
    id: 'cmd-catkin-create',
    command: 'catkin_create_pkg',
    description: '创建新的 ROS 包',
    category: '编译命令',
    examples: [
      { command: 'catkin_create_pkg my_package std_msgs rospy', description: '创建包' }
    ],
    relatedCommands: ['catkin_make']
  },
  
  // 调试命令
  {
    id: 'cmd-roswtf',
    command: 'roswtf',
    description: '检查系统问题',
    category: '调试命令',
    examples: [
      { command: 'roswtf', description: '检查当前系统' }
    ],
    relatedCommands: ['rqt_console']
  },
  {
    id: 'cmd-rqt',
    command: 'rqt',
    description: '启动 RQT 主界面',
    category: '调试命令',
    examples: [
      { command: 'rqt', description: '启动主界面' },
      { command: 'rqt_graph', description: '显示节点图' },
      { command: 'rqt_plot', description: '绘制曲线' }
    ],
    relatedCommands: ['rviz', 'rqt_console']
  },
  {
    id: 'cmd-rviz',
    command: 'rviz',
    description: '启动 RViz 可视化',
    category: '调试命令',
    examples: [
      { command: 'rosrun rviz rviz', description: '启动 RViz' },
      { command: 'rosrun rviz rviz -d config.rviz', description: '加载配置' }
    ],
    relatedCommands: ['rqt', 'rqt_graph']
  }
];