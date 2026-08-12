window.__ARTICLES__ = window.__ARTICLES__ || {};
Object.assign(window.__ARTICLES__, {

"ros-node": {
t: "ROS 节点 (Node) 详解",
cat: "score",
lv: 1,
pre: 1,
time: "20分钟",
desc: "深入理解ROS节点的概念、生命周期和管理",
body: `<h2>什么是 ROS 节点</h2>
<p>在 ROS（Robot Operating System）中，<strong>节点（Node）</strong>是最基本的执行单元。每个节点本质上是一个独立的进程，负责完成机器人系统中某一项具体的功能任务。你可以把一个 ROS 系统想象成一个"机器人公司"：每个节点就是公司里的一名员工，有人负责传感器数据采集，有人负责路径规划，有人负责电机驱动，有人负责可视化——大家各司其职，通过话题、服务、参数服务器等方式互相通信协作。</p>
<p>这种"多进程分布式"架构是 ROS 的核心设计哲学。它带来了几个关键优势：</p>
<ul>
<li><strong>模块化</strong>：每个节点职责单一，可以独立开发、测试和替换。</li>
<li><strong>容错性</strong>：一个节点崩溃不会导致整个系统瘫痪。</li>
<li><strong>可复用</strong>：同一个节点可以在不同机器人项目中重复使用。</li>
<li><strong>分布式部署</strong>：节点可以运行在不同的计算机上，通过网络通信。</li>
</ul>
<p>节点之间的通信由 <strong>ROS Master</strong>（即 roscore 启动的核心进程）协调管理。Master 负责登记每个节点的名称、地址，以及它们发布/订阅的话题信息，帮助节点之间建立点对点连接。</p>

<h2>节点的初始化与关闭</h2>
<h3>Python 客户端 (rospy)</h3>
<p>在 Python 中，使用 <code>rospy.init_node()</code> 来初始化一个节点。这个函数必须在调用任何其他 rospy 函数之前执行，它会向 ROS Master 注册当前进程。</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="kw">import</span> rospy

<span class="kw">def</span> <span class="fn">main</span>():
    <span class="cm"># 初始化节点，节点名为 "my_python_node"</span>
    <span class="cm"># anonymous=True 会在节点名后追加随机数，避免重名</span>
    rospy.<span class="fn">init_node</span>(<span class="str">'my_python_node'</span>, anonymous=<span class="kw">True</span>)
    rospy.<span class="fn">loginfo</span>(<span class="str">'节点已启动'</span>)

    <span class="cm"># 保持节点运行，直到被关闭</span>
    rospy.<span class="fn">spin</span>()

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="fn">main</span>()</code></pre></div>

<h3>C++ 客户端 (roscpp)</h3>
<p>在 C++ 中，使用 <code>ros::init()</code> 进行初始化，然后创建 <code>ros::NodeHandle</code> 对象来与 ROS 系统交互。</p>
<div class="code-block"><span class="code-lang">cpp</span><pre><code><span class="pp">#include</span> <span class="str">&lt;ros/ros.h&gt;</span>

<span class="type">int</span> <span class="fn">main</span>(<span class="type">int</span> argc, <span class="type">char</span>** argv) {
    <span class="cm">// 初始化 ROS 节点</span>
    ros::<span class="fn">init</span>(argc, argv, <span class="str">"my_cpp_node"</span>);

    <span class="cm">// 创建节点句柄，是与 ROS 系统通信的入口</span>
    ros::NodeHandle nh;

    ROS_INFO(<span class="str">"节点已启动"</span>);

    <span class="cm">// spin() 会进入循环，处理回调函数</span>
    ros::<span class="fn">spin</span>();

    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<div class="callout tip">
<p><strong>rospy.spin() 与 ros::spin() 的区别</strong>：在 rospy 中，<code>spin()</code> 只是阻塞等待节点关闭，订阅回调在独立线程中自动触发；在 roscpp 中，<code>spin()</code> 才是真正处理回调队列的事件循环。如果你需要在主循环中做其他事情，可以使用 <code>ros::spinOnce()</code>。</p>
</div>

<h3>节点的优雅关闭</h3>
<p>当节点收到关闭信号（Ctrl+C 或被 rosnode kill）时，应该执行清理操作。在 Python 中可以使用 <code>rospy.on_shutdown()</code> 注册回调：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="kw">def</span> <span class="fn">shutdown_hook</span>():
    rospy.<span class="fn">loginfo</span>(<span class="str">"节点正在关闭，执行清理..."</span>)
    <span class="cm"># 在这里关闭硬件、保存数据等</span>

rospy.<span class="fn">on_shutdown</span>(shutdown_hook)</code></pre></div>

<h2>节点命名与命名空间</h2>
<p>ROS 中的节点名称采用类似文件系统的层级结构，支持<strong>命名空间（Namespace）</strong>来避免名称冲突。你可以通过以下几种方式设置节点名和命名空间：</p>

<h3>1. 代码中指定基础名称</h3>
<p>在 <code>init_node()</code> 或 <code>ros::init()</code> 中传入的名称是节点的<strong>基础名称（base name）</strong>。</p>

<h3>2. 命令行重映射 (__name:=)</h3>
<p>启动节点时，可以使用 <code>__name:=</code> 参数覆盖节点名称：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 将节点名覆盖为 "camera_node_left"</span>
rosrun my_package my_node.py __name:=camera_node_left</code></pre></div>

<h3>3. 命名空间 (__ns:=)</h3>
<p>使用 <code>__ns:=</code> 为节点指定命名空间，节点的全局名称会变成 <code>/namespace/node_name</code>：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 节点全局名称为 "/robot1/camera_node"</span>
rosrun my_package my_node.py __name:=camera_node __ns:=robot1</code></pre></div>

<h3>4. 环境变量 ROS_NAMESPACE</h3>
<p>设置环境变量也可以指定默认命名空间：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">export</span> ROS_NAMESPACE=/robot2
rosrun my_package my_node.py  <span class="cm"># 节点名变为 /robot2/my_node</span></code></pre></div>

<h2>rosnode 命令行工具</h2>
<p>ROS 提供了 <code>rosnode</code> 命令行工具来管理和调试运行中的节点。以下是最常用的子命令：</p>

<table>
<thead><tr><th>命令</th><th>功能</th><th>示例</th></tr></thead>
<tbody>
<tr><td><code>rosnode list</code></td><td>列出当前所有活跃节点</td><td>rosnode list</td></tr>
<tr><td><code>rosnode info &lt;node&gt;</code></td><td>查看节点详细信息（发布/订阅的话题、服务等）</td><td>rosnode info /talker</td></tr>
<tr><td><code>rosnode ping &lt;node&gt;</code></td><td>测试与节点的连通性（类似网络 ping）</td><td>rosnode ping /talker</td></tr>
<tr><td><code>rosnode machine &lt;host&gt;</code></td><td>列出指定主机上运行的节点</td><td>rosnode machine localhost</td></tr>
<tr><td><code>rosnode kill &lt;node&gt;</code></td><td>终止指定节点</td><td>rosnode kill /talker</td></tr>
</tbody>
</table>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 启动 roscore 后，新开终端运行示例节点</span>
roscore <span class="kw">&amp;</span>
rosrun rospy_tutorials talker

<span class="cm"># 另一个终端查看节点信息</span>
rosnode list
<span class="cm"># 输出: /rosout /talker</span>

rosnode info /talker
<span class="cm"># 输出:</span>
<span class="cm"># Node [/talker]</span>
<span class="cm"># Publications:</span>
<span class="cm">#  * /chatter [std_msgs/String]</span>
<span class="cm">#  * /rosout [rosgraph_msgs/Log]</span>
<span class="cm"># Subscriptions: None</span>
<span class="cm"># Services:</span>
<span class="cm">#  * /talker/get_loggers</span>
<span class="cm">#  * /talker/set_logger_level</span></code></pre></div>

<h2>节点状态管理</h2>
<p>在实际机器人系统中，节点可能会因为各种原因异常退出。ROS 提供了几种机制来管理节点的生命周期和状态：</p>

<h3>节点启动检查</h3>
<p>在启动一个依赖其他节点的节点之前，可以通过 <code>rosnode ping</code> 或等待特定话题出现来确保依赖节点已就绪：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="kw">import</span> rospy
<span class="kw">from</span> std_msgs.msg <span class="kw">import</span> String

<span class="cm"># 等待话题出现，确保 publisher 已经启动</span>
rospy.<span class="fn">loginfo</span>(<span class="str">"等待 /chatter 话题..."</span>)
rospy.<span class="fn">wait_for_message</span>(<span class="str">'/chatter'</span>, String, timeout=<span class="num">10.0</span>)
rospy.<span class="fn">loginfo</span>(<span class="str">"话题已就绪，开始工作"</span>)</code></pre></div>

<h3>日志级别</h3>
<p>节点可以通过日志输出不同级别的信息，方便调试：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code>rospy.<span class="fn">logdebug</span>(<span class="str">"调试信息，默认不显示"</span>)
rospy.<span class="fn">loginfo</span>(<span class="str">"一般信息，输出到屏幕"</span>)
rospy.<span class="fn">logwarn</span>(<span class="str">"警告信息，问题不严重"</span>)
rospy.<span class="fn">logerr</span>(<span class="str">"错误信息，功能受影响"</span>)
rospy.<span class="fn">logfatal</span>(<span class="str">"致命错误，节点无法继续运行"</span>)</code></pre></div>

<h2>编写多节点系统示例</h2>
<p>下面我们编写一个完整的多节点系统：一个温度传感器模拟节点发布温度数据，一个温度监控节点订阅数据并在超过阈值时发出警告。</p>

<h3>步骤 1：创建包</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code>cd ~/catkin_ws/src
catkin_create_pkg temp_monitor rospy std_msgs
cd temp_monitor
mkdir scripts</code></pre></div>

<h3>步骤 2：温度传感器节点 (temp_sensor.py)</h3>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="kw">import</span> rospy
<span class="kw">import</span> random
<span class="kw">import</span> math
<span class="kw">from</span> std_msgs.msg <span class="kw">import</span> Float64

<span class="kw">def</span> <span class="fn">temp_sensor</span>():
    pub = rospy.<span class="fn">Publisher</span>(<span class="str">'/temperature'</span>, Float64, queue_size=<span class="num">10</span>)
    rospy.<span class="fn">init_node</span>(<span class="str">'temp_sensor'</span>, anonymous=<span class="kw">False</span>)
    rate = rospy.<span class="fn">Rate</span>(<span class="num">2</span>)  <span class="cm"># 2Hz</span>

    rospy.<span class="fn">loginfo</span>(<span class="str">"温度传感器节点已启动，发布频率 2Hz"</span>)

    count = <span class="num">0</span>
    <span class="kw">while not</span> rospy.<span class="fn">is_shutdown</span>():
        <span class="cm"># 模拟温度：基准25度，加正弦波动和随机噪声</span>
        temp = <span class="num">25.0</span> + <span class="num">5.0</span> * math.<span class="fn">sin</span>(count * <span class="num">0.1</span>) + random.<span class="fn">gauss</span>(<span class="num">0</span>, <span class="num">0.5</span>)
        pub.<span class="fn">publish</span>(temp)
        rospy.<span class="fn">logdebug</span>(<span class="str">"发布温度: %.2f C"</span> % temp)
        count += <span class="num">1</span>
        rate.<span class="fn">sleep</span>()

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="kw">try</span>:
        <span class="fn">temp_sensor</span>()
    <span class="kw">except</span> rospy.ROSInterruptException:
        <span class="kw">pass</span></code></pre></div>

<h3>步骤 3：温度监控节点 (temp_monitor.py)</h3>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="kw">import</span> rospy
<span class="kw">from</span> std_msgs.msg <span class="kw">import</span> Float64

THRESHOLD = <span class="num">30.0</span>  <span class="cm"># 温度告警阈值 (摄氏度)</span>

<span class="kw">def</span> <span class="fn">temp_callback</span>(msg):
    temp = msg.data
    <span class="kw">if</span> temp > THRESHOLD:
        rospy.<span class="fn">logwarn</span>(<span class="str">"⚠️ 温度过高！当前: %.2f°C (阈值: %.1f°C)"</span> % (temp, THRESHOLD))
    <span class="kw">else</span>:
        rospy.<span class="fn">loginfo</span>(<span class="str">"温度正常: %.2f°C"</span> % temp)

<span class="kw">def</span> <span class="fn">monitor</span>():
    rospy.<span class="fn">init_node</span>(<span class="str">'temp_monitor'</span>, anonymous=<span class="kw">False</span>)
    rospy.<span class="fn">Subscriber</span>(<span class="str">'/temperature'</span>, Float64, temp_callback)
    rospy.<span class="fn">loginfo</span>(<span class="str">"温度监控节点已启动，告警阈值: %.1f°C"</span> % THRESHOLD)
    rospy.<span class="fn">spin</span>()

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="fn">monitor</span>()</code></pre></div>

<h3>步骤 4：编译和运行</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 给脚本添加可执行权限</span>
chmod +x scripts/temp_sensor.py scripts/temp_monitor.py

<span class="cm"># 回到工作空间编译</span>
cd ~/catkin_ws
catkin_make
source devel/setup.bash

<span class="cm"># 终端1：启动 roscore</span>
roscore

<span class="cm"># 终端2：启动温度传感器</span>
rosrun temp_monitor temp_sensor.py

<span class="cm"># 终端3：启动温度监控</span>
rosrun temp_monitor temp_monitor.py

<span class="cm"># 终端4：查看所有节点</span>
rosnode list
<span class="cm"># 输出: /rosout /temp_monitor /temp_sensor</span></code></pre></div>

<div class="callout warn">
<p><strong>节点命名冲突</strong>：如果你启动两个同名节点（没有设置 <code>anonymous=True</code>），后启动的节点会"踢掉"先前的节点。这是 ROS 的一个重要机制——同名节点互斥，确保系统中不会有两个节点使用相同标识。如果你确实需要多个同类节点并行运行，请使用 <code>anonymous=True</code> 或通过 <code>__name:=</code> 分别指定不同名称。</p>
</div>

<h2>节点通信架构总结</h2>
<p>理解节点是掌握 ROS 的第一步。所有后续学习的话题、服务、动作等通信机制，本质上都是节点之间交换数据的方式。记住以下要点：</p>
<ul>
<li>节点是独立进程，由 ROS Master 协调管理。</li>
<li>每个节点在初始化时向 Master 注册，建立连接后节点之间是<strong>点对点直接通信</strong>，不再经过 Master。</li>
<li>合理使用命名空间来组织复杂系统中的节点。</li>
<li>善用 <code>rosnode</code> 工具进行调试和状态检查。</li>
<li>一个节点应该只负责一项功能，保持单一职责原则。</li>
</ul>
`
},

"ros-topic": {
t: "ROS 话题 (Topic) 与消息通信",
cat: "comm",
lv: 1,
pre: 1,
time: "30分钟",
desc: "掌握ROS最核心的异步通信机制——发布订阅模式",
body: `<h2>发布-订阅通信模型</h2>
<p><strong>话题（Topic）</strong>是 ROS 中最核心、最常用的通信机制，采用经典的<strong>发布/订阅（Publish/Subscribe）</strong>模式。这种模式的核心思想是：</p>
<ul>
<li><strong>Publisher（发布者）</strong>：向某个话题"广播"消息，但不关心谁在接收。</li>
<li><strong>Subscriber（订阅者）</strong>：订阅自己感兴趣的话题，接收消息，但不关心是谁发布的。</li>
<li><strong>解耦</strong>：发布者和订阅者互不感知对方的存在，甚至不知道对方是否在运行。</li>
</ul>
<p>这种异步、松耦合的通信方式非常适合机器人系统中持续产生的数据流，比如传感器数据（激光雷达、摄像头、IMU）、控制指令（速度命令）、状态信息（机器人位姿）等。</p>

<p>话题通信的完整流程如下：</p>
<div class="steps">
<div class="step"><h4>Publisher 注册</h4><p>Publisher 节点启动后，向 ROS Master 注册自己发布的话题名称和消息类型。Master 记录这些信息。</p></div>
<div class="step"><h4>Subscriber 注册</h4><p>Subscriber 节点启动后，向 ROS Master 注册自己订阅的话题名称和消息类型。</p></div>
<div class="step"><h4>Master 匹配</h4><p>Master 发现有 Publisher 和 Subscriber 关注同一个话题时，会互相通知对方的地址信息（XML/RPC 调用）。</p></div>
<div class="step"><h4>建立直连</h4><p>Subscriber 根据 Master 提供的信息，直接与 Publisher 建立 TCP（默认）或 UDP 连接，之后消息通过点对点连接传输，不再经过 Master。</p></div>
</div>

<h2>话题命名规则</h2>
<p>ROS 话题名称遵循统一的图资源命名（Graph Resource Name）规范，分为以下几类：</p>

<table>
<thead><tr><th>名称类型</th><th>格式</th><th>示例</th><th>说明</th></tr></thead>
<tbody>
<tr><td>全局名称</td><td>以 <code>/</code> 开头</td><td><code>/cmd_vel</code></td><td>完整路径，不受命名空间影响</td></tr>
<tr><td>相对名称</td><td>不以 <code>/</code> 开头</td><td><code>chatter</code></td><td>会解析为 <code>/&lt;node_ns&gt;/chatter</code></td></tr>
<tr><td>私有名称</td><td>以 <code>~</code> 开头</td><td><code>~max_speed</code></td><td>解析为 <code>/&lt;node_ns&gt;/&lt;node_name&gt;/max_speed</code></td></tr>
</tbody>
</table>

<div class="callout tip">
<p><strong>命名建议</strong>：公共话题（多个节点都需要访问的）使用全局名称或相对名称；节点内部参数和配置使用私有名称（<code>~</code>开头），这样不会污染全局命名空间。</p>
</div>

<h2>rostopic 命令行工具</h2>
<p><code>rostopic</code> 是调试话题通信最常用的工具集，熟练掌握它可以极大提升调试效率。</p>

<h3>rostopic list</h3>
<p>列出当前所有活跃的话题：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>rostopic list
<span class="cm"># /chatter</span>
<span class="cm"># /clock</span>
<span class="cm"># /rosout</span>
<span class="cm"># /rosout_agg</span>
<span class="cm"># /tf</span>

<span class="cm"># 添加 -v 参数显示详细信息（发布者/订阅者数量）</span>
rostopic list -v</code></pre></div>

<h3>rostopic echo</h3>
<p>实时打印话题上的消息内容，是调试话题数据最直接的方式：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 打印 /chatter 话题的消息</span>
rostopic echo /chatter
<span class="cm"># data: "hello world 1234"</span>
<span class="cm"># ---</span>
<span class="cm"># data: "hello world 1235"</span>

<span class="cm"># 只打印一次后退出</span>
rostopic echo -n1 /chatter

<span class="cm"># 不显示分隔符 ---</span>
rostopic echo --noarr /chatter</code></pre></div>

<h3>rostopic info</h3>
<p>查看话题的消息类型、发布者和订阅者信息：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>rostopic info /chatter
<span class="cm"># Type: std_msgs/String</span>
<span class="cm"># Publishers:</span>
<span class="cm">#  * /talker (http://localhost:36547/)</span>
<span class="cm"># Subscribers:</span>
<span class="cm">#  * /listener (http://localhost:46123/)</span></code></pre></div>

<h3>rostopic type / hz / bw</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 查看话题的消息类型</span>
rostopic type /chatter          <span class="cm"># std_msgs/String</span>

<span class="cm"># 查看话题的发布频率（Hz）</span>
rostopic hz /chatter
<span class="cm"># average rate: 10.000</span>
<span class="cm">#  min: 0.100s max: 0.100s std dev: 0.00000s window: 10</span>

<span class="cm"># 查看话题的带宽占用</span>
rostopic bw /chatter
<span class="cm"># average: 152.34 B/s</span></code></pre></div>

<h3>rostopic pub</h3>
<p>从命令行向话题发布消息，无需编写代码即可测试订阅节点：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 发布一次消息（-1 表示发布一次，-r 指定频率）</span>
rostopic pub -1 /chatter std_msgs/String <span class="str">"data: 'Hello from command line'"</span>

<span class="cm"># 以 10Hz 持续发布</span>
rostopic pub -r 10 /chatter std_msgs/String <span class="str">"data: 'continuous message'"</span>

<span class="cm"># 发布带空格的消息，使用 YAML 语法</span>
rostopic pub -1 /chatter std_msgs/String <span class="str">"data: '测试中文消息'"</span></code></pre></div>

<h2>消息类型与 std_msgs</h2>
<p>话题上传输的每条数据都必须符合预定义的<strong>消息类型（Message Type）</strong>。ROS 中最基础的消息包是 <code>std_msgs</code>，它提供了一组标准的原始数据类型：</p>

<table>
<thead><tr><th>消息类型</th><th>含义</th><th>字段</th></tr></thead>
<tbody>
<tr><td><code>std_msgs/Bool</code></td><td>布尔值</td><td>bool data</td></tr>
<tr><td><code>std_msgs/Int32</code></td><td>32位整数</td><td>int32 data</td></tr>
<tr><td><code>std_msgs/Float64</code></td><td>64位浮点数</td><td>float64 data</td></tr>
<tr><td><code>std_msgs/String</code></td><td>字符串</td><td>string data</td></tr>
<tr><td><code>std_msgs/Header</code></td><td>标准头（时间戳+坐标系+序号）</td><td>seq, stamp, frame_id</td></tr>
<tr><td><code>std_msgs/Time</code></td><td>时间戳</td><td>time data</td></tr>
<tr><td><code>std_msgs/Empty</code></td><td>空消息（无内容）</td><td>无字段</td></tr>
</tbody>
</table>

<div class="callout warn">
<p><strong>std_msgs 的局限</strong>：<code>std_msgs</code> 中的类型都只有一个 <code>data</code> 字段，语义信息不足。在实际项目中，对于复杂数据应使用 geometry_msgs、sensor_msgs、nav_msgs 等标准消息包，或自定义消息类型。</p>
</div>

<h2>Latched Topics（锁存话题）</h2>
<p>默认情况下，订阅者只能收到<strong>订阅之后</strong>发布的消息。但有些场景需要新订阅者立即获取最近一次发布的数据（比如地图数据、参数配置），这时候可以使用 <strong>Latched Topic</strong>：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm"># Python: latch=True</span>
pub = rospy.<span class="fn">Publisher</span>(<span class="str">'/map_data'</span>, String, queue_size=<span class="num">1</span>, latch=<span class="kw">True</span>)
<span class="cm"># 发布一次后，任何新订阅者都会立即收到这条消息</span>
pub.<span class="fn">publish</span>(String(<span class="str">"这是地图数据，新订阅者立即可见"</span>))</code></pre></div>

<div class="code-block"><span class="code-lang">cpp</span><pre><code><span class="cm">// C++: latch = true</span>
ros::Publisher pub = nh.<span class="fn">advertise</span>&lt;std_msgs::String&gt;(<span class="str">"/map_data"</span>, <span class="num">1</span>, <span class="kw">true</span>);</code></pre></div>

<h2>命令行发布消息完整示例</h2>
<p>下面演示一个完整的话题通信流程，全部使用命令行完成，无需编写任何代码：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 终端1：启动 roscore</span>
roscore

<span class="cm"># 终端2：订阅 /robot_status 话题（此时还没有发布者，等待中）</span>
rostopic echo /robot_status

<span class="cm"># 终端3：查看话题类型（还不存在）</span>
rostopic info /robot_status
<span class="cm"># 输出: ERROR: Cannot load message class for</span>

<span class="cm"># 终端4：用命令行发布一条 String 消息</span>
rostopic pub -r 2 /robot_status std_msgs/String <span class="str">"data: '机器人运行中'"</span>

<span class="cm"># 此时终端2 会开始显示消息：</span>
<span class="cm"># data: "机器人运行中"</span>
<span class="cm"># ---</span>

<span class="cm"># 终端5：查看发布频率</span>
rostopic hz /robot_status
<span class="cm"># average rate: 2.000</span>

<span class="cm"># 终端5：查看消息类型</span>
rostopic type /robot_status  <span class="cm"># std_msgs/String</span></code></pre></div>

<h2>话题通信流程图</h2>
<p>下面的流程图展示了话题通信的完整生命周期：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code>┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│  Publisher  │         │  ROS Master  │         │  Subscriber │
│  (talker)   │         │  (roscore)   │         │  (listener) │
└──────┬──────┘         └──────┬───────┘         └──────┬──────┘
       │  1. 注册发布 /chatter │                       │
       │ ─────────────────────&gt;│                       │
       │                       │                       │
       │                       │ 2. 注册订阅 /chatter  │
       │                       │&lt;─────────────────────│
       │                       │                       │
       │                       │ 3. 通知Subscriber     │
       │                       │  Publisher的RPC地址   │
       │                       │ ─────────────────────&gt;│
       │                       │                       │
       │ 4. Subscriber直接连接  │                       │
       │    请求TCP连接         │                       │
       │&lt;──────────────────────────────────────────────│
       │                       │                       │
       │ 5. 确认连接，开始传输   │                       │
       │ ─────────────────────────────────────────────&gt;│
       │                       │                       │
       │ 6. 持续发布消息 (P2P)  │                       │
       │&lt;═════════════════════════════════════════════&gt;│
       │     (数据直连，不再经过Master)                  │</code></pre></div>

<div class="callout tip">
<p><strong>关键理解</strong>：Master 只在节点建立连接的阶段起"牵线搭桥"的作用。一旦 Publisher 和 Subscriber 建立了直接连接，即使 Master 挂掉，已经建立的话题通信仍然可以继续工作。但新节点无法再找到彼此。这也是为什么 <code>roscore</code> 必须最先启动。</p>
</div>

<h2>queue_size 的含义</h2>
<p>创建 Publisher 时的 <code>queue_size</code> 参数是一个容易被忽视但很重要的参数：</p>
<ul>
<li>它指定<strong>发布端</strong>用于缓存待发送消息的队列大小。</li>
<li>当消息发布速度超过网络传输速度时，多余的消息会在队列中排队。</li>
<li>队列满时，旧消息会被丢弃（先入先出），只保留最新的消息。</li>
<li>对于传感器数据等只关心最新值的场景，queue_size=1 即可。</li>
<li>对于不能丢消息的场景，可适当增大 queue_size，但会增加延迟和内存占用。</li>
</ul>

<p>在后续的 Publisher/Subscriber 编程章节中，我们将深入学习如何用 Python 和 C++ 编写自定义的话题发布和订阅节点，实现更复杂的数据交换逻辑。</p>
`
},

"ros-message": {
t: "ROS 消息 (Message) 定义与使用",
cat: "comm",
lv: 1,
pre: 1,
time: "25分钟",
desc: "自定义消息类型，实现节点间复杂数据传输",
body: `<h2>为什么需要自定义消息</h2>
<p>虽然 <code>std_msgs</code> 提供了基础数据类型，但在实际机器人项目中，我们经常需要传输更复杂的结构化数据。例如：</p>
<ul>
<li>一个激光雷达点包含距离、角度、强度三个值</li>
<li>一个机器人位姿包含位置(x,y,z)和姿态(四元数x,y,z,w)</li>
<li>一个检测结果包含目标类别、置信度、边界框坐标</li>
</ul>
<p>ROS 允许用户定义自己的<strong>消息类型（Message）</strong>，通过 <code>.msg</code> 文件描述数据结构，在编译时自动生成 Python 和 C++ 的对应代码。</p>

<h2>msg 文件格式</h2>
<p><code>.msg</code> 文件是简单的文本文件，每行定义一个字段，格式为：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code>字段类型 字段名称</code></pre></div>
<p>字段类型可以是以下几类：</p>

<h3>基础类型</h3>
<table>
<thead><tr><th>类型名</th><th>说明</th><th>C++ 映射</th><th>Python 映射</th></tr></thead>
<tbody>
<tr><td><code>bool</code></td><td>布尔值</td><td>uint8_t</td><td>bool</td></tr>
<tr><td><code>int8/16/32/64</code></td><td>有符号整数</td><td>int8_t ~ int64_t</td><td>int</td></tr>
<tr><td><code>uint8/16/32/64</code></td><td>无符号整数</td><td>uint8_t ~ uint64_t</td><td>int</td></tr>
<tr><td><code>float32/64</code></td><td>浮点数</td><td>float/double</td><td>float</td></tr>
<tr><td><code>string</code></td><td>字符串</td><td>std::string</td><td>str</td></tr>
<tr><td><code>time</code></td><td>时间戳</td><td>ros::Time</td><td>rospy.Time</td></tr>
<tr><td><code>duration</code></td><td>时长</td><td>ros::Duration</td><td>rospy.Duration</td></tr>
</tbody>
</table>

<h3>数组类型</h3>
<p>在类型后加 <code>[]</code> 表示可变长度数组，加 <code>[N]</code> 表示固定长度数组：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code><span class="cm"># 可变长度数组</span>
float64[] temperatures
<span class="cm"># 固定长度数组（长度为3）</span>
float64[3] position
<span class="cm"># 字符串数组</span>
string[] sensor_names</code></pre></div>

<h3>嵌套类型</h3>
<p>一个消息可以包含其他消息类型作为字段：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code><span class="cm"># 可以引用同一个包或其他包中的消息类型</span>
std_msgs/Header header
geometry_msgs/Point position
geometry_msgs/Quaternion orientation</code></pre></div>

<h3>Header 标准头</h3>
<p><code>std_msgs/Header</code> 是 ROS 中约定俗成的"元信息"字段，几乎所有传感器数据消息都会包含它：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code><span class="cm"># std_msgs/Header 的定义</span>
uint32 seq          <span class="cm"># 序列号，自动递增</span>
time stamp          <span class="cm"># 时间戳</span>
string frame_id     <span class="cm"># 坐标系名称</span></code></pre></div>

<h3>常量定义</h3>
<p>msg 文件中还可以定义常量，常量使用 <code>=</code> 赋值，不会出现在消息实例的数据中，但可以通过类名访问：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code>uint8 STATUS_IDLE=0
uint8 STATUS_RUNNING=1
uint8 STATUS_ERROR=2
uint8 status
float64 speed</code></pre></div>

<h2>创建自定义消息的完整步骤</h2>
<p>下面通过一个实例来演示创建自定义消息的完整流程：定义一个"机器人状态"消息，包含机器人ID、位置、速度、电池电量和状态码。</p>

<div class="steps">
<div class="step"><h4>创建 msg 目录和消息文件</h4>
<p>在功能包中创建 <code>msg</code> 目录，并在其中编写 <code>.msg</code> 文件：</p></div>
</div>

<div class="code-block"><span class="code-lang">bash</span><pre><code>cd ~/catkin_ws/src
catkin_create_pkg robot_demo roscpp rospy std_msgs message_generation message_runtime
cd robot_demo
mkdir msg</code></pre></div>

<p>创建 <code>msg/RobotStatus.msg</code>：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code>std_msgs/Header header
string robot_id
float64[3] position
float64[3] velocity
float32 battery_level
uint8 status

uint8 STATUS_IDLE=0
uint8 STATUS_MOVING=1
uint8 STATUS_CHARGING=2
uint8 STATUS_ERROR=3</code></pre></div>

<div class="steps">
<div class="step"><h4>修改 package.xml</h4>
<p>确保包含消息生成相关的依赖：</p></div>
</div>

<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="cm">&lt;!-- 在 package.xml 中添加以下内容 --&gt;</span>
&lt;<span class="kw">build_depend</span>&gt;message_generation&lt;/<span class="kw">build_depend</span>&gt;
&lt;<span class="kw">exec_depend</span>&gt;message_runtime&lt;/<span class="kw">exec_depend</span>&gt;</code></pre></div>

<div class="steps">
<div class="step"><h4>修改 CMakeLists.txt</h4>
<p>需要在几个关键位置添加配置：</p></div>
</div>

<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="cm"># 1. 在 find_package 中添加 message_generation</span>
<span class="fn">find_package</span>(catkin REQUIRED COMPONENTS
  roscpp
  rospy
  std_msgs
  message_generation
)

<span class="cm"># 2. 添加消息文件声明</span>
<span class="fn">add_message_files</span>(
  FILES
  RobotStatus.msg
)

<span class="cm"># 3. 添加消息生成依赖</span>
<span class="fn">generate_messages</span>(
  DEPENDENCIES
  std_msgs
)

<span class="cm"># 4. 在 catkin_package 中声明 message_runtime 依赖</span>
<span class="fn">catkin_package</span>(
  CATKIN_DEPENDS roscpp rospy std_msgs message_runtime
)</code></pre></div>

<div class="steps">
<div class="step"><h4>编译生成消息代码</h4>
<p>回到工作空间根目录执行编译：</p></div>
</div>

<div class="code-block"><span class="code-lang">bash</span><pre><code>cd ~/catkin_ws
catkin_make
source devel/setup.bash</code></pre></div>

<p>编译成功后，ROS 会自动生成对应语言的代码：</p>
<ul>
<li>Python：<code>devel/lib/python2.7/dist-packages/robot_demo/msg/_RobotStatus.py</code></li>
<li>C++：<code>devel/include/robot_demo/RobotStatus.h</code></li>
</ul>

<h2>rosmsg 命令行工具</h2>
<p>编译完成后，可以使用 <code>rosmsg</code> 命令查看消息的定义信息：</p>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 列出所有可用的消息类型</span>
rosmsg list | grep robot_demo
<span class="cm"># robot_demo/RobotStatus</span>

<span class="cm"># 显示消息的字段定义</span>
rosmsg show robot_demo/RobotStatus
<span class="cm"># std_msgs/Header header</span>
<span class="cm">#   uint32 seq</span>
<span class="cm">#   time stamp</span>
<span class="cm">#   string frame_id</span>
<span class="cm"># string robot_id</span>
<span class="cm"># float64[3] position</span>
<span class="cm"># float64[3] velocity</span>
<span class="cm"># float32 battery_level</span>
<span class="cm"># uint8 status</span>
<span class="cm"># uint8 STATUS_IDLE=0</span>
<span class="cm"># uint8 STATUS_MOVING=1</span>
<span class="cm"># uint8 STATUS_CHARGING=2</span>
<span class="cm"># uint8 STATUS_ERROR=3</span>

<span class="cm"># 查看消息的 MD5 校验和（用于类型匹配）</span>
rosmsg md5 robot_demo/RobotStatus

<span class="cm"># 列出包含某个类型的所有消息</span>
rosmsg info robot_demo/RobotStatus</code></pre></div>

<h2>Python 使用自定义消息</h2>
<p>编译并 source 之后，就可以在 Python 节点中导入并使用自定义消息了：</p>

<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="kw">import</span> rospy
<span class="kw">from</span> robot_demo.msg <span class="kw">import</span> RobotStatus

<span class="kw">def</span> <span class="fn">status_publisher</span>():
    pub = rospy.<span class="fn">Publisher</span>(<span class="str">'/robot_status'</span>, RobotStatus, queue_size=<span class="num">10</span>)
    rospy.<span class="fn">init_node</span>(<span class="str">'robot_status_pub'</span>)
    rate = rospy.<span class="fn">Rate</span>(<span class="num">5</span>)  <span class="cm"># 5Hz</span>

    x, y, z = <span class="num">0.0</span>, <span class="num">0.0</span>, <span class="num">0.0</span>
    <span class="kw">while not</span> rospy.<span class="fn">is_shutdown</span>():
        msg = RobotStatus()
        msg.header.stamp = rospy.<span class="fn">Time</span>.<span class="fn">now</span>()
        msg.header.frame_id = <span class="str">"map"</span>
        msg.robot_id = <span class="str">"robot_001"</span>
        msg.position = [x, y, <span class="num">0.0</span>]
        msg.velocity = [<span class="num">0.5</span>, <span class="num">0.0</span>, <span class="num">0.0</span>]
        msg.battery_level = <span class="num">87.5</span>
        msg.status = RobotStatus.STATUS_MOVING  <span class="cm"># 使用常量</span>

        pub.<span class="fn">publish</span>(msg)
        x += <span class="num">0.1</span>
        rate.<span class="fn">sleep</span>()

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="kw">try</span>:
        <span class="fn">status_publisher</span>()
    <span class="kw">except</span> rospy.ROSInterruptException:
        <span class="kw">pass</span></code></pre></div>

<p>订阅自定义消息的节点：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="kw">import</span> rospy
<span class="kw">from</span> robot_demo.msg <span class="kw">import</span> RobotStatus

<span class="kw">def</span> <span class="fn">status_callback</span>(msg):
    rospy.<span class="fn">loginfo</span>(<span class="str">"收到 [%s] 状态: pos=(%.2f,%.2f) 电量=%.1f%%"</span> % (
        msg.robot_id,
        msg.position[<span class="num">0</span>], msg.position[<span class="num">1</span>],
        msg.battery_level
    ))
    <span class="kw">if</span> msg.battery_level &lt; <span class="num">20.0</span>:
        rospy.<span class="fn">logwarn</span>(<span class="str">"电量不足！需要充电"</span>)

<span class="kw">def</span> <span class="fn">status_subscriber</span>():
    rospy.<span class="fn">init_node</span>(<span class="str">'robot_status_sub'</span>)
    rospy.<span class="fn">Subscriber</span>(<span class="str">'/robot_status'</span>, RobotStatus, status_callback)
    rospy.<span class="fn">spin</span>()

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="fn">status_subscriber</span>()</code></pre></div>

<h2>C++ 使用自定义消息</h2>
<div class="code-block"><span class="code-lang">cpp</span><pre><code><span class="pp">#include</span> <span class="str">&lt;ros/ros.h&gt;</span>
<span class="pp">#include</span> <span class="str">"robot_demo/RobotStatus.h"</span>

<span class="type">int</span> <span class="fn">main</span>(<span class="type">int</span> argc, <span class="type">char</span>** argv) {
    ros::<span class="fn">init</span>(argc, argv, <span class="str">"robot_status_pub_cpp"</span>);
    ros::NodeHandle nh;

    ros::Publisher pub = nh.<span class="fn">advertise</span>&lt;robot_demo::RobotStatus&gt;(<span class="str">"/robot_status"</span>, <span class="num">10</span>);
    ros::Rate rate(<span class="num">5</span>);

    <span class="type">double</span> x = <span class="num">0.0</span>;
    <span class="kw">while</span> (ros::<span class="fn">ok</span>()) {
        robot_demo::RobotStatus msg;
        msg.header.stamp = ros::Time::<span class="fn">now</span>();
        msg.header.frame_id = <span class="str">"map"</span>;
        msg.robot_id = <span class="str">"robot_001"</span>;
        msg.position = {x, <span class="num">0.0</span>, <span class="num">0.0</span>};
        msg.velocity = {<span class="num">0.5</span>, <span class="num">0.0</span>, <span class="num">0.0</span>};
        msg.battery_level = <span class="num">87.5f</span>;
        msg.status = robot_demo::RobotStatus::STATUS_MOVING;

        pub.<span class="fn">publish</span>(msg);
        x += <span class="num">0.1</span>;
        rate.<span class="fn">sleep</span>();
        ros::<span class="fn">spinOnce</span>();
    }
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<div class="callout tip">
<p><strong>消息依赖排查</strong>：如果编译时报错找不到自定义消息头文件或模块，通常是因为：1) 没有 source devel/setup.bash；2) CMakeLists.txt 中 generate_messages 的 DEPENDENCIES 漏写了依赖的消息包；3) 没有先编译生成消息就编译使用消息的节点。执行 <code>catkin_make</code> 时会先编译消息再编译节点，确保顺序正确。</p>
</div>

<h2>常用标准消息包</h2>
<p>除了自定义消息，ROS 社区已经定义了大量标准消息包，在自定义消息之前应先检查是否有现成的可用：</p>

<table>
<thead><tr><th>消息包</th><th>用途</th><th>典型消息</th></tr></thead>
<tbody>
<tr><td><code>std_msgs</code></td><td>基础数据类型</td><td>String, Int32, Float64, Bool, Header</td></tr>
<tr><td><code>geometry_msgs</code></td><td>几何数据</td><td>Pose, Twist, Point, Quaternion, Transform, Vector3</td></tr>
<tr><td><code>sensor_msgs</code></td><td>传感器数据</td><td>LaserScan, Image, PointCloud2, Imu, NavSatFix, Joy</td></tr>
<tr><td><code>nav_msgs</code></td><td>导航相关</td><td>Odometry, Path, OccupancyGrid, GetMap</td></tr>
<tr><td><code>actionlib_msgs</code></td><td>Action 通信</td><td>GoalID, GoalStatus</td></tr>
<tr><td><code>trajectory_msgs</code></td><td>轨迹数据</td><td>JointTrajectory, MultiDOFJointTrajectory</td></tr>
<tr><td><code>visualization_msgs</code></td><td>可视化标记</td><td>Marker, MarkerArray, InteractiveMarker</td></tr>
</tbody>
</table>
`
},

"ros-service": {
t: "ROS 服务 (Service) 与请求响应",
cat: "comm",
lv: 1,
pre: 1,
time: "25分钟",
desc: "ROS同步通信机制：一次性请求响应",
body: `<h2>服务 vs 话题：何时用哪种</h2>
<p>话题（Topic）适合<strong>持续的、单向的、异步的</strong>数据流，但在某些场景下我们需要<strong>一次性的、双向的、同步的</strong>通信——客户端发送一个请求，服务端处理后返回一个响应，就像调用函数一样。这就是<strong>服务（Service）</strong>的设计初衷。</p>

<table>
<thead><tr><th>特性</th><th>话题 (Topic)</th><th>服务 (Service)</th></tr></thead>
<tbody>
<tr><td>通信模式</td><td>发布/订阅（多对多）</td><td>请求/响应（一对多，但一个请求对应一个响应）</td></tr>
<tr><td>数据流方向</td><td>单向（发布者→订阅者）</td><td>双向（客户端→服务端→客户端）</td></tr>
<tr><td>同步/异步</td><td>异步（不等待回复）</td><td>同步（调用后等待响应）</td></tr>
<tr><td>持续性</td><td>持续数据流</td><td>一次性调用，完成即结束</td></tr>
<tr><td>适用场景</td><td>传感器数据流、状态广播</td><td>触发动作、查询信息、配置参数</td></tr>
<tr><td>示例</td><td>激光雷达扫描数据</td><td>"抓取物体"、"计算路径"、"获取地图"</td></tr>
</tbody>
</table>

<div class="callout tip">
<p><strong>选择原则</strong>：如果你的通信是"我需要持续接收数据"→用话题；如果是"我需要问一个问题并等待答案"→用服务；如果是"我需要触发一个长时间任务并能看到进度/取消"→用 Action（后续章节会讲）。</p>
</div>

<h2>srv 文件格式</h2>
<p>与消息使用 <code>.msg</code> 文件类似，服务使用 <code>.msg</code> 文件的近亲——<code>.srv</code> 文件来定义请求和响应的数据结构。<code>.srv</code> 文件分为两部分，用 <code>---</code> 分隔：上方是请求（Request）部分，下方是响应（Response）部分。</p>

<p>例如，一个加法服务的 <code>AddTwoInts.srv</code>：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code><span class="cm"># 请求部分（客户端发送给服务端）</span>
int64 a
int64 b
---
<span class="cm"># 响应部分（服务端返回给客户端）</span>
int64 sum</code></pre></div>

<p>srv 文件的字段类型与 msg 完全一致，支持基础类型、数组、嵌套消息、Header 等。</p>

<h2>rosservice 命令行工具</h2>
<p><code>rosservice</code> 是调试服务通信的命令行工具，功能与 <code>rostopic</code> 类似但面向服务：</p>

<table>
<thead><tr><th>命令</th><th>功能</th></tr></thead>
<tbody>
<tr><td><code>rosservice list</code></td><td>列出当前所有活跃的服务</td></tr>
<tr><td><code>rosservice info &lt;svc&gt;</code></td><td>查看服务的节点、类型和URI</td></tr>
<tr><td><code>rosservice type &lt;svc&gt;</code></td><td>查看服务的 srv 类型</td></tr>
<tr><td><code>rosservice find &lt;type&gt;</code></td><td>按类型查找服务</td></tr>
<tr><td><code>rosservice call &lt;svc&gt; [args]</code></td><td>从命令行调用服务</td></tr>
<tr><td><code>rosservice args &lt;svc&gt;</code></td><td>查看服务需要的参数</td></tr>
<tr><td><code>rosservice uri &lt;svc&gt;</code></td><td>查看服务的 ROSRPC URI</td></tr>
</tbody>
</table>

<h2>创建自定义服务：加法服务完整示例</h2>
<p>我们以经典的"两数相加"服务为例，完整演示从定义 srv 到编写服务端/客户端的全过程。</p>

<h3>步骤 1：创建 srv 文件</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code>cd ~/catkin_ws/src
catkin_create_pkg add_two_ints roscpp rospy std_msgs message_generation message_runtime
cd add_two_ints
mkdir srv</code></pre></div>

<p>创建 <code>srv/AddTwoInts.srv</code>：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code>int64 a
int64 b
---
int64 sum</code></pre></div>

<h3>步骤 2：修改 CMakeLists.txt</h3>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="fn">find_package</span>(catkin REQUIRED COMPONENTS
  roscpp rospy std_msgs message_generation
)

<span class="fn">add_service_files</span>(
  FILES
  AddTwoInts.srv
)

<span class="fn">generate_messages</span>(
  DEPENDENCIES
  std_msgs
)

<span class="fn">catkin_package</span>(
  CATKIN_DEPENDS roscpp rospy std_msgs message_runtime
)</code></pre></div>

<h3>步骤 3：修改 package.xml</h3>
<p>确保 package.xml 中包含 message_generation 和 message_runtime 依赖（与自定义消息相同）。</p>

<h3>步骤 4：编译</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code>cd ~/catkin_ws
catkin_make
source devel/setup.bash</code></pre></div>

<h3>步骤 5：Python 服务端</h3>
<p>创建 <code>scripts/add_two_ints_server.py</code>：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="kw">from</span> add_two_ints.srv <span class="kw">import</span> AddTwoInts, AddTwoIntsResponse
<span class="kw">import</span> rospy

<span class="kw">def</span> <span class="fn">handle_add_two_ints</span>(req):
    <span class="cm"># req 包含请求字段 a 和 b</span>
    result = req.a + req.b
    rospy.<span class="fn">loginfo</span>(<span class="str">"计算: %d + %d = %d"</span> % (req.a, req.b, result))
    <span class="cm"># 返回响应对象</span>
    <span class="kw">return</span> AddTwoIntsResponse(result)

<span class="kw">def</span> <span class="fn">add_two_ints_server</span>():
    rospy.<span class="fn">init_node</span>(<span class="str">'add_two_ints_server'</span>)
    <span class="cm"># 创建服务：服务名、srv类型、回调函数</span>
    s = rospy.<span class="fn">Service</span>(<span class="str">'add_two_ints'</span>, AddTwoInts, handle_add_two_ints)
    rospy.<span class="fn">loginfo</span>(<span class="str">"加法服务已就绪，等待请求..."</span>)
    rospy.<span class="fn">spin</span>()

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="fn">add_two_ints_server</span>()</code></pre></div>

<h3>步骤 6：Python 客户端</h3>
<p>创建 <code>scripts/add_two_ints_client.py</code>：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="kw">import</span> sys
<span class="kw">import</span> rospy
<span class="kw">from</span> add_two_ints.srv <span class="kw">import</span> AddTwoInts, AddTwoIntsRequest

<span class="kw">def</span> <span class="fn">add_two_ints_client</span>(x, y):
    rospy.<span class="fn">init_node</span>(<span class="str">'add_two_ints_client'</span>)
    <span class="cm"># 等待服务可用</span>
    rospy.<span class="fn">wait_for_service</span>(<span class="str">'add_two_ints'</span>)
    <span class="kw">try</span>:
        <span class="cm"># 创建服务代理（相当于远程函数调用）</span>
        add_two_ints = rospy.<span class="fn">ServiceProxy</span>(<span class="str">'add_two_ints'</span>, AddTwoInts)
        <span class="cm"># 调用服务，传入请求参数</span>
        resp = <span class="fn">add_two_ints</span>(x, y)
        <span class="kw">return</span> resp.sum
    <span class="kw">except</span> rospy.ServiceException <span class="kw">as</span> e:
        rospy.<span class="fn">logerr</span>(<span class="str">"服务调用失败: %s"</span> % e)

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="kw">if</span> len(sys.argv) == <span class="num">3</span>:
        a = int(sys.argv[<span class="num">1</span>])
        b = int(sys.argv[<span class="num">2</span>])
    <span class="kw">else</span>:
        a, b = <span class="num">3</span>, <span class="num">5</span>
    <span class="fn">print</span>(<span class="str">"请求: %d + %d = %d"</span> % (a, b, add_two_ints_client(a, b)))</code></pre></div>

<h3>步骤 7：C++ 服务端</h3>
<p>创建 <code>src/add_two_ints_server.cpp</code>：</p>
<div class="code-block"><span class="code-lang">cpp</span><pre><code><span class="pp">#include</span> <span class="str">&lt;ros/ros.h&gt;</span>
<span class="pp">#include</span> <span class="str">"add_two_ints/AddTwoInts.h"</span>

<span class="type">bool</span> <span class="fn">add</span>(add_two_ints::AddTwoInts::Request &amp;req,
         add_two_ints::AddTwoInts::Response &amp;res) {
    res.sum = req.a + req.b;
    ROS_INFO(<span class="str">"计算: %ld + %ld = %ld"</span>, (long)req.a, (long)req.b, (long)res.sum);
    <span class="kw">return</span> <span class="kw">true</span>;
}

<span class="type">int</span> <span class="fn">main</span>(<span class="type">int</span> argc, <span class="type">char</span>** argv) {
    ros::<span class="fn">init</span>(argc, argv, <span class="str">"add_two_ints_server"</span>);
    ros::NodeHandle nh;

    ros::ServiceServer service = nh.<span class="fn">advertiseService</span>(<span class="str">"add_two_ints"</span>, add);
    ROS_INFO(<span class="str">"加法服务已就绪，等待请求..."</span>);
    ros::<span class="fn">spin</span>();

    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<h3>步骤 8：C++ 客户端</h3>
<p>创建 <code>src/add_two_ints_client.cpp</code>：</p>
<div class="code-block"><span class="code-lang">cpp</span><pre><code><span class="pp">#include</span> <span class="str">&lt;ros/ros.h&gt;</span>
<span class="pp">#include</span> <span class="str">"add_two_ints/AddTwoInts.h"</span>
<span class="pp">#include</span> <span class="str">&lt;cstdlib&gt;</span>

<span class="type">int</span> <span class="fn">main</span>(<span class="type">int</span> argc, <span class="type">char</span>** argv) {
    ros::<span class="fn">init</span>(argc, argv, <span class="str">"add_two_ints_client"</span>);
    <span class="kw">if</span> (argc != <span class="num">3</span>) {
        ROS_INFO(<span class="str">"用法: add_two_ints_client X Y"</span>);
        <span class="kw">return</span> <span class="num">1</span>;
    }

    ros::NodeHandle nh;
    ros::ServiceClient client = nh.<span class="fn">serviceClient</span>&lt;add_two_ints::AddTwoInts&gt;(<span class="str">"add_two_ints"</span>);

    add_two_ints::AddTwoInts srv;
    srv.request.a = <span class="fn">atoll</span>(argv[<span class="num">1</span>]);
    srv.request.b = <span class="fn">atoll</span>(argv[<span class="num">2</span>]);

    <span class="kw">if</span> (client.<span class="fn">call</span>(srv)) {
        ROS_INFO(<span class="str">"计算结果: %ld"</span>, (long)srv.response.sum);
    } <span class="kw">else</span> {
        ROS_ERROR(<span class="str">"服务调用失败"</span>);
        <span class="kw">return</span> <span class="num">1</span>;
    }
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<h3>步骤 9：在 CMakeLists.txt 中添加可执行文件</h3>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="fn">add_executable</span>(add_server src/add_two_ints_server.cpp)
<span class="fn">target_link_libraries</span>(add_server ${$}{catkin_LIBRARIES})
<span class="fn">add_dependencies</span>(add_server ${$}{${$}{PROJECT_NAME}_EXPORTED_TARGETS} ${$}{catkin_EXPORTED_TARGETS})

<span class="fn">add_executable</span>(add_client src/add_two_ints_client.cpp)
<span class="fn">target_link_libraries</span>(add_client ${$}{catkin_LIBRARIES})
<span class="fn">add_dependencies</span>(add_client ${$}{${$}{PROJECT_NAME}_EXPORTED_TARGETS} ${$}{catkin_EXPORTED_TARGETS})</code></pre></div>

<h3>步骤 10：运行测试</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 给 Python 脚本加执行权限</span>
chmod +x scripts/add_two_ints_server.py scripts/add_two_ints_client.py

<span class="cm"># 编译</span>
cd ~/catkin_ws &amp;&amp; catkin_make &amp;&amp; source devel/setup.bash

<span class="cm"># 终端1：roscore</span>
roscore

<span class="cm"># 终端2：启动服务端（Python版）</span>
rosrun add_two_ints add_two_ints_server.py

<span class="cm"># 终端3：命令行直接调用</span>
rosservice call /add_two_ints <span class="str">"a: 3</span>
<span class="str">b: 5"</span>
<span class="cm"># sum: 8</span>

<span class="cm"># 终端3：或使用客户端节点</span>
rosrun add_two_ints add_two_ints_client.py 10 20
<span class="cm"># 请求: 10 + 20 = 30</span></code></pre></div>

<h2>rosparam 与服务的关系</h2>
<p>你可能注意到 <code>rosservice list</code> 会列出很多 <code>/xxx/get_loggers</code> 和 <code>/xxx/set_logger_level</code> 服务，这些是每个节点自动提供的内置服务。另外还有参数服务器相关的服务（<code>/rosout/set_logger_level</code> 等）。参数服务器虽然通过服务调用实现，但它有专门的工具和 API，下一章我们详细讨论。</p>

<div class="callout warn">
<p><strong>服务阻塞问题</strong>：服务回调是在调用线程中同步执行的（rospy 会为每个请求开新线程，roscpp 默认在回调队列中串行处理）。如果服务处理时间较长（如复杂计算、硬件操作），考虑使用 Action 代替 Service，避免长时间阻塞。同时，客户端调用服务时也是阻塞等待响应的，不要在关键回调中调用耗时服务。</p>
</div>

<h2>常用 ROS 内置服务</h2>
<p>ROS 自带了一些常用服务，可以直接使用：</p>
<table>
<thead><tr><th>服务</th><th>类型</th><th>功能</th></tr></thead>
<tbody>
<tr><td><code>/rosout/set_logger_level</code></td><td>roscpp/SetLoggerLevel</td><td>动态调整节点日志级别</td></tr>
<tr><td><code>/static_map</code>（需map_server）</td><td>nav_msgs/GetMap</td><td>获取当前静态地图</td></tr>
<tr><td><code>/move_base</code>相关</td><td>nav_msgs/GetPlan等</td><td>导航规划服务</td></tr>
<tr><td><code>/tf2_frames</code></td><td>tf2_msgs/FrameGraph</td><td>获取TF坐标变换树</td></tr>
</tbody>
</table>
`
},

"ros-parameter": {
t: "ROS 参数服务器",
cat: "comm",
lv: 1,
pre: 1,
time: "15分钟",
desc: "使用参数服务器存储和查询全局配置",
body: `<h2>参数服务器的概念</h2>
<p><strong>参数服务器（Parameter Server）</strong>是 ROS 中一个共享的、多变量的字典服务，运行在 <strong>ROS Master</strong> 内部。节点可以在运行时从参数服务器读取和写入参数，用来存储配置信息、全局参数等不适合通过话题或服务传递的数据。</p>
<p>参数服务器的特点：</p>
<ul>
<li><strong>集中存储</strong>：所有参数都保存在 Master 进程中，全局可访问。</li>
<li><strong>静态为主</strong>：适合存储不频繁变化的配置数据，不适合高速动态数据。</li>
<li><strong>XMLRPC 实现</strong>：底层通过 XMLRPC 协议访问，不是高性能的实时通信方式。</li>
<li><strong>支持多类型</strong>：可以存储整数、浮点数、字符串、布尔值、列表、字典等。</li>
</ul>

<div class="callout warn">
<p><strong>注意</strong>：参数服务器不是高速通信机制！不要用它来传递传感器数据或实时控制命令（那是话题的工作）。它的典型用途包括：节点配置参数、机器人尺寸参数、调试开关、主题名称配置等启动时设置、运行中偶尔修改的数据。</p>
</div>

<h2>支持的数据类型</h2>
<p>参数服务器支持以下数据类型：</p>
<table>
<thead><tr><th>类型</th><th>YAML 示例</th><th>说明</th></tr></thead>
<tbody>
<tr><td>整数</td><td><code>count: 10</code></td><td>32位整数</td></tr>
<tr><td>浮点数</td><td><code>pi: 3.14159</code></td><td>双精度浮点</td></tr>
<tr><td>布尔值</td><td><code>enabled: true</code></td><td>true/false</td></tr>
<tr><td>字符串</td><td><code>name: "robot1"</code></td><td>文本字符串</td></tr>
<tr><td>列表</td><td><code>sensors: [lidar, camera, imu]</code></td><td>同类型或混合类型数组</td></tr>
<tr><td>字典</td><td><code>robot: {name: r1, type: diff}</code></td><td>嵌套的键值对结构</td></tr>
</tbody>
</table>

<h2>rosparam 命令行工具</h2>
<p><code>rosparam</code> 是操作参数服务器的命令行工具：</p>

<table>
<thead><tr><th>命令</th><th>功能</th><th>示例</th></tr></thead>
<tbody>
<tr><td><code>rosparam list</code></td><td>列出所有参数</td><td>rosparam list</td></tr>
<tr><td><code>rosparam get &lt;param&gt;</code></td><td>获取参数值</td><td>rosparam get /rosdistro</td></tr>
<tr><td><code>rosparam set &lt;param&gt; &lt;value&gt;</code></td><td>设置参数值</td><td>rosparam set /max_speed 1.5</td></tr>
<tr><td><code>rosparam delete &lt;param&gt;</code></td><td>删除参数</td><td>rosparam delete /temp_param</td></tr>
<tr><td><code>rosparam load &lt;file&gt;</code></td><td>从YAML文件加载参数</td><td>rosparam load config.yaml</td></tr>
<tr><td><code>rosparam dump &lt;file&gt;</code></td><td>将参数导出到YAML文件</td><td>rosparam dump params.yaml</td></tr>
</tbody>
</table>

<h3>命令行使用示例</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 列出当前所有参数</span>
rosparam list
<span class="cm"># /rosdistro</span>
<span class="cm"># /roslaunch/uris/host_localhost__34567</span>
<span class="cm"># /rosversion</span>
<span class="cm"># /run_id</span>

<span class="cm"># 获取参数</span>
rosparam get /rosdistro       <span class="cm"># 'noetic'</span>
rosparam get /                <span class="cm"># 获取根命名空间下所有参数（字典形式）</span>

<span class="cm"># 设置参数</span>
rosparam set /robot_name "turtlebot"
rosparam set /max_speed 1.2
rosparam set /use_sim_time true

<span class="cm"># 删除参数</span>
rosparam delete /robot_name</code></pre></div>

<h2>YAML 文件加载参数</h2>
<p>对于复杂的参数配置，直接用 <code>rosparam set</code> 逐条设置很繁琐，更好的方式是编写 YAML 配置文件然后批量加载。</p>

<p>创建一个配置文件 <code>config/robot_params.yaml</code>：</p>
<div class="code-block"><span class="code-lang">yaml</span><pre><code><span class="cm"># 机器人基本参数</span>
robot_name: <span class="str">"turtlebot3"</span>
wheel_radius: <span class="num">0.033</span>      <span class="cm"># 轮子半径（米）</span>
wheel_base: <span class="num">0.16</span>         <span class="cm"># 轮距（米）</span>
max_linear_speed: <span class="num">0.22</span>   <span class="cm"># 最大线速度 m/s</span>
max_angular_speed: <span class="num">2.84</span>  <span class="cm"># 最大角速度 rad/s</span>

<span class="cm"># 传感器配置</span>
sensors:
  lidar:
    enabled: <span class="kw">true</span>
    topic: <span class="str">"/scan"</span>
    frame_id: <span class="str">"base_scan"</span>
    range_min: <span class="num">0.12</span>
    range_max: <span class="num">3.5</span>
  camera:
    enabled: <span class="kw">true</span>
    resolution: [<span class="num">640</span>, <span class="num">480</span>]
    fps: <span class="num">30</span>

<span class="cm"># 调试开关</span>
debug:
  verbose_logging: <span class="kw">false</span>
  visualize: <span class="kw">true</span></code></pre></div>

<p>加载和导出：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 加载 YAML 文件到参数服务器</span>
rosparam load config/robot_params.yaml

<span class="cm"># 加载到指定命名空间</span>
rosparam load config/robot_params.yaml /robot1

<span class="cm"># 导出当前所有参数到文件</span>
rosparam dump backup_params.yaml

<span class="cm"># 导出指定命名空间</span>
rosparam dump robot1_params.yaml /robot1</code></pre></div>

<h2>在代码中读写参数</h2>

<h3>Python (rospy)</h3>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="kw">import</span> rospy

rospy.<span class="fn">init_node</span>(<span class="str">'param_demo'</span>)

<span class="cm"># 获取参数（带默认值）</span>
robot_name = rospy.<span class="fn">get_param</span>(<span class="str">'/robot_name'</span>, <span class="str">'default_robot'</span>)
max_speed = rospy.<span class="fn">get_param</span>(<span class="str">'/max_linear_speed'</span>, <span class="num">0.5</span>)

<span class="cm"># 获取私有参数（在节点的私有命名空间下）</span>
<span class="cm"># 对应 launch 文件中 &lt;node&gt; 内的 &lt;param&gt;</span>
port = rospy.<span class="fn">get_param</span>(<span class="str">'~port'</span>, <span class="num">8080</span>)

<span class="cm"># 设置参数</span>
rospy.<span class="fn">set_param</span>(<span class="str">'/current_status'</span>, <span class="str">'idle'</span>)
rospy.<span class="fn">set_param</span>(<span class="str">'/goal_position'</span>, [<span class="num">1.0</span>, <span class="num">2.0</span>, <span class="num">0.0</span>])

<span class="cm"># 检查参数是否存在</span>
<span class="kw">if</span> rospy.<span class="fn">has_param</span>(<span class="str">'/robot_name'</span>):
    rospy.<span class="fn">loginfo</span>(<span class="str">"机器人名称: %s"</span> % robot_name)

<span class="cm"># 删除参数</span>
rospy.<span class="fn">delete_param</span>(<span class="str">'/temp_param'</span>)

<span class="cm"># 搜索参数（向上查找命名空间）</span>
full_name = rospy.<span class="fn">search_param</span>(<span class="str">'robot_name'</span>)

<span class="cm"># 获取参数名称列表</span>
all_params = rospy.<span class="fn">get_param_names</span>()
rospy.<span class="fn">loginfo</span>(<span class="str">"当前参数数量: %d"</span> % len(all_params))</code></pre></div>

<h3>C++ (roscpp)</h3>
<div class="code-block"><span class="code-lang">cpp</span><pre><code><span class="pp">#include</span> <span class="str">&lt;ros/ros.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;string&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;vector&gt;</span>

<span class="type">int</span> <span class="fn">main</span>(<span class="type">int</span> argc, <span class="type">char</span>** argv) {
    ros::<span class="fn">init</span>(argc, argv, <span class="str">"param_demo_cpp"</span>);
    ros::NodeHandle nh;
    ros::NodeHandle <span class="fn">private_nh</span>(<span class="str">"~"</span>);  <span class="cm">// 私有命名空间句柄</span>

    <span class="cm">// 获取参数（带默认值）</span>
    std::string robot_name;
    nh.<span class="fn">param</span>&lt;std::string&gt;(<span class="str">"/robot_name"</span>, robot_name, <span class="str">"default_robot"</span>);

    <span class="type">double</span> max_speed;
    nh.<span class="fn">param</span>(<span class="str">"/max_linear_speed"</span>, max_speed, <span class="num">0.5</span>);

    <span class="cm">// 使用私有句柄获取私有参数</span>
    <span class="type">int</span> port;
    private_nh.<span class="fn">param</span>(<span class="str">"port"</span>, port, <span class="num">8080</span>);

    <span class="cm">// 另一种获取方式：getParam 返回 bool 表示是否成功</span>
    std::string name;
    <span class="kw">if</span> (nh.<span class="fn">getParam</span>(<span class="str">"/robot_name"</span>, name)) {
        ROS_INFO(<span class="str">"机器人名称: %s"</span>, name.c_str());
    } <span class="kw">else</span> {
        ROS_WARN(<span class="str">"未设置 /robot_name 参数"</span>);
    }

    <span class="cm">// 设置参数</span>
    nh.<span class="fn">setParam</span>(<span class="str">"/current_status"</span>, <span class="str">"idle"</span>);

    <span class="cm">// 检查参数是否存在</span>
    <span class="kw">if</span> (nh.<span class="fn">hasParam</span>(<span class="str">"/robot_name"</span>)) {
        ROS_INFO(<span class="str">"参数存在"</span>);
    }

    <span class="cm">// 删除参数</span>
    nh.<span class="fn">deleteParam</span>(<span class="str">"/temp_param"</span>);

    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<h2>参数的命名空间</h2>
<p>与话题和节点类似，参数也支持命名空间，这在多机器人场景中非常有用：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 设置不同机器人的参数</span>
rosparam set /robot1/max_speed 1.0
rosparam set /robot2/max_speed 1.5

<span class="cm"># 查看</span>
rosparam get /robot1/max_speed  <span class="cm"># 1.0</span>
rosparam get /robot2/max_speed  <span class="cm"># 1.5</span></code></pre></div>

<h2>参数使用最佳实践</h2>
<div class="callout tip">
<p><strong>最佳实践总结</strong>：</p>
<ul>
<li><strong>配置与代码分离</strong>：将可调参数放在 YAML 文件或 launch 文件中，不要硬编码在代码里。</li>
<li><strong>总是提供默认值</strong>：使用 <code>get_param('name', default)</code> 而非无默认值版本，提高节点健壮性。</li>
<li><strong>私有参数放 <code>~</code> 下</strong>：节点自己的配置使用私有命名空间（<code>~param_name</code>），避免与其他节点冲突。</li>
<li><strong>启动时设置，运行中少改</strong>：参数主要用于启动配置，运行时频繁变化的状态应该用话题传递。</li>
<li><strong>不要存大数据</strong>：参数服务器不适合存储地图、点云等大量数据，应该用话题或服务传输。</li>
<li><strong>use_sim_time</strong>：当需要回放 bag 文件或使用仿真时，设置 <code>/use_sim_time=true</code>，节点会使用 <code>/clock</code> 话题的时间而非系统时钟。</li>
</ul>
</div>

<p>在后续的 launch 文件章节中，我们将学习如何通过 <code>&lt;param&gt;</code> 和 <code>&lt;rosparam&gt;</code> 标签在 launch 文件中方便地设置和加载参数。</p>
`
},

"ros-publisher-subscriber": {
t: "Publisher 与 Subscriber 编程",
cat: "comm-code",
lv: 1,
pre: 2,
time: "40分钟",
desc: "用Python和C++编写完整的发布订阅节点",
body: `<h2>概述</h2>
<p>本章我们将通过完整的代码示例，深入学习如何用 Python 和 C++ 编写 Publisher（发布者）和 Subscriber（订阅者）节点。我们将实现一个经典的"速度发布-里程计订阅"示例，模拟机器人移动并观察数据变化。</p>

<p>本章前置知识：</p>
<ul>
<li>已理解 ROS 节点概念和 <code>rospy.init_node()</code> / <code>ros::init()</code> 的用法</li>
<li>已理解话题（Topic）的发布/订阅模型</li>
<li>已了解 <code>std_msgs</code> 基本消息类型</li>
</ul>

<h2>Python 版 Publisher</h2>
<p>我们来编写一个发布机器人速度指令（Twist 消息）的节点，使用定时器回调实现周期性发布。</p>

<p>首先创建工作空间和功能包（如果还没有的话）：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>mkdir -p ~/catkin_ws/src
cd ~/catkin_ws/src
catkin_create_pkg pubsub_demo rospy roscpp std_msgs geometry_msgs
cd pubsub_demo
mkdir scripts
cd ~/catkin_ws
catkin_make
source devel/setup.bash</code></pre></div>

<p>创建 <code>scripts/velocity_publisher.py</code>：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="cm">"""
速度指令发布节点
周期性地向 /cmd_vel 话题发布 geometry_msgs/Twist 消息，
控制机器人做圆周运动。
"""</span>
<span class="kw">import</span> rospy
<span class="kw">from</span> geometry_msgs.msg <span class="kw">import</span> Twist

<span class="kw">class</span> <span class="type">VelocityPublisher</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        <span class="cm"># 创建 Publisher：话题名、消息类型、队列大小</span>
        self.pub = rospy.<span class="fn">Publisher</span>(<span class="str">'/cmd_vel'</span>, Twist, queue_size=<span class="num">10</span>)

        <span class="cm"># 从参数服务器读取速度参数（带默认值）</span>
        self.linear_speed = rospy.<span class="fn">get_param</span>(<span class="str">'~linear_speed'</span>, <span class="num">0.5</span>)   <span class="cm"># m/s</span>
        self.angular_speed = rospy.<span class="fn">get_param</span>(<span class="str">'~angular_speed'</span>, <span class="num">0.5</span>)  <span class="cm"># rad/s</span>
        self.publish_rate = rospy.<span class="fn">get_param</span>(<span class="str">'~rate'</span>, <span class="num">10</span>)  <span class="cm"># Hz</span>

        <span class="cm"># 使用 rospy.Timer 实现定时器回调（比 while+sleep 更优雅）</span>
        self.timer = rospy.<span class="fn">Timer</span>(
            rospy.<span class="fn">Duration</span>(<span class="num">1.0</span> / self.publish_rate),
            self.timer_callback
        )
        rospy.<span class="fn">loginfo</span>(<span class="str">"速度发布节点已启动: lin=%.2f ang=%.2f rate=%dHz"</span> % (
            self.linear_speed, self.angular_speed, self.publish_rate
        ))

    <span class="kw">def</span> <span class="fn">timer_callback</span>(self, event):
        <span class="cm">"""定时器回调：每次触发时发布一条速度指令"""</span>
        msg = Twist()
        msg.linear.x = self.linear_speed
        msg.linear.y = <span class="num">0.0</span>
        msg.linear.z = <span class="num">0.0</span>
        msg.angular.x = <span class="num">0.0</span>
        msg.angular.y = <span class="num">0.0</span>
        msg.angular.z = self.angular_speed
        self.pub.<span class="fn">publish</span>(msg)

<span class="kw">def</span> <span class="fn">main</span>():
    rospy.<span class="fn">init_node</span>(<span class="str">'velocity_publisher'</span>, anonymous=<span class="kw">False</span>)
    node = VelocityPublisher()
    rospy.<span class="fn">spin</span>()

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="kw">try</span>:
        <span class="fn">main</span>()
    <span class="kw">except</span> rospy.ROSInterruptException:
        <span class="kw">pass</span></code></pre></div>

<div class="callout tip">
<p><strong>Timer vs while+Rate.sleep()</strong>：两种方式都可以实现周期性执行。<code>rospy.Timer</code> 的优势是不阻塞主线程，可以同时响应其他回调；<code>while not is_shutdown()</code> 方式更直观，适合简单场景。两者都很常用。</p>
</div>

<h2>Python 版 Subscriber</h2>
<p>创建 <code>scripts/odometry_subscriber.py</code>，订阅模拟的里程计话题并打印位置：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="cm">"""
里程计订阅节点
订阅 /odom 话题（nav_msgs/Odometry），实时显示机器人位姿。
同时订阅 /cmd_vel 话题，显示当前速度指令。
"""</span>
<span class="kw">import</span> rospy
<span class="kw">import</span> math
<span class="kw">from</span> nav_msgs.msg <span class="kw">import</span> Odometry
<span class="kw">from</span> geometry_msgs.msg <span class="kw">import</span> Twist

<span class="kw">class</span> <span class="type">OdometrySubscriber</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        <span class="cm"># 订阅里程计话题</span>
        self.odom_sub = rospy.<span class="fn">Subscriber</span>(
            <span class="str">'/odom'</span>, Odometry, self.odom_callback
        )
        <span class="cm"># 订阅速度指令话题</span>
        self.cmd_sub = rospy.<span class="fn">Subscriber</span>(
            <span class="str">'/cmd_vel'</span>, Twist, self.cmd_callback
        )
        self.current_cmd = Twist()
        rospy.<span class="fn">loginfo</span>(<span class="str">"里程计订阅节点已启动"</span>)

    <span class="kw">def</span> <span class="fn">odom_callback</span>(self, msg):
        <span class="cm">"""里程计消息回调：每条消息触发一次"""</span>
        x = msg.pose.pose.position.x
        y = msg.pose.pose.position.y
        <span class="cm"># 从四元数计算偏航角（简化版）</span>
        qz = msg.pose.pose.orientation.z
        qw = msg.pose.pose.orientation.w
        yaw = <span class="num">2.0</span> * math.<span class="fn">atan2</span>(qz, qw)

        vx = msg.twist.twist.linear.x
        wz = msg.twist.twist.angular.z

        rospy.<span class="fn">loginfo</span>(
            <span class="str">"位置: (%.2f, %.2f) 朝向: %.2f rad | 速度: lin=%.2f ang=%.2f"</span>
            % (x, y, yaw, vx, wz)
        )

    <span class="kw">def</span> <span class="fn">cmd_callback</span>(self, msg):
        <span class="cm">"""速度指令回调"""</span>
        self.current_cmd = msg
        rospy.<span class="fn">logdebug</span>(<span class="str">"收到速度指令: lin=%.2f ang=%.2f"</span> % (
            msg.linear.x, msg.angular.z
        ))

<span class="kw">def</span> <span class="fn">main</span>():
    rospy.<span class="fn">init_node</span>(<span class="str">'odometry_subscriber'</span>)
    <span class="cm"># 设置日志级别为 DEBUG，可以看到更多信息</span>
    rospy.<span class="fn">logdebug</span>(<span class="str">"调试模式已开启"</span>)
    node = OdometrySubscriber()
    rospy.<span class="fn">spin</span>()

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="fn">main</span>()</code></pre></div>

<h2>C++ 版 Publisher</h2>
<p>创建 <code>src/velocity_publisher.cpp</code>：</p>
<div class="code-block"><span class="code-lang">cpp</span><pre><code><span class="pp">#include</span> <span class="str">&lt;ros/ros.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;geometry_msgs/Twist.h&gt;</span>

<span class="cm">// 全局或类成员变量，这里用全局简单演示</span>
ros::Publisher cmd_pub;
<span class="type">double</span> g_linear_speed = <span class="num">0.5</span>;
<span class="type">double</span> g_angular_speed = <span class="num">0.5</span>;

<span class="type">void</span> <span class="fn">timerCallback</span>(<span class="kw">const</span> ros::TimerEvent&amp; event) {
    geometry_msgs::Twist msg;
    msg.linear.x = g_linear_speed;
    msg.angular.z = g_angular_speed;
    cmd_pub.<span class="fn">publish</span>(msg);
}

<span class="type">int</span> <span class="fn">main</span>(<span class="type">int</span> argc, <span class="type">char</span>** argv) {
    ros::<span class="fn">init</span>(argc, argv, <span class="str">"velocity_publisher_cpp"</span>);
    ros::NodeHandle nh;
    ros::NodeHandle <span class="fn">ph</span>(<span class="str">"~"</span>);  <span class="cm">// 私有句柄，用于读取 ~ 参数</span>

    <span class="cm">// 读取参数</span>
    ph.<span class="fn">param</span>(<span class="str">"linear_speed"</span>, g_linear_speed, <span class="num">0.5</span>);
    ph.<span class="fn">param</span>(<span class="str">"angular_speed"</span>, g_angular_speed, <span class="num">0.5</span>);
    <span class="type">double</span> rate_hz;
    ph.<span class="fn">param</span>(<span class="str">"rate"</span>, rate_hz, <span class="num">10.0</span>);

    <span class="cm">// 广告（发布）话题</span>
    cmd_pub = nh.<span class="fn">advertise</span>&lt;geometry_msgs::Twist&gt;(<span class="str">"/cmd_vel"</span>, <span class="num">10</span>);

    <span class="cm">// 创建定时器</span>
    ros::Timer timer = nh.<span class="fn">createTimer</span>(ros::<span class="fn">Duration</span>(<span class="num">1.0</span>/rate_hz), timerCallback);

    ROS_INFO(<span class="str">"速度发布节点(C++)已启动: lin=%.2f ang=%.2f rate=%.0fHz"</span>,
             g_linear_speed, g_angular_speed, rate_hz);

    ros::<span class="fn">spin</span>();
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<h2>C++ 版 Subscriber</h2>
<p>创建 <code>src/odometry_subscriber.cpp</code>：</p>
<div class="code-block"><span class="code-lang">cpp</span><pre><code><span class="pp">#include</span> <span class="str">&lt;ros/ros.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;nav_msgs/Odometry.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;geometry_msgs/Twist.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;cmath&gt;</span>

<span class="type">void</span> <span class="fn">odomCallback</span>(<span class="kw">const</span> nav_msgs::Odometry::ConstPtr&amp; msg) {
    <span class="type">double</span> x = msg-&gt;pose.pose.position.x;
    <span class="type">double</span> y = msg-&gt;pose.pose.position.y;
    <span class="type">double</span> qz = msg-&gt;pose.pose.orientation.z;
    <span class="type">double</span> qw = msg-&gt;pose.pose.orientation.w;
    <span class="type">double</span> yaw = <span class="num">2.0</span> * <span class="fn">atan2</span>(qz, qw);

    <span class="type">double</span> vx = msg-&gt;twist.twist.linear.x;
    <span class="type">double</span> wz = msg-&gt;twist.twist.angular.z;

    ROS_INFO(<span class="str">"位置: (%.2f, %.2f) 朝向: %.2f rad | 速度: lin=%.2f ang=%.2f"</span>,
             x, y, yaw, vx, wz);
}

<span class="type">void</span> <span class="fn">cmdCallback</span>(<span class="kw">const</span> geometry_msgs::Twist::ConstPtr&amp; msg) {
    ROS_DEBUG(<span class="str">"收到速度指令: lin=%.2f ang=%.2f"</span>,
              msg-&gt;linear.x, msg-&gt;angular.z);
}

<span class="type">int</span> <span class="fn">main</span>(<span class="type">int</span> argc, <span class="type">char</span>** argv) {
    ros::<span class="fn">init</span>(argc, argv, <span class="str">"odometry_subscriber_cpp"</span>);
    ros::NodeHandle nh;

    ros::Subscriber odom_sub = nh.<span class="fn">subscribe</span>(<span class="str">"/odom"</span>, <span class="num">10</span>, odomCallback);
    ros::Subscriber cmd_sub = nh.<span class="fn">subscribe</span>(<span class="str">"/cmd_vel"</span>, <span class="num">10</span>, cmdCallback);

    <span class="cm">// 设置日志级别（可选，仅DEBUG时需要）</span>
    <span class="cm">// ros::console::set_logger_level(ROSCONSOLE_DEFAULT_NAME, ros::console::levels::Debug);</span>

    ROS_INFO(<span class="str">"里程计订阅节点(C++)已启动"</span>);
    ros::<span class="fn">spin</span>();
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<h2>同时收发的节点示例</h2>
<p>很多时候一个节点既需要订阅某些话题，又需要发布其他话题。下面是一个"中继节点"：订阅速度指令，乘以一个增益系数后重新发布（类似安全限速器）：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="kw">import</span> rospy
<span class="kw">from</span> geometry_msgs.msg <span class="kw">import</span> Twist

<span class="kw">class</span> <span class="type">SpeedLimiter</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        self.max_linear = rospy.<span class="fn">get_param</span>(<span class="str">'~max_linear'</span>, <span class="num">0.3</span>)
        self.max_angular = rospy.<span class="fn">get_param</span>(<span class="str">'~max_angular'</span>, <span class="num">1.0</span>)
        self.pub = rospy.<span class="fn">Publisher</span>(<span class="str">'/cmd_vel_safe'</span>, Twist, queue_size=<span class="num">10</span>)
        self.sub = rospy.<span class="fn">Subscriber</span>(<span class="str">'/cmd_vel'</span>, Twist, self.callback)
        rospy.<span class="fn">loginfo</span>(<span class="str">"限速器已启动: max_lin=%.2f max_ang=%.2f"</span> % (
            self.max_linear, self.max_angular
        ))

    <span class="kw">def</span> <span class="fn">callback</span>(self, msg):
        <span class="cm"># 限制线速度</span>
        <span class="kw">if</span> abs(msg.linear.x) > self.max_linear:
            msg.linear.x = self.max_linear * (<span class="num">1</span> <span class="kw">if</span> msg.linear.x > <span class="num">0</span> <span class="kw">else</span> -<span class="num">1</span>)
        <span class="cm"># 限制角速度</span>
        <span class="kw">if</span> abs(msg.angular.z) > self.max_angular:
            msg.angular.z = self.max_angular * (<span class="num">1</span> <span class="kw">if</span> msg.angular.z > <span class="num">0</span> <span class="kw">else</span> -<span class="num">1</span>)
        self.pub.<span class="fn">publish</span>(msg)

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    rospy.<span class="fn">init_node</span>(<span class="str">'speed_limiter'</span>)
    SpeedLimiter()
    rospy.<span class="fn">spin</span>()</code></pre></div>

<h2>编译配置与运行步骤</h2>
<p>在 <code>CMakeLists.txt</code> 中添加 C++ 可执行文件的编译配置：</p>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="cm"># C++ 可执行文件</span>
<span class="fn">add_executable</span>(vel_pub_cpp src/velocity_publisher.cpp)
<span class="fn">target_link_libraries</span>(vel_pub_cpp ${$}{catkin_LIBRARIES})

<span class="fn">add_executable</span>(odom_sub_cpp src/odometry_subscriber.cpp)
<span class="fn">target_link_libraries</span>(odom_sub_cpp ${$}{catkin_LIBRARIES})</code></pre></div>

<p>完整编译和运行流程：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 1. 添加可执行权限</span>
chmod +x scripts/velocity_publisher.py scripts/odometry_subscriber.py

<span class="cm"># 2. 编译</span>
cd ~/catkin_ws
catkin_make
source devel/setup.bash

<span class="cm"># 3. 启动 roscore</span>
roscore

<span class="cm"># 4. 终端2：启动 turtlesim（用于可视化和提供 /odom）</span>
rosrun turtlesim turtlesim_node

<span class="cm"># 5. 终端3：启动 Python 速度发布节点</span>
rosrun pubsub_demo velocity_publisher.py _linear_speed:=1.0 _angular_speed:=1.5

<span class="cm"># 6. 终端4：查看话题</span>
rostopic list
rostopic hz /cmd_vel

<span class="cm"># 7. 用 rqt_plot 观察数据曲线</span>
rqt_plot /turtle1/pose/x /turtle1/pose/y</code></pre></div>

<h2>使用 rqt_plot 观察数据</h2>
<p><code>rqt_plot</code> 是一个非常实用的工具，可以将话题中的数值字段实时绘制成曲线图，帮助你直观地观察数据变化：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 绘制位置 x 和 y 的变化曲线</span>
rqt_plot /turtle1/pose/x /turtle1/pose/y

<span class="cm"># 绘制速度指令</span>
rqt_plot /cmd_vel/linear/x /cmd_vel/angular/z

<span class="cm"># 如果运行 Python 示例节点，可以用 rostopic pub 模拟 odom 数据</span>
<span class="cm"># 或者直接用 turtlesim 的 /turtle1/pose 话题来练习订阅</span></code></pre></div>

<p>其他有用的 rqt 工具：</p>
<ul>
<li><code>rqt_graph</code>：可视化节点之间的话题连接关系图（强烈推荐！）</li>
<li><code>rqt_topic</code>：图形化查看话题消息内容</li>
<li><code>rqt_logger_level</code>：动态调整节点日志级别</li>
</ul>

<h2>常见问题与调试技巧</h2>
<div class="callout danger">
<p><strong>常见坑点</strong>：</p>
<ul>
<li><strong>忘记 spin()</strong>：rospy 中订阅回调需要 <code>rospy.spin()</code> 保持节点运行；roscpp 中需要 <code>ros::spin()</code> 或 <code>ros::spinOnce()</code> 处理回调队列。</li>
<li><strong>queue_size 设为0</strong>：roscpp 中 queue_size=0 表示无限队列，可能导致内存泄漏；rospy 中 queue_size 必须是正整数。</li>
<li><strong>消息类型不匹配</strong>：发布和订阅的消息类型必须完全一致（包括包名），否则无法建立连接。用 <code>rostopic info</code> 检查。</li>
<li><strong>忘记 source devel/setup.bash</strong>：新编译的节点和消息如果找不到，先 source 一下。</li>
<li><strong>回调函数中不要做耗时操作</strong>：回调应该快速返回，耗时操作放到独立线程或使用 Action。</li>
</ul>
</div>
`
},

"ros-action": {
t: "Action 长任务通信",
cat: "comm-code",
lv: 1,
pre: 3,
time: "35分钟",
desc: "处理长时间任务的通信机制：带反馈和可抢占的Action",
body: `<h2>为什么需要 Action</h2>
<p>我们已经学习了话题（Topic，持续异步数据流）和服务（Service，一次性同步请求响应）。但机器人系统中还有一类常见的通信需求，两者都不适合：<strong>长时间运行的任务</strong>。</p>
<p>想象这些场景：</p>
<ul>
<li>让机械臂移动到指定位置——可能需要几秒钟，期间你想知道进度（"已移动60%"）</li>
<li>让导航系统导航到目标点——可能需要几十秒，你可能想中途取消（"前方有障碍，停！"）</li>
<li>让底盘旋转指定角度——需要周期性反馈当前旋转角度</li>
</ul>
<p>用 Service 的话：客户端发送请求后阻塞等待，无法获取进度，也无法取消。用 Topic 的话：需要三个话题（goal/cancel/feedback + result），自己实现复杂的状态机。</p>
<p><strong>Action（动作）</strong>正是为解决这类问题而设计的通信机制，它提供：</p>
<ul>
<li><strong>Goal（目标）</strong>：客户端指定要执行的任务</li>
<li><strong>Feedback（反馈）</strong>：服务端周期性报告任务进度</li>
<li><strong>Result（结果）</strong>：任务完成后返回最终结果</li>
<li><strong>Preempt（抢占）</strong>：客户端可以随时取消或替换当前目标</li>
</ul>

<table>
<thead><tr><th>特性</th><th>Topic</th><th>Service</th><th>Action</th></tr></thead>
<tbody>
<tr><td>通信周期</td><td>持续流</td><td>一次性</td><td>一次性（但持续较长）</td></tr>
<tr><td>反馈机制</td><td>有（持续数据）</td><td>无</td><td>有（周期性Feedback）</td></tr>
<tr><td>可取消</td><td>取消订阅即可</td><td>不可取消</td><td>支持抢占/取消</td></tr>
<tr><td>阻塞等待</td><td>不阻塞</td><td>阻塞直到返回</td><td>可阻塞也可异步</td></tr>
<tr><td>适用时长</td><td>无限</td><td>短（&lt;秒级）</td><td>中长（秒级~分钟级）</td></tr>
</tbody>
</table>

<h2>Action 文件结构</h2>
<p>Action 使用 <code>.action</code> 文件定义，类似 srv 文件但分为三部分，用两个 <code>---</code> 分隔：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code><span class="cm"># Goal 部分：客户端发送给服务端的目标</span>
...
---
<span class="cm"># Result 部分：任务完成后服务端返回的结果</span>
...
---
<span class="cm"># Feedback 部分：执行过程中周期性反馈</span>
...</code></pre></div>

<h3>斐波那契 Action 示例</h3>
<p>ROS actionlib 教程中经典的斐波那契数列计算示例，<code>Fibonacci.action</code>：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code><span class="cm"># Goal: 计算斐波那契数列前 order 项</span>
int32 order
---
<span class="cm"># Result: 返回完整数列</span>
int32[] sequence
---
<span class="cm"># Feedback: 返回当前已计算的部分数列</span>
int32[] sequence</code></pre></div>

<h3>移动基站 Action 示例</h3>
<p>更贴近机器人的例子，<code>DockToBase.action</code>：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code><span class="cm"># Goal: 对接指定ID的充电基站</span>
string base_id
float32 approach_speed
---
<span class="cm"># Result: 对接结果</span>
bool success
string message
float32 final_distance
---
<span class="cm"># Feedback: 对接进度</span>
float32 distance_to_base
float32 completion_percent
string current_stage</code></pre></div>

<h2>actionlib 框架</h2>
<p>ROS 通过 <code>actionlib</code> 包提供 Action 通信的实现。Action 底层其实是用<strong>一组预定义话题</strong>来实现的：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code>对于 Action 名称 "fibonacci":
  /fibonacci/goal          (发布目标)
  /fibonacci/cancel        (取消请求)
  /fibonacci/feedback      (反馈数据)
  /fibonacci/result        (最终结果)
  /fibonacci/status        (状态更新)</code></pre></div>

<p>actionlib 提供了 <strong>SimpleActionServer</strong> 和 <strong>SimpleActionClient</strong> 两个类，封装了大部分状态机逻辑，使用起来非常方便。</p>

<h2>Python 完整示例：斐波那契 Action</h2>

<h3>步骤 1：创建 action 文件</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code>cd ~/catkin_ws/src
catkin_create_pkg action_demo actionlib actionlib_msgs roscpp rospy std_msgs message_generation
cd action_demo
mkdir action</code></pre></div>

<p>创建 <code>action/Fibonacci.action</code>：</p>
<div class="code-block"><span class="code-lang">text</span><pre><code>int32 order
---
int32[] sequence
---
int32[] sequence</code></pre></div>

<h3>步骤 2：配置 CMakeLists.txt</h3>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="fn">find_package</span>(catkin REQUIRED COMPONENTS
  actionlib actionlib_msgs roscpp rospy std_msgs message_generation
)

<span class="fn">add_action_files</span>(
  FILES
  Fibonacci.action
)

<span class="fn">generate_messages</span>(
  DEPENDENCIES
  actionlib_msgs std_msgs
)

<span class="fn">catkin_package</span>(
  CATKIN_DEPENDS actionlib actionlib_msgs roscpp rospy std_msgs message_runtime
)</code></pre></div>

<h3>步骤 3：Python 服务端</h3>
<p>创建 <code>scripts/fibonacci_server.py</code>：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="kw">import</span> rospy
<span class="kw">import</span> actionlib
<span class="kw">from</span> action_demo.msg <span class="kw">import</span> FibonacciAction, FibonacciFeedback, FibonacciResult

<span class="kw">class</span> <span class="type">FibonacciServer</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(self):
        <span class="cm"># 创建 SimpleActionServer: 服务器名、Action类型、回调函数、自动启动</span>
        self.server = actionlib.<span class="fn">SimpleActionServer</span>(
            <span class="str">'fibonacci'</span>, FibonacciAction, self.execute_cb, <span class="kw">False</span>
        )
        self.server.<span class="fn">start</span>()
        rospy.<span class="fn">loginfo</span>(<span class="str">"斐波那契 Action 服务器已启动"</span>)

    <span class="kw">def</span> <span class="fn">execute_cb</span>(self, goal):
        <span class="cm">"""Goal 执行回调：在这里完成实际任务"""</span>
        rospy.<span class="fn">loginfo</span>(<span class="str">"收到目标: 计算前 %d 项斐波那契数列"</span> % goal.order)

        <span class="cm"># 初始化数列</span>
        sequence = [<span class="num">0</span>, <span class="num">1</span>]
        feedback = FibonacciFeedback()
        result = FibonacciResult()
        success = <span class="kw">True</span>

        <span class="cm"># 逐项计算，模拟长时间任务</span>
        <span class="kw">for</span> i <span class="kw">in</span> range(<span class="num">2</span>, goal.order):
            <span class="cm"># 检查是否被抢占（取消）</span>
            <span class="kw">if</span> self.server.<span class="fn">is_preempt_requested</span>():
                rospy.<span class="fn">logwarn</span>(<span class="str">"目标被抢占（取消）"</span>)
                self.server.<span class="fn">set_preempted</span>()
                success = <span class="kw">False</span>
                <span class="kw">break</span>

            <span class="cm"># 计算下一项</span>
            sequence.<span class="fn">append</span>(sequence[i-<span class="num">1</span>] + sequence[i-<span class="num">2</span>])

            <span class="cm"># 发布反馈</span>
            feedback.sequence = sequence
            self.server.<span class="fn">publish_feedback</span>(feedback)
            rospy.<span class="fn">loginfo</span>(<span class="str">"反馈: %s"</span> % str(sequence))

            <span class="cm"># 模拟计算耗时</span>
            rospy.<span class="fn">sleep</span>(<span class="num">1.0</span>)

        <span class="kw">if</span> success:
            result.sequence = sequence
            rospy.<span class="fn">loginfo</span>(<span class="str">"目标完成: %s"</span> % str(sequence))
            self.server.<span class="fn">set_succeeded</span>(result)

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    rospy.<span class="fn">init_node</span>(<span class="str">'fibonacci_server'</span>)
    server = FibonacciServer()
    rospy.<span class="fn">spin</span>()</code></pre></div>

<h3>步骤 4：Python 客户端</h3>
<p>创建 <code>scripts/fibonacci_client.py</code>：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python</span>
<span class="cm"># -*- coding: utf-8 -*-</span>
<span class="kw">import</span> rospy
<span class="kw">import</span> actionlib
<span class="kw">from</span> action_demo.msg <span class="kw">import</span> FibonacciAction, FibonacciGoal

<span class="kw">def</span> <span class="fn">feedback_cb</span>(feedback):
    <span class="cm">"""反馈回调：收到反馈时调用"""</span>
    rospy.<span class="fn">loginfo</span>(<span class="str">"  [反馈] 当前数列: %s"</span> % str(feedback.sequence))

<span class="kw">def</span> <span class="fn">done_cb</span>(state, result):
    <span class="cm">"""完成回调：任务结束时调用"""</span>
    <span class="kw">if</span> state == actionlib.GoalStatus.SUCCEEDED:
        rospy.<span class="fn">loginfo</span>(<span class="str">"  [完成] 最终数列: %s"</span> % str(result.sequence))
    <span class="kw">else</span>:
        rospy.<span class="fn">logwarn</span>(<span class="str">"  [结束] 状态码: %d"</span> % state)

<span class="kw">def</span> <span class="fn">active_cb</span>():
    <span class="cm">"""活跃回调：目标开始被服务端处理时调用"""</span>
    rospy.<span class="fn">loginfo</span>(<span class="str">"  [激活] 目标开始处理"</span>)

<span class="kw">def</span> <span class="fn">fibonacci_client</span>():
    rospy.<span class="fn">init_node</span>(<span class="str">'fibonacci_client'</span>)

    <span class="cm"># 创建 SimpleActionClient</span>
    client = actionlib.<span class="fn">SimpleActionClient</span>(<span class="str">'fibonacci'</span>, FibonacciAction)

    <span class="cm"># 等待服务器可用</span>
    rospy.<span class="fn">loginfo</span>(<span class="str">"等待 Action 服务器..."</span>)
    client.<span class="fn">wait_for_server</span>()
    rospy.<span class="fn">loginfo</span>(<span class="str">"服务器已连接，发送目标"</span>)

    <span class="cm"># 创建目标</span>
    goal = FibonacciGoal(order=<span class="num">10</span>)

    <span class="cm"># 发送目标，注册回调函数</span>
    client.<span class="fn">send_goal</span>(goal, done_cb=done_cb, active_cb=active_cb, feedback_cb=feedback_cb)

    <span class="cm"># 方式1：异步发送后继续做其他事</span>
    <span class="cm"># 等待结果（最多30秒）</span>
    finished = client.<span class="fn">wait_for_result</span>(rospy.<span class="fn">Duration</span>(<span class="num">30.0</span>))
    <span class="kw">if</span> finished:
        rospy.<span class="fn">loginfo</span>(<span class="str">"任务已完成"</span>)
    <span class="kw">else</span>:
        rospy.<span class="fn">logwarn</span>(<span class="str">"任务超时，取消目标"</span>)
        client.<span class="fn">cancel_goal</span>()

    <span class="cm"># 方式2：同步发送（阻塞直到完成）</span>
    <span class="cm"># client.send_goal_and_wait(goal, rospy.Duration(30.0))</span>

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="kw">try</span>:
        <span class="fn">fibonacci_client</span>()
    <span class="kw">except</span> rospy.ROSInterruptException:
        rospy.<span class="fn">loginfo</span>(<span class="str">"客户端被中断"</span>)</code></pre></div>

<h2>C++ 完整示例</h2>

<h3>C++ 服务端</h3>
<p>创建 <code>src/fibonacci_server.cpp</code>：</p>
<div class="code-block"><span class="code-lang">cpp</span><pre><code><span class="pp">#include</span> <span class="str">&lt;ros/ros.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;actionlib/server/simple_action_server.h&gt;</span>
<span class="pp">#include</span> <span class="str">"action_demo/FibonacciAction.h"</span>

<span class="kw">typedef</span> actionlib::SimpleActionServer&lt;action_demo::FibonacciAction&gt; Server;

<span class="kw">class</span> <span class="type">FibonacciServer</span> {
<span class="kw">public</span>:
    FibonacciServer(std::string name) :
        as_(nh_, name, boost::<span class="fn">bind</span>(&amp;FibonacciServer::executeCB, <span class="kw">this</span>, _1), <span class="kw">false</span>),
        action_name_(name) {
        as_.<span class="fn">start</span>();
        ROS_INFO(<span class="str">"斐波那契 Action 服务器(C++)已启动"</span>);
    }

    ~FibonacciServer(<span class="type">void</span>) {}

    <span class="type">void</span> <span class="fn">executeCB</span>(<span class="kw">const</span> action_demo::FibonacciGoalConstPtr &amp;goal) {
        ROS_INFO(<span class="str">"收到目标: 计算前 %d 项"</span>, goal-&gt;order);

        ros::Rate r(<span class="num">1</span>);  <span class="cm">// 1Hz，模拟计算耗时</span>
        <span class="type">bool</span> success = <span class="kw">true</span>;

        feedback_.sequence.<span class="fn">clear</span>();
        feedback_.sequence.<span class="fn">push_back</span>(<span class="num">0</span>);
        feedback_.sequence.<span class="fn">push_back</span>(<span class="num">1</span>);

        <span class="kw">for</span> (<span class="type">int</span> i = <span class="num">2</span>; i &lt; goal-&gt;order; i++) {
            <span class="cm">// 检查是否被抢占</span>
            <span class="kw">if</span> (as_.<span class="fn">isPreemptRequested</span>() || !ros::<span class="fn">ok</span>()) {
                ROS_WARN(<span class="str">"目标被抢占"</span>);
                as_.<span class="fn">setPreempted</span>();
                success = <span class="kw">false</span>;
                <span class="kw">break</span>;
            }

            feedback_.sequence.<span class="fn">push_back</span>(
                feedback_.sequence[i-<span class="num">1</span>] + feedback_.sequence[i-<span class="num">2</span>]
            );
            as_.<span class="fn">publishFeedback</span>(feedback_);
            ROS_INFO(<span class="str">"反馈: 已计算 %lu 项"</span>, feedback_.sequence.<span class="fn">size</span>());
            r.<span class="fn">sleep</span>();
        }

        <span class="kw">if</span> (success) {
            result_.sequence = feedback_.sequence;
            ROS_INFO(<span class="str">"目标完成"</span>);
            as_.<span class="fn">setSucceeded</span>(result_);
        }
    }

<span class="kw">protected</span>:
    ros::NodeHandle nh_;
    Server as_;
    std::string action_name_;
    action_demo::FibonacciFeedback feedback_;
    action_demo::FibonacciResult result_;
};

<span class="type">int</span> <span class="fn">main</span>(<span class="type">int</span> argc, <span class="type">char</span>** argv) {
    ros::<span class="fn">init</span>(argc, argv, <span class="str">"fibonacci_server_cpp"</span>);
    FibonacciServer <span class="fn">server</span>(<span class="str">"fibonacci"</span>);
    ros::<span class="fn">spin</span>();
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<h3>C++ 客户端</h3>
<p>创建 <code>src/fibonacci_client.cpp</code>：</p>
<div class="code-block"><span class="code-lang">cpp</span><pre><code><span class="pp">#include</span> <span class="str">&lt;ros/ros.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;actionlib/client/simple_action_client.h&gt;</span>
<span class="pp">#include</span> <span class="str">"action_demo/FibonacciAction.h"</span>

<span class="kw">typedef</span> actionlib::SimpleActionClient&lt;action_demo::FibonacciAction&gt; Client;

<span class="type">void</span> <span class="fn">doneCb</span>(<span class="kw">const</span> actionlib::SimpleClientGoalState&amp; state,
            <span class="kw">const</span> action_demo::FibonacciResultConstPtr&amp; result) {
    ROS_INFO(<span class="str">"完成! 状态: %s"</span>, state.<span class="fn">toString</span>().<span class="fn">c_str</span>());
    ROS_INFO(<span class="str">"数列长度: %lu"</span>, result-&gt;sequence.<span class="fn">size</span>());
    ros::<span class="fn">shutdown</span>();
}

<span class="type">void</span> <span class="fn">activeCb</span>() {
    ROS_INFO(<span class="str">"目标已激活"</span>);
}

<span class="type">void</span> <span class="fn">feedbackCb</span>(<span class="kw">const</span> action_demo::FibonacciFeedbackConstPtr&amp; feedback) {
    ROS_INFO(<span class="str">"反馈: 已计算 %lu 项"</span>, feedback-&gt;sequence.<span class="fn">size</span>());
}

<span class="type">int</span> <span class="fn">main</span>(<span class="type">int</span> argc, <span class="type">char</span>** argv) {
    ros::<span class="fn">init</span>(argc, argv, <span class="str">"fibonacci_client_cpp"</span>);
    Client <span class="fn">client</span>(<span class="str">"fibonacci"</span>, <span class="kw">true</span>);

    ROS_INFO(<span class="str">"等待服务器..."</span>);
    client.<span class="fn">waitForServer</span>();
    ROS_INFO(<span class="str">"已连接"</span>);

    action_demo::FibonacciGoal goal;
    goal.order = <span class="num">10</span>;

    client.<span class="fn">sendGoal</span>(goal, &amp;doneCb, &amp;activeCb, &amp;feedbackCb);

    <span class="cm">// 等待完成（也可以用 client.waitForResult()）</span>
    ros::<span class="fn">spin</span>();
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<h2>axclient / axserver 工具</h2>
<p>actionlib 提供了两个图形化工具，方便调试 Action：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 图形化 Action 客户端：可以手动发送 Goal、查看 Feedback 和 Result</span>
rosrun actionlib axclient.py /fibonacci

<span class="cm"># （需先启动 fibonacci_server）</span>
<span class="cm"># 在弹出的窗口中设置 order=10，点击 "SEND GOAL" 即可看到实时反馈</span>
<span class="cm"># 点击 "CANCEL GOAL" 可以取消正在执行的任务</span></code></pre></div>

<h2>actionlib_msgs</h2>
<p>Action 通信中使用的标准消息类型定义在 <code>actionlib_msgs</code> 包中，最重要的是 <code>GoalStatus</code> 和 <code>GoalStatusArray</code>。<code>GoalStatus</code> 包含以下状态常量：</p>

<table>
<thead><tr><th>状态</th><th>值</th><th>含义</th></tr></thead>
<tbody>
<tr><td>PENDING</td><td>0</td><td>目标已接收，尚未开始处理</td></tr>
<tr><td>ACTIVE</td><td>1</td><td>目标正在被处理</td></tr>
<tr><td>PREEMPTED</td><td>2</td><td>目标收到取消请求后已停止</td></tr>
<tr><td>SUCCEEDED</td><td>3</td><td>目标成功完成</td></tr>
<tr><td>ABORTED</td><td>4</td><td>目标因错误被服务端终止</td></tr>
<tr><td>REJECTED</td><td>5</td><td>目标被服务端拒绝（未开始执行）</td></tr>
<tr><td>PREEMPTING</td><td>6</td><td>目标正在被取消</td></tr>
<tr><td>RECALLING</td><td>7</td><td>目标正在被撤销（尚未开始执行时）</td></tr>
<tr><td>RECALLED</td><td>8</td><td>目标已被成功撤销</td></tr>
<tr><td>LOST</td><td>9</td><td>目标状态丢失（异常）</td></tr>
</tbody>
</table>

<h2>运行和测试</h2>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 添加执行权限</span>
chmod +x scripts/fibonacci_server.py scripts/fibonacci_client.py

<span class="cm"># CMakeLists.txt 中添加 C++ 可执行文件（参考前文 pattern）</span>
<span class="cm"># 编译</span>
cd ~/catkin_ws &amp;&amp; catkin_make &amp;&amp; source devel/setup.bash

<span class="cm"># 终端1：roscore</span>
roscore

<span class="cm"># 终端2：启动 Action 服务器</span>
rosrun action_demo fibonacci_server.py

<span class="cm"># 终端3：运行客户端</span>
rosrun action_demo fibonacci_client.py

<span class="cm"># 或者用 axclient 图形化界面测试</span>
rosrun actionlib axclient.py /fibonacci</code></pre></div>

<div class="callout tip">
<p><strong>Action vs Service 选择总结</strong>：执行时间短（毫秒级）、不需要反馈和取消 → 用 Service；执行时间长（秒级以上）、需要进度反馈或中途取消 → 用 Action。ROS 导航栈中的 <code>move_base</code> 是最经典的 Action 使用案例——发送目标点后可以实时看到机器人位置反馈，也可以随时取消导航重新设置目标。</p>
</div>
`
},

"ros-launch": {
t: "ROS Launch 文件系统",
cat: "tool",
lv: 1,
pre: 1,
time: "30分钟",
desc: "用launch文件一次性启动和配置多个节点",
body: `<h2>为什么需要 Launch 文件</h2>
<p>到目前为止，我们每次运行 ROS 系统都需要手动打开多个终端，分别执行 <code>roscore</code>、<code>rosrun</code> 等命令。当节点数量增多（一个真实机器人系统可能有几十个节点），这种方式既繁琐又容易出错。</p>
<p><strong>roslaunch</strong> 是 ROS 提供的批量启动工具，通过 <strong>launch 文件</strong>（XML 格式）来描述需要启动的节点、参数配置、环境变量等，可以一条命令启动整个系统。roslaunch 还会自动启动 roscore（如果尚未运行），非常方便。</p>

<h2>launch 文件 XML 格式</h2>
<p>launch 文件是 XML 格式，根标签为 <code>&lt;launch&gt;</code>，内部可以包含各种标签来描述启动配置。一个最简单的 launch 文件如下：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="kw">&lt;launch&gt;</span>
  <span class="cm">&lt;!-- 启动一个 talker 节点 --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"rospy_tutorials"</span> <span class="type">type</span>=<span class="str">"talker"</span> <span class="type">name</span>=<span class="str">"talker"</span> <span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 启动一个 listener 节点 --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"rospy_tutorials"</span> <span class="type">type</span>=<span class="str">"listener"</span> <span class="type">name</span>=<span class="str">"listener"</span> <span class="kw">/&gt;</span>
<span class="kw">&lt;/launch&gt;</span></code></pre></div>

<p>将上述内容保存为 <code>launch/talker_listener.launch</code>，然后运行：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>roslaunch rospy_tutorials talker_listener.launch
<span class="cm"># 如果是自己包中的 launch 文件：</span>
roslaunch my_package my_launch.launch</code></pre></div>

<div class="callout warn">
<p><strong>注意</strong>：<code>roslaunch</code> 会在当前包的 <code>launch/</code> 目录下查找文件，也支持绝对路径。如果找到多个同名 launch 文件，roslaunch 会输出警告并选择第一个。建议始终使用 <code>包名 文件名</code> 的方式指定。</p>
</div>

<h2>&lt;node&gt; 标签详解</h2>
<p><code>&lt;node&gt;</code> 是 launch 文件中最核心的标签，用来指定要启动的节点。常用属性如下：</p>

<table>
<thead><tr><th>属性</th><th>必需</th><th>说明</th><th>示例</th></tr></thead>
<tbody>
<tr><td><code>pkg</code></td><td>是</td><td>节点所在的功能包名</td><td>pkg="turtlesim"</td></tr>
<tr><td><code>type</code></td><td>是</td><td>节点的可执行文件名</td><td>type="turtlesim_node"</td></tr>
<tr><td><code>name</code></td><td>是</td><td>节点启动后的名称（覆盖代码中的名称）</td><td>name="sim"</td></tr>
<tr><td><code>output</code></td><td>否</td><td>输出方式："screen"输出到终端，"log"记录到日志文件</td><td>output="screen"</td></tr>
<tr><td><code>args</code></td><td>否</td><td>传递给节点的命令行参数</td><td>args="--param1 value1"</td></tr>
<tr><td><code>respawn</code></td><td>否</td><td>节点异常退出后是否自动重启（true/false）</td><td>respawn="true"</td></tr>
<tr><td><code>required</code></td><td>否</td><td>该节点必须存活，如果它退出则终止整个 launch</td><td>required="true"</td></tr>
<tr><td><code>ns</code></td><td>否</td><td>节点所在的命名空间</td><td>ns="robot1"</td></tr>
<tr><td><code>launch-prefix</code></td><td>否</td><td>启动前缀命令（如 xterm -e, gdb -ex run --args）</td><td>launch-prefix="xterm -e"</td></tr>
</tbody>
</table>

<h3>node 属性示例</h3>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="kw">&lt;launch&gt;</span>
  <span class="cm">&lt;!-- 基础节点启动 --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"turtlesim"</span> <span class="type">type</span>=<span class="str">"turtlesim_node"</span> <span class="type">name</span>=<span class="str">"turtle1"</span> <span class="type">output</span>=<span class="str">"screen"</span><span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 带命名空间的节点：全局名变为 /robot1/turtle_teleop --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"turtlesim"</span> <span class="type">type</span>=<span class="str">"turtle_teleop_key"</span> <span class="type">name</span>=<span class="str">"teleop"</span>
        <span class="type">ns</span>=<span class="str">"robot1"</span> <span class="type">output</span>=<span class="str">"screen"</span><span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 崩溃后自动重启的节点 --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"my_package"</span> <span class="type">type</span>=<span class="str">"sensor_node"</span> <span class="type">name</span>=<span class="str">"lidar"</span>
        <span class="type">respawn</span>=<span class="str">"true"</span> <span class="type">respawn_delay</span>=<span class="str">"5"</span><span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 关键节点：退出则终止整个系统 --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"my_package"</span> <span class="type">type</span>=<span class="str">"safety_controller"</span> <span class="type">name</span>=<span class="str">"safety"</span>
        <span class="type">required</span>=<span class="str">"true"</span> <span class="type">output</span>=<span class="str">"screen"</span><span class="kw">/&gt;</span>
<span class="kw">&lt;/launch&gt;</span></code></pre></div>

<h2>&lt;param&gt; 和 &lt;rosparam&gt; 设置参数</h2>

<h3>&lt;param&gt; 标签</h3>
<p><code>&lt;param&gt;</code> 用于设置单个参数到参数服务器，可以放在 <code>&lt;launch&gt;</code> 下（全局参数）或 <code>&lt;node&gt;</code> 内（私有参数）：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="kw">&lt;launch&gt;</span>
  <span class="cm">&lt;!-- 全局参数 --&gt;</span>
  <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"/robot_name"</span> <span class="type">value</span>=<span class="str">"turtlebot"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"/max_speed"</span> <span class="type">value</span>=<span class="str">"1.5"</span> <span class="type">type</span>=<span class="str">"double"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"/use_sim_time"</span> <span class="type">value</span>=<span class="str">"true"</span> <span class="kw">/&gt;</span>

  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"my_package"</span> <span class="type">type</span>=<span class="str">"my_node"</span> <span class="type">name</span>=<span class="str">"my_node"</span><span class="kw">&gt;</span>
    <span class="cm">&lt;!-- 私有参数：自动放在 /my_node/port 下 --&gt;</span>
    <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"port"</span> <span class="type">value</span>=<span class="str">"8080"</span> <span class="kw">/&gt;</span>
    <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"debug"</span> <span class="type">value</span>=<span class="str">"false"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;/node&gt;</span>
<span class="kw">&lt;/launch&gt;</span></code></pre></div>

<h3>&lt;rosparam&gt; 标签</h3>
<p><code>&lt;rosparam&gt;</code> 用于从 YAML 文件批量加载参数，也可以直接在标签内写 YAML 内容：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="kw">&lt;launch&gt;</span>
  <span class="cm">&lt;!-- 从 YAML 文件加载参数 --&gt;</span>
  <span class="kw">&lt;rosparam</span> <span class="type">file</span>=<span class="str">"$(find my_package)/config/robot_params.yaml"</span> <span class="type">command</span>=<span class="str">"load"</span> <span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 加载到指定命名空间 --&gt;</span>
  <span class="kw">&lt;rosparam</span> <span class="type">file</span>=<span class="str">"$(find my_package)/config/sensors.yaml"</span>
             <span class="type">command</span>=<span class="str">"load"</span> <span class="type">ns</span>=<span class="str">"sensors"</span> <span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 直接在 launch 文件中写 YAML --&gt;</span>
  <span class="kw">&lt;rosparam&gt;</span>
    controller:
      p_gain: 1.0
      i_gain: 0.1
      d_gain: 0.05
      max_output: 2.0
  <span class="kw">&lt;/rosparam&gt;</span>
<span class="kw">&lt;/launch&gt;</span></code></pre></div>

<div class="callout tip">
<p><strong>$(find 包名)</strong>是 launch 文件中的路径替换命令，会自动解析为该功能包的绝对路径。这是最常用的路径引用方式，避免硬编码路径。</p>
</div>

<h2>&lt;arg&gt; 启动参数</h2>
<p><code>&lt;arg&gt;</code> 标签允许在 launch 文件中定义可配置的参数，类似函数的入参，可以在命令行覆盖默认值，极大提高 launch 文件的复用性：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="kw">&lt;launch&gt;</span>
  <span class="cm">&lt;!-- 定义参数：name、默认值、说明 --&gt;</span>
  <span class="kw">&lt;arg</span> <span class="type">name</span>=<span class="str">"robot_name"</span> <span class="type">default</span>=<span class="str">"turtlebot"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;arg</span> <span class="type">name</span>=<span class="str">"use_sim"</span> <span class="type">default</span>=<span class="str">"false"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;arg</span> <span class="type">name</span>=<span class="str">"speed"</span> <span class="type">default</span>=<span class="str">"0.5"</span> <span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 使用 $(arg name) 引用参数值 --&gt;</span>
  <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"/robot_name"</span> <span class="type">value</span>=<span class="str">"$(arg robot_name)"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"/use_sim_time"</span> <span class="type">value</span>=<span class="str">"$(arg use_sim)"</span> <span class="kw">/&gt;</span>

  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"pubsub_demo"</span> <span class="type">type</span>=<span class="str">"velocity_publisher.py"</span> <span class="type">name</span>=<span class="str">"vel_pub"</span><span class="kw">&gt;</span>
    <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"linear_speed"</span> <span class="type">value</span>=<span class="str">"$(arg speed)"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;/node&gt;</span>
<span class="kw">&lt;/launch&gt;</span></code></pre></div>

<p>在命令行中覆盖参数值：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 使用默认值启动</span>
roslaunch my_package demo.launch

<span class="cm"># 覆盖参数值</span>
roslaunch my_package demo.launch robot_name:=robot2 use_sim:=true speed:=1.0</code></pre></div>

<h2>&lt;include&gt; 嵌套 launch 文件</h2>
<p><code>&lt;include&gt;</code> 可以将其他 launch 文件嵌入到当前 launch 文件中，实现模块化复用：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="kw">&lt;launch&gt;</span>
  <span class="cm">&lt;!-- 包含其他包的 launch 文件 --&gt;</span>
  <span class="kw">&lt;include</span> <span class="type">file</span>=<span class="str">"$(find turtlebot3_bringup)/launch/turtlebot3_robot.launch"</span> <span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 包含时传递参数 --&gt;</span>
  <span class="kw">&lt;include</span> <span class="type">file</span>=<span class="str">"$(find my_package)/launch/sensors.launch"</span><span class="kw">&gt;</span>
    <span class="kw">&lt;arg</span> <span class="type">name</span>=<span class="str">"lidar_enabled"</span> <span class="type">value</span>=<span class="str">"true"</span> <span class="kw">/&gt;</span>
    <span class="kw">&lt;arg</span> <span class="type">name</span>=<span class="str">"camera_enabled"</span> <span class="type">value</span>=<span class="str">"true"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;/include&gt;</span>

  <span class="cm">&lt;!-- 启动本包的节点 --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"my_package"</span> <span class="type">type</span>=<span class="str">"navigation_node"</span> <span class="type">name</span>=<span class="str">"nav"</span> <span class="type">output</span>=<span class="str">"screen"</span><span class="kw">/&gt;</span>
<span class="kw">&lt;/launch&gt;</span></code></pre></div>

<h2>&lt;group&gt; 分组与命名空间</h2>
<p><code>&lt;group&gt;</code> 标签可以将多个节点和参数组织在一起，统一设置命名空间或条件：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="kw">&lt;launch&gt;</span>
  <span class="cm">&lt;!-- 机器人1的所有节点在 /robot1 命名空间下 --&gt;</span>
  <span class="kw">&lt;group</span> <span class="type">ns</span>=<span class="str">"robot1"</span><span class="kw">&gt;</span>
    <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"turtlesim"</span> <span class="type">type</span>=<span class="str">"turtlesim_node"</span> <span class="type">name</span>=<span class="str">"sim"</span><span class="kw">/&gt;</span>
    <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"pubsub_demo"</span> <span class="type">type</span>=<span class="str">"velocity_publisher.py"</span> <span class="type">name</span>=<span class="str">"vel"</span><span class="kw">/&gt;</span>
    <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"max_speed"</span> <span class="type">value</span>=<span class="str">"1.0"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;/group&gt;</span>

  <span class="cm">&lt;!-- 机器人2的所有节点在 /robot2 命名空间下 --&gt;</span>
  <span class="kw">&lt;group</span> <span class="type">ns</span>=<span class="str">"robot2"</span><span class="kw">&gt;</span>
    <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"turtlesim"</span> <span class="type">type</span>=<span class="str">"turtlesim_node"</span> <span class="type">name</span>=<span class="str">"sim"</span><span class="kw">/&gt;</span>
    <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"pubsub_demo"</span> <span class="type">type</span>=<span class="str">"velocity_publisher.py"</span> <span class="type">name</span>=<span class="str">"vel"</span><span class="kw">/&gt;</span>
    <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"max_speed"</span> <span class="type">value</span>=<span class="str">"1.5"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;/group&gt;</span>
<span class="kw">&lt;/launch&gt;</span></code></pre></div>

<h2>&lt;remap&gt; 话题重映射</h2>
<p><code>&lt;remap&gt;</code> 是 ROS 中非常实用的功能，可以在不修改代码的情况下，将节点订阅/发布的话题名映射到其他名称。这在复用他人编写的节点时特别有用：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="kw">&lt;launch&gt;</span>
  <span class="cm">&lt;!-- 全局重映射：所有节点的 cmd_vel 都映射到 /robot1/cmd_vel --&gt;</span>
  <span class="kw">&lt;remap</span> <span class="type">from</span>=<span class="str">"/cmd_vel"</span> <span class="type">to</span>=<span class="str">"/robot1/cmd_vel"</span> <span class="kw">/&gt;</span>

  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"turtlesim"</span> <span class="type">type</span>=<span class="str">"turtlesim_node"</span> <span class="type">name</span>=<span class="str">"turtle1"</span><span class="kw">&gt;</span>
    <span class="cm">&lt;!-- 节点内重映射：该节点订阅的 /turtle1/cmd_vel 改为 /cmd_vel --&gt;</span>
    <span class="kw">&lt;remap</span> <span class="type">from</span>=<span class="str">"/turtle1/cmd_vel"</span> <span class="type">to</span>=<span class="str">"/cmd_vel"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;/node&gt;</span>
<span class="kw">&lt;/launch&gt;</span></code></pre></div>

<p>重映射也可以在命令行中直接使用，语法是 <code>原名称:=新名称</code>：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 命令行重映射：将 /cmd_vel 映射到 /turtle1/cmd_vel</span>
rosrun pubsub_demo velocity_publisher.py /cmd_vel:=/turtle1/cmd_vel</code></pre></div>

<h2>roslaunch 命令行用法</h2>
<table>
<thead><tr><th>用法</th><th>说明</th></tr></thead>
<tbody>
<tr><td><code>roslaunch pkg file.launch</code></td><td>启动指定包中的 launch 文件</td></tr>
<tr><td><code>roslaunch pkg file.launch arg:=val</code></td><td>传递启动参数</td></tr>
<tr><td><code>roslaunch --screen pkg file.launch</code></td><td>所有节点输出到屏幕（方便调试）</td></tr>
<tr><td><code>roslaunch -v pkg file.launch</code></td><td>详细输出模式，显示加载过程</td></tr>
<tr><td><code>roslaunch --args=node_name pkg file.launch</code></td><td>打印某个节点的启动命令（不实际启动）</td></tr>
<tr><td><code>roslaunch -p 2345 pkg file.launch</span></td><td>指定 roscore 的端口号（多master场景）</td></tr>
</tbody>
</table>

<h2>条件标签 if/unless</h2>
<p>launch 文件支持简单的条件判断，通过 <code>if</code> 和 <code>unless</code> 属性控制节点或分组是否启动：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="kw">&lt;launch&gt;</span>
  <span class="kw">&lt;arg</span> <span class="type">name</span>=<span class="str">"debug"</span> <span class="type">default</span>=<span class="str">"false"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;arg</span> <span class="type">name</span>=<span class="str">"use_rviz"</span> <span class="type">default</span>=<span class="str">"true"</span> <span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- if="条件"：条件为 true(1) 时才执行 --&gt;</span>
  <span class="kw">&lt;group</span> <span class="type">if</span>=<span class="str">"$(arg debug)"</span><span class="kw">&gt;</span>
    <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"rviz"</span> <span class="type">type</span>=<span class="str">"rviz"</span> <span class="type">name</span>=<span class="str">"rviz_debug"</span> <span class="type">output</span>=<span class="str">"screen"</span><span class="kw">/&gt;</span>
  <span class="kw">&lt;/group&gt;</span>

  <span class="cm">&lt;!-- unless="条件"：条件为 false(0) 时才执行 --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"my_package"</span> <span class="type">type</span>=<span class="str">"optimized_node"</span> <span class="type">name</span>=<span class="str">"opt"</span>
        <span class="type">unless</span>=<span class="str">"$(arg debug)"</span><span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 控制 rviz 是否启动 --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">if</span>=<span class="str">"$(arg use_rviz)"</span>
        <span class="type">pkg</span>=<span class="str">"rviz"</span> <span class="type">type</span>=<span class="str">"rviz"</span> <span class="type">name</span>=<span class="str">"rviz"</span><span class="kw">/&gt;</span>
<span class="kw">&lt;/launch&gt;</span></code></pre></div>

<h2>完整 launch 文件示例</h2>
<p>下面是一个综合示例，演示启动一个包含 turtlesim、速度发布、键盘控制的完整系统：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="kw">&lt;launch&gt;</span>
  <span class="cm">&lt;!-- 参数定义 --&gt;</span>
  <span class="kw">&lt;arg</span> <span class="type">name</span>=<span class="str">"speed"</span> <span class="type">default</span>=<span class="str">"1.0"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;arg</span> <span class="type">name</span>=<span class="str">"use_keyboard"</span> <span class="type">default</span>=<span class="str">"true"</span> <span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 全局参数 --&gt;</span>
  <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"/use_sim_time"</span> <span class="type">value</span>=<span class="str">"false"</span> <span class="kw">/&gt;</span>

  <span class="cm">&lt;!-- 启动 turtlesim 仿真器 --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"turtlesim"</span> <span class="type">type</span>=<span class="str">"turtlesim_node"</span> <span class="type">name</span>=<span class="str">"sim"</span>
        <span class="type">output</span>=<span class="str">"screen"</span><span class="kw">&gt;</span>
    <span class="kw">&lt;remap</span> <span class="type">from</span>=<span class="str">"/turtle1/cmd_vel"</span> <span class="type">to</span>=<span class="str">"/cmd_vel"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;/node&gt;</span>

  <span class="cm">&lt;!-- 自动速度发布节点 --&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"pubsub_demo"</span> <span class="type">type</span>=<span class="str">"velocity_publisher.py"</span> <span class="type">name</span>=<span class="str">"auto_pub"</span>
        <span class="type">output</span>=<span class="str">"screen"</span> <span class="type">unless</span>=<span class="str">"$(arg use_keyboard)"</span><span class="kw">&gt;</span>
    <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"linear_speed"</span> <span class="type">value</span>=<span class="str">"$(arg speed)"</span> <span class="kw">/&gt;</span>
    <span class="kw">&lt;param</span> <span class="type">name</span>=<span class="str">"angular_speed"</span> <span class="type">value</span>=<span class="str">"1.0"</span> <span class="kw">/&gt;</span>
  <span class="kw">&lt;/node&gt;</span>

  <span class="cm">&lt;!-- 键盘控制节点（仅在 use_keyboard=true 时启动）--&gt;</span>
  <span class="kw">&lt;node</span> <span class="type">pkg</span>=<span class="str">"turtlesim"</span> <span class="type">type</span>=<span class="str">"turtle_teleop_key"</span> <span class="type">name</span>=<span class="str">"teleop"</span>
        <span class="type">output</span>=<span class="str">"screen"</span> <span class="type">if</span>=<span class="str">"$(arg use_keyboard)"</span><span class="kw">/&gt;</span>
<span class="kw">&lt;/launch&gt;</span></code></pre></div>

<h2>常用替换命令</h2>
<p>launch 文件中可以使用以下替换命令（类似变量）：</p>
<table>
<thead><tr><th>命令</th><th>说明</th><th>示例</th></tr></thead>
<tbody>
<tr><td><code>$(find pkg)</code></td><td>功能包的绝对路径</td><td>$(find my_package)/config/params.yaml</td></tr>
<tr><td><code>$(arg name)</code></td><td>引用 launch 参数值</td><td>$(arg robot_name)</td></tr>
<tr><td><code>$(env VAR)</code></td><td>引用环境变量</td><td>$(env ROS_MASTER_URI)</td></tr>
<tr><td><code>$(optenv VAR default)</code></td><td>环境变量（带默认值）</td><td>$(optenv ROBOT_ID robot0)</td></tr>
<tr><td><code>$(anon name)</code></td><td>生成匿名名称（避免重名）</td><td>$(anon listener)</td></tr>
<tr><td><code>$(dirname)</code></td><td>当前 launch 文件所在目录</td><td>$(dirname)/../config/params.yaml</td></tr>
</tbody>
</table>

<div class="callout tip">
<p><strong>roslaunch 最佳实践</strong>：</p>
<ul>
<li>每个功能包创建 <code>launch/</code> 目录存放 launch 文件。</li>
<li>使用 <code>&lt;arg&gt;</code> 提高复用性，避免硬编码。</li>
<li>调试时加 <code>output="screen"</code> 看到节点输出，正式运行时去掉（默认写入日志文件）。</li>
<li>关键传感器/安全节点加 <code>respawn="true"</code> 自动重启，核心控制节点加 <code>required="true"</code>。</li>
<li>复杂系统拆分为多个 launch 文件，通过 <code>&lt;include&gt;</code> 组合。</li>
<li>使用 <code>rqt_graph</code> 检查 launch 启动后节点连接是否正确。</li>
</ul>
</div>
`
}
});
