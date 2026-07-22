import type { TroubleshootItem } from './types';

export const troubleshootItems: TroubleshootItem[] = [
  {
    id: 'err-roscore',
    errorPattern: 'Unable to contact master',
    keywords: ['roscore', 'master', 'connection', 'refused'],
    possibleCauses: [
      'roscore 未运行',
      'ROS_MASTER_URI 配置错误',
      '网络连接问题',
      '防火墙阻止连接'
    ],
    solutions: [
      '首先运行 roscore',
      '检查 ROS_MASTER_URI 环境变量',
      '使用 export ROS_MASTER_URI=http://localhost:11311',
      '检查防火墙设置'
    ],
    relatedArticles: ['roscore', 'ros-architecture']
  },
  {
    id: 'err-node-not-found',
    errorPattern: 'Node not found',
    keywords: ['node', 'found', 'rosnode'],
    possibleCauses: [
      '节点未启动',
      '节点名称错误',
      '节点启动失败'
    ],
    solutions: [
      '使用 rosnode list 查看运行中的节点',
      '检查节点名称拼写',
      '查看节点启动日志'
    ],
    relatedArticles: ['ros-node']
  },
  {
    id: 'err-topic-not-published',
    errorPattern: 'topic does not appear to be published',
    keywords: ['topic', 'published', 'publisher'],
    possibleCauses: [
      '发布者节点未运行',
      '话题名称错误',
      '消息类型不匹配'
    ],
    solutions: [
      '使用 rostopic list 确认话题存在',
      '检查话题名称拼写',
      '确认发布者节点正在运行'
    ],
    relatedArticles: ['ros-topic', 'ros-node']
  },
  {
    id: 'err-tf-transform',
    errorPattern: 'Transform failed',
    keywords: ['transform', 'tf', 'frame', 'lookup'],
    possibleCauses: [
      'TF 树断裂',
      '坐标系不存在',
      '时间戳问题'
    ],
    solutions: [
      '使用 rqt_tf_tree 检查 TF 树结构',
      '确认坐标系名称正确',
      '使用 rospy.Time(0) 获取最新变换',
      '检查 TF 发布频率'
    ],
    relatedArticles: ['tf-transform']
  },
  {
    id: 'err-build-failed',
    errorPattern: 'catkin_make failed',
    keywords: ['build', 'catkin', 'cmake', 'compile'],
    possibleCauses: [
      '代码语法错误',
      '依赖未安装',
      'CMakeLists.txt 配置错误'
    ],
    solutions: [
      '查看完整错误信息定位问题',
      '使用 rosdep install 安装依赖',
      '检查 CMakeLists.txt 配置',
      '清理后重新编译：catkin clean -y && catkin_make'
    ],
    relatedArticles: ['catkin-workspace']
  },
  {
    id: 'err-package-not-found',
    errorPattern: 'package not found',
    keywords: ['package', 'found', 'rospack'],
    possibleCauses: [
      '包未安装',
      'ROS_PACKAGE_PATH 未配置',
      '包名拼写错误'
    ],
    solutions: [
      '使用 rospack find 查找包',
      '检查 ROS_PACKAGE_PATH 环境变量',
      '安装缺失的包',
      'source 工作空间的 setup.bash'
    ],
    relatedArticles: ['catkin-workspace', 'ros-launch']
  },
  {
    id: 'err-launch-failed',
    errorPattern: 'roslaunch failed',
    keywords: ['launch', 'roslaunch', 'xml'],
    possibleCauses: [
      'Launch 文件语法错误',
      '节点不存在',
      '参数配置错误'
    ],
    solutions: [
      '检查 XML 语法',
      '使用 roslaunch -a 获取详细信息',
      '验证节点和包是否存在'
    ],
    relatedArticles: ['ros-launch']
  },
  {
    id: 'err-rosdep-update',
    errorPattern: 'rosdep update failed',
    keywords: ['rosdep', 'update', 'network'],
    possibleCauses: [
      '网络连接问题',
      '服务器无法访问',
      '证书问题'
    ],
    solutions: [
      '配置代理或使用国内镜像',
      '使用 rosdep update --reinit',
      '检查网络连接'
    ],
    relatedArticles: ['ubuntu-setup']
  },
  {
    id: 'err-gazebo-model',
    errorPattern: 'Model not found in Gazebo',
    keywords: ['gazebo', 'model', 'path'],
    possibleCauses: [
      '模型路径未配置',
      'GAZEBO_MODEL_PATH 错误',
      '模型文件不存在'
    ],
    solutions: [
      '设置 GAZEBO_MODEL_PATH 环境变量',
      '使用绝对路径',
      '检查模型文件位置'
    ],
    relatedArticles: ['gazebo-simulation']
  },
  {
    id: 'err-navigation-planning',
    errorPattern: 'Path planning failed',
    keywords: ['navigation', 'planning', 'path', 'move_base'],
    possibleCauses: [
      '目标点不可达',
      '地图或 costmap 问题',
      '规划器参数问题'
    ],
    solutions: [
      '检查目标点是否在自由空间',
      '查看 costmap 可视化',
      '调整 inflation_radius 参数',
      '检查机器人位置是否正确'
    ],
    relatedArticles: ['ros-navigation', 'slam-mapping']
  },
  {
    id: 'err-slam-empty',
    errorPattern: 'SLAM map is empty',
    keywords: ['slam', 'map', 'empty', 'gmapping'],
    possibleCauses: [
      '没有传感器数据',
      'TF 配置错误',
      '机器人未移动'
    ],
    solutions: [
      '检查 /scan 话题数据',
      '验证 TF 树结构',
      '控制机器人移动建立地图'
    ],
    relatedArticles: ['slam-mapping', 'sensor-integration']
  },
  {
    id: 'err-permission-denied',
    errorPattern: 'Permission denied',
    keywords: ['permission', 'denied', 'chmod'],
    possibleCauses: [
      '文件权限不足',
      'USB 设备权限问题',
      '脚本未添加执行权限'
    ],
    solutions: [
      '使用 chmod +x 添加执行权限',
      '添加用户到 dialout 组（串口设备）',
      '配置 udev 规则'
    ],
    relatedArticles: ['linux-basics']
  },
  {
    id: 'err-image-encoding',
    errorPattern: 'Image encoding mismatch',
    keywords: ['image', 'encoding', 'cv_bridge'],
    possibleCauses: [
      '图像编码格式不匹配',
      'cv_bridge 参数错误'
    ],
    solutions: [
      '使用 rostopic echo 查看实际编码',
      '使用正确的编码参数',
      '检查摄像头驱动配置'
    ],
    relatedArticles: ['cv-bridge', 'sensor-integration']
  },
  {
    id: 'err-moveit-ik',
    errorPattern: 'IK solver failed',
    keywords: ['moveit', 'ik', 'kinematics', 'planning'],
    possibleCauses: [
      '目标位置超出工作空间',
      '姿态不可达',
      '碰撞检测失败'
    ],
    solutions: [
      '检查目标位置是否在工作空间内',
      '调整目标姿态',
      '检查碰撞场景配置'
    ],
    relatedArticles: ['moveit-manipulation']
  }
];