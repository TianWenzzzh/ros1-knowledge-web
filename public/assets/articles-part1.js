window.__ARTICLES__ = window.__ARTICLES__ || {};
Object.assign(window.__ARTICLES__, {

"linux-basics": {
  t: "Linux 基础命令与操作",
  cat: "linux",
  lv: 0,
  pre: 0,
  time: "20分钟",
  desc: "掌握ROS开发必备的Linux命令行操作",
  body: `
<h2>为什么 ROS 开发者必须掌握 Linux 命令行</h2>
<p>ROS（Robot Operating System）的官方支持平台是 Ubuntu Linux。在 ROS 开发过程中，你几乎每天都要打开终端，输入命令来编译代码、运行节点、查看话题、调试程序。图形界面能做的事情非常有限，而<strong>命令行</strong>（Terminal）是你与系统交互最高效的方式。本篇教程将从零开始，带你掌握 ROS 开发中最常用的 Linux 命令，学完之后你将能够自由地在文件系统中导航、操作文件、管理进程和安装软件。</p>

<div class="callout goal">
  <strong>学习目标：</strong>学完本篇后，你能熟练使用 ls/cd/pwd/mkdir/rm/cp/mv 导航文件系统；用 cat/nano 编辑文件；理解 chmod/sudo 权限机制；用 ps/top/kill 管理进程；用 apt 安装软件包；掌握 Tab 补全、命令历史和管道等终端技巧。
</div>

<h2>文件系统导航</h2>
<p>Linux 文件系统是一个以 <code>/</code>（根目录）为起点的树状结构。你必须知道自己"在哪里"以及"怎么去别的地方"。</p>

<h3>pwd — 显示当前目录</h3>
<p><code>pwd</code>（Print Working Directory）会告诉你当前所在的绝对路径：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 打开终端后输入</span>
<span class="kw">pwd</span>
<span class="cm"># 输出示例：/home/yourname</span></code></pre></div>

<h3>ls — 列出目录内容</h3>
<p><code>ls</code> 是最常用的命令之一，用于列出当前目录下的文件和子目录：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">ls</span>                  <span class="cm"># 列出当前目录内容</span>
<span class="kw">ls</span> -l               <span class="cm"># 长格式显示（权限、大小、修改时间）</span>
<span class="kw">ls</span> -la              <span class="cm"># 显示所有文件（包括隐藏文件，以.开头）</span>
<span class="kw">ls</span> -lh             <span class="cm"># 人类可读的文件大小（K/M/G）</span>
<span class="kw">ls</span> /home           <span class="cm"># 列出指定目录的内容</span></code></pre></div>
<p>在 <code>ls -l</code> 的输出中，第一列是权限位（如 <code>drwxr-xr-x</code>），第三列是所有者，第五列是文件大小，第六到八列是修改日期时间，最后一列是文件名。</p>

<h3>cd — 切换目录</h3>
<p><code>cd</code>（Change Directory）用于切换当前工作目录：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cd</span> /home/yourname/catkin_ws/src   <span class="cm"># 进入绝对路径</span>
<span class="kw">cd</span> ..                           <span class="cm"># 进入上一级目录</span>
<span class="kw">cd</span> ~                            <span class="cm"># 回到用户主目录（/home/yourname）</span>
<span class="kw">cd</span> -                            <span class="cm"># 回到上一次所在的目录</span>
<span class="kw">cd</span>                              <span class="cm"># 不带参数，等价于 cd ~</span></code></pre></div>

<div class="callout tip">
  <strong>路径概念：</strong>以 <code>/</code> 开头的是<strong>绝对路径</strong>（从根目录开始）；不以 <code>/</code> 开头的是<strong>相对路径</strong>（从当前目录开始）。<code>..</code> 代表上一级目录，<code>.</code> 代表当前目录，<code>~</code> 代表用户主目录。
</div>

<h3>mkdir — 创建目录</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">mkdir</span> my_project          <span class="cm"># 创建单个目录</span>
<span class="kw">mkdir</span> -p a/b/c           <span class="cm"># 递归创建多级目录（父目录不存在则自动创建）</span></code></pre></div>

<h3>rm — 删除文件或目录</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">rm</span> file.txt              <span class="cm"># 删除文件</span>
<span class="kw">rm</span> -r my_dir             <span class="cm"># 递归删除目录及其内容</span>
<span class="kw">rm</span> -rf my_dir            <span class="cm"># 强制递归删除（不提示确认，谨慎使用！）</span></code></pre></div>

<div class="callout danger">
  <strong>危险警告：</strong><code>rm -rf</code> 删除的文件<strong>不会进入回收站</strong>，无法恢复！千万不要执行 <code>rm -rf /</code> 或 <code>rm -rf ~</code>，这会毁掉你的整个系统。在使用 rm 之前，先用 ls 确认你要删的东西。
</div>

<h3>cp 和 mv — 复制与移动</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cp</span> file.txt backup.txt           <span class="cm"># 复制文件</span>
<span class="kw">cp</span> -r src_dir dst_dir            <span class="cm"># 递归复制目录</span>
<span class="kw">mv</span> old_name.txt new_name.txt     <span class="cm"># 重命名/移动文件</span>
<span class="kw">mv</span> file.txt /tmp/                <span class="cm"># 将文件移动到 /tmp 目录</span></code></pre></div>

<h2>文件操作与编辑</h2>

<h3>cat — 查看文件内容</h3>
<p><code>cat</code> 用于在终端中快速查看文件的全部内容：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cat</span> /etc/os-release        <span class="cm"># 查看Ubuntu版本信息</span>
<span class="kw">cat</span> ~/.bashrc             <span class="cm"># 查看bash配置文件</span></code></pre></div>
<p>对于较长的文件，推荐使用 <code>less</code>（用方向键滚动，按 <code>q</code> 退出）：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">less</span> /var/log/syslog      <span class="cm"># 分页查看系统日志</span></code></pre></div>

<h3>nano — 简单的终端编辑器</h3>
<p><code>nano</code> 是最容易上手的终端文本编辑器，适合初学者快速编辑配置文件：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">nano</span> test.txt             <span class="cm"># 打开（或创建）文件进行编辑</span></code></pre></div>
<p>在 nano 中：</p>
<ul>
  <li>直接打字输入内容</li>
  <li><code>Ctrl+O</code> 保存（然后按 Enter 确认文件名）</li>
  <li><code>Ctrl+X</code> 退出</li>
  <li><code>Ctrl+W</code> 搜索文本</li>
</ul>

<h3>vim — 高效编辑器基础</h3>
<p><code>vim</code>（或 <code>vi</code>）是 Linux 系统自带的高级文本编辑器，学习曲线较陡但效率极高。作为 ROS 开发者，至少要知道怎么退出 vim：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">vim</span> test.txt              <span class="cm"># 用vim打开文件</span>
<span class="cm"># 按 i 进入插入模式（可以输入文字）</span>
<span class="cm"># 按 Esc 退出插入模式，回到普通模式</span>
<span class="cm"># 输入 :wq 保存并退出</span>
<span class="cm"># 输入 :q! 不保存强制退出</span></code></pre></div>

<h2>权限管理</h2>

<h3>理解 Linux 权限</h3>
<p>Linux 中每个文件和目录都有三组权限：<strong>所有者（user）</strong>、<strong>所属组（group）</strong>、<strong>其他用户（others）</strong>。每组权限包含读（r=4）、写（w=2）、执行（x=1）。</p>
<p>用 <code>ls -l</code> 看到的 <code>-rwxr-xr--</code> 含义是：所有者可读可写可执行（rwx=7），所属组可读可执行（r-x=5），其他人只能读（r--=4）。</p>

<h3>chmod — 修改权限</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">chmod</span> +x script.sh            <span class="cm"># 给文件添加可执行权限</span>
<span class="kw">chmod</span> 755 script.sh           <span class="cm"># rwxr-xr-x，所有者全权，其他人可读可执行</span>
<span class="kw">chmod</span> 644 file.txt            <span class="cm"># rw-r--r--，普通文件的典型权限</span></code></pre></div>

<div class="callout tip">
  <strong>ROS 相关：</strong>你用 Python 写的 ROS 节点脚本（.py 文件）必须有可执行权限才能用 <code>rosrun</code> 运行，否则会报 "Permission denied" 错误。解决方法就是 <code>chmod +x your_script.py</code>。
</div>

<h3>sudo — 以管理员身份执行</h3>
<p><code>sudo</code>（Superuser Do）允许你以系统管理员（root）身份执行命令。安装软件、修改系统配置、访问系统目录时都需要它：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">sudo</span> apt update              <span class="cm"># 以root权限更新软件包列表</span>
<span class="kw">sudo</span> nano /etc/hosts         <span class="cm"># 编辑系统配置文件</span></code></pre></div>
<p>第一次使用 sudo 时会要求输入你的登录密码（输入时终端不会显示任何字符，这是正常的，输完按回车即可）。</p>

<h2>进程管理</h2>

<h3>ps — 查看进程</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">ps</span> aux                      <span class="cm"># 查看系统中所有进程的详细信息</span>
<span class="kw">ps</span> aux | grep roscore       <span class="cm"># 查找roscore相关进程（管道用法见下文）</span></code></pre></div>

<h3>top / htop — 实时监控进程</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">top</span>                         <span class="cm"># 实时显示进程资源占用（按q退出）</span></code></pre></div>

<h3>kill — 终止进程</h3>
<p>当某个 ROS 节点卡死，或者终端被 Ctrl+C 无法终止时，你需要手动 kill 进程：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 先用 ps 或 pgrep 找到进程ID（PID）</span>
<span class="kw">pgrep</span> -a roscore            <span class="cm"># 查找roscore的PID</span>
<span class="kw">kill</span> 12345                  <span class="cm"># 向PID为12345的进程发送终止信号(SIGTERM)</span>
<span class="kw">kill</span> -9 12345               <span class="cm"># 强制杀死进程(SIGKILL)，用于普通kill无效时</span>
<span class="kw">pkill</span> -f roscore            <span class="cm"># 按名称杀死所有匹配的进程</span></code></pre></div>

<div class="callout warn">
  <strong>ROS 开发常见场景：</strong>如果 roscore 异常退出但端口被占用，下次启动时会报 "address already in use"。这时用 <code>pkill -f rosmaster</code> 或 <code>kill -9</code> 杀掉残留进程即可。
</div>

<h2>软件包管理（apt）</h2>
<p>Ubuntu 使用 <code>apt</code>（Advanced Package Tool）来安装、更新和卸载软件。ROS 本身和大部分依赖都是通过 apt 安装的。</p>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">sudo</span> apt update                  <span class="cm"># 更新软件包列表（必须定期执行）</span>
<span class="kw">sudo</span> apt upgrade                 <span class="cm"># 升级所有已安装的软件包</span>
<span class="kw">sudo</span> apt install ros-noetic-desktop-full   <span class="cm"># 安装ROS Noetic完整版</span>
<span class="kw">sudo</span> apt remove package-name     <span class="cm"># 卸载软件包（保留配置）</span>
<span class="kw">sudo</span> apt purge package-name      <span class="cm"># 彻底卸载（包括配置文件）</span>
<span class="kw">apt</span> search ros-noetic            <span class="cm"># 搜索ROS相关包</span></code></pre></div>

<h2>终端高效技巧</h2>

<h3>Tab 补全</h3>
<p>输入命令或路径时，按 <code>Tab</code> 键可以自动补全。按两次 Tab 会列出所有可能的补全选项。ROS 命令行工具（rosrun、roslaunch、rostopic 等）都支持 Tab 补全，极其方便：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>rosrun turtlesim turtlesim_node   <span class="cm"># 输入 rosrun tur 然后按Tab即可补全</span>
rostopic list                     <span class="cm"># 输入 rostopic l 然后按Tab</span></code></pre></div>

<h3>命令历史</h3>
<ul>
  <li><code>上/下方向键</code>：浏览之前输入过的命令</li>
  <li><code>history</code>：查看完整的命令历史列表</li>
  <li><code>Ctrl+R</code>：反向搜索历史命令（输入关键词即可找到之前执行过的命令）</li>
  <li><code>!n</code>：执行历史中第 n 条命令</li>
</ul>

<h3>管道与重定向</h3>
<p><strong>管道</strong>（<code>|</code>）可以把一个命令的输出作为另一个命令的输入。<strong>重定向</strong>（<code>&gt;</code>、<code>&gt;&gt;</code>）可以把输出写入文件。</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">ps</span> aux | grep python            <span class="cm"># 列出所有python进程</span>
<span class="kw">ls</span> -la | less                   <span class="cm"># 分页查看目录列表</span>
<span class="kw">cat</span> file.txt | grep <span class="str">"error"</span>   <span class="cm"># 在文件中搜索包含error的行</span>
<span class="kw">echo</span> <span class="str">"hello"</span> > output.txt      <span class="cm"># 将hello写入output.txt（覆盖原有内容）</span>
<span class="kw">echo</span> <span class="str">"world"</span> >> output.txt     <span class="cm"># 将world追加到output.txt末尾</span></code></pre></div>

<h3>其他实用快捷键</h3>
<ul>
  <li><code>Ctrl+C</code>：终止当前运行的程序（ROS 中最常用，用来停止节点）</li>
  <li><code>Ctrl+Shift+C</code> / <code>Ctrl+Shift+V</code>：终端中复制/粘贴（注意不是 Ctrl+C/V）</li>
  <li><code>Ctrl+L</code>：清屏（等价于 <code>clear</code> 命令）</li>
  <li><code>Ctrl+A</code>：光标跳到行首</li>
  <li><code>Ctrl+E</code>：光标跳到行尾</li>
</ul>

<h2>动手练习</h2>
<div class="steps">
  <div class="step">
    <h4>练习1：目录导航</h4>
    <p>打开终端，依次执行：<code>cd ~</code> → <code>mkdir -p ros_practice/subdir</code> → <code>cd ros_practice</code> → <code>pwd</code> → <code>ls -la</code> → <code>cd subdir</code> → <code>cd ../..</code>，确认你理解每个命令的效果。</p>
  </div>
  <div class="step">
    <h4>练习2：文件编辑与权限</h4>
    <p>执行 <code>nano hello.sh</code>，输入 <code>#!/bin/bash</code> 和 <code>echo "Hello ROS!"</code>，保存退出。然后执行 <code>chmod +x hello.sh</code>，最后 <code>./hello.sh</code> 运行它。</p>
  </div>
  <div class="step">
    <h4>练习3：进程管理</h4>
    <p>如果你已经安装了 ROS，尝试：在一个终端运行 <code>roscore</code>，另开一个终端执行 <code>ps aux | grep roscore</code> 查看进程，再用 <code>pkill -f rosmaster</code> 终止它。</p>
  </div>
</div>

<div class="callout tip">
  <strong>小结：</strong>Linux 命令行是 ROS 开发的基础功。不要死记硬背，多动手练习，在后续的 ROS 学习中反复使用这些命令，你会越来越熟练。遇到不认识的命令，使用 <code>man 命令名</code>（如 <code>man ls</code>）查看手册页，这是最权威的参考。
</div>
`
},

"ubuntu-setup": {
  t: "Ubuntu 系统安装与 ROS 环境配置",
  cat: "linux",
  lv: 0,
  pre: 1,
  time: "40分钟",
  desc: "从安装Ubuntu到成功运行roscore的完整流程",
  body: `
<h2>环境准备总览</h2>
<p>ROS1 的最新长期支持版本是 <strong>ROS Noetic Ninjemys</strong>，它官方支持的操作系统只有 <strong>Ubuntu 20.04 LTS (Focal Fossa)</strong>。版本匹配至关重要——如果你在 Ubuntu 18.04 上装 Noetic，或者在 Ubuntu 22.04 上装 Noetic，都会遇到各种依赖问题。</p>

<div class="callout goal">
  <strong>学习目标：</strong>完成本篇教程后，你将拥有一个可以正常使用的 ROS Noetic 开发环境，能够成功运行 <code>roscore</code> 和 <code>turtlesim</code>（小海龟仿真），并了解常见安装问题的解决方案。
</div>

<h2>第一步：安装 Ubuntu 20.04</h2>
<p>你有三种方式运行 Ubuntu 20.04：</p>
<ol>
  <li><strong>双系统安装</strong>（推荐）：在电脑上同时安装 Windows 和 Ubuntu，开机时选择进入哪个系统。性能最好，适合长期开发。</li>
  <li><strong>虚拟机安装</strong>（适合初学者）：使用 VMware Workstation 或 VirtualBox 在 Windows 中运行 Ubuntu。优点是不影响原有系统，缺点是性能有损耗，无法直接使用 USB 设备（如真实机器人）。</li>
  <li><strong>WSL2</strong>（不推荐）：Windows Subsystem for Linux 2。虽然可以运行 ROS，但 GUI 支持和硬件访问有限制，不适合机器人开发入门。</li>
</ol>

<h3>制作安装U盘（双系统）</h3>
<div class="steps">
  <div class="step">
    <h4>下载 Ubuntu 20.04 镜像</h4>
    <p>访问 Ubuntu 官网下载 <code>ubuntu-20.04.6-desktop-amd64.iso</code>，文件大小约 4GB。建议从国内镜像源（如清华镜像、中科大镜像）下载，速度更快。</p>
  </div>
  <div class="step">
    <h4>制作启动U盘</h4>
    <p>准备一个容量 ≥ 4GB 的U盘（数据会被清空）。使用 Rufus（Windows）或 Etcher（跨平台）将 ISO 镜像写入U盘。</p>
  </div>
  <div class="step">
    <h4>安装系统</h4>
    <p>重启电脑，在 BIOS/UEFI 中设置从U盘启动（通常按 F12/F2/Del 进入启动菜单）。按照安装向导操作：选择语言、键盘布局，在"安装类型"步骤选择"与 Windows 共存"或"清除整个磁盘"（如果只装 Ubuntu）。设置用户名和密码，等待安装完成。</p>
  </div>
</div>

<div class="callout warn">
  <strong>磁盘空间建议：</strong>给 Ubuntu 至少分配 50GB 磁盘空间（ROS + 各种依赖包 + 你的工作空间会占用不少空间）。如果做机器人仿真（Gazebo），建议 100GB 以上。
</div>

<h2>第二步：配置软件源</h2>
<p>安装完 Ubuntu 后，第一件事是把软件源换成国内镜像，这样下载速度会快很多。</p>

<h3>方法一：图形界面配置</h3>
<p>打开"软件和更新"（Software & Updates），在"Ubuntu 软件"选项卡中，将"下载自"改为"中国的服务器"或手动选择 <code>mirrors.tuna.tsinghua.edu.cn</code>（清华源）或 <code>mirrors.ustc.edu.cn</code>（中科大源）。</p>

<h3>方法二：命令行配置</h3>
<p>备份原配置并替换为清华源：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 备份原始源列表</span>
<span class="kw">sudo</span> cp /etc/apt/sources.list /etc/apt/sources.list.bak

<span class="cm"># 使用清华镜像源替换</span>
<span class="kw">sudo</span> sed -i <span class="str">"s@http://.*archive.ubuntu.com@https://mirrors.tuna.tsinghua.edu.cn@g"</span> /etc/apt/sources.list
<span class="kw">sudo</span> sed -i <span class="str">"s@http://.*security.ubuntu.com@https://mirrors.tuna.tsinghua.edu.cn@g"</span> /etc/apt/sources.list

<span class="cm"># 更新软件包索引</span>
<span class="kw">sudo</span> apt update</code></pre></div>

<p>如果你使用的是中科大源，把上面的 URL 替换为 <code>https://mirrors.ustc.edu.cn</code>。</p>

<h2>第三步：安装 ROS Noetic</h2>
<p>以下步骤严格按照 ROS 官方安装文档整理，并适配国内网络环境。</p>

<h3>3.1 设置 sources.list</h3>
<p>配置你的系统以接受 packages.ros.org 的软件：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">sudo</span> sh -c <span class="str">'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'</span></code></pre></div>

<div class="callout tip">
  <strong>国内用户加速：</strong>上面的命令使用的是官方源，国内访问可能很慢。如果你在国内，可以换成清华镜像：
  <code>sudo sh -c '. /etc/lsb-release && echo "deb https://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ $DISTRIB_CODENAME main" > /etc/apt/sources.list.d/ros-latest.list'</code>
</div>

<h3>3.2 设置密钥</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">sudo</span> apt install curl -y
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | <span class="kw">sudo</span> apt-key add -</code></pre></div>

<div class="callout warn">
  <strong>密钥添加失败？</strong>如果 raw.githubusercontent.com 无法访问，你可以手动下载密钥文件或使用其他镜像源的密钥。确保看到输出 "OK" 才表示密钥添加成功。
</div>

<h3>3.3 更新并安装 ROS</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">sudo</span> apt update

<span class="cm"># 安装桌面完整版（推荐，包含ROS、rqt、rviz、机器人通用库、2D/3D仿真器等）</span>
<span class="kw">sudo</span> apt install ros-noetic-desktop-full -y</code></pre></div>

<p>这个过程会下载约 2GB 的文件，安装大小约 4GB，根据网速可能需要 10~30 分钟。如果你的磁盘空间紧张，也可以安装精简版：</p>
<ul>
  <li><code>ros-noetic-desktop</code>：桌面版，不含 Gazebo 仿真器</li>
  <li><code>ros-noetic-ros-base</code>：基础版，只有核心库，无 GUI 工具</li>
</ul>

<h2>第四步：环境配置</h2>
<p>安装完成后，每次打开终端都需要 source ROS 的环境设置文件，否则系统找不到 ROS 命令。为了方便，我们把它加到 <code>.bashrc</code> 中，使其自动生效：</p>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">echo</span> <span class="str">"source /opt/ros/noetic/setup.bash"</span> >> ~/.bashrc
<span class="kw">source</span> ~/.bashrc</code></pre></div>

<p>验证环境变量是否设置成功：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">echo</span> $ROS_DISTRO
<span class="cm"># 应该输出: noetic</span>

<span class="kw">which</span> roscore
<span class="cm"># 应该输出: /opt/ros/noetic/bin/roscore</span></code></pre></div>

<h2>第五步：初始化 rosdep</h2>
<p><code>rosdep</code> 是 ROS 的依赖管理工具，编译源码包时必须用到。这一步是国内用户最容易卡住的地方。</p>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">sudo</span> apt install python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential -y
<span class="kw">sudo</span> rosdep init
rosdep update</code></pre></div>

<div class="callout danger">
  <strong>rosdep init 失败的常见原因和解决方案：</strong>
  <ul>
    <li><strong>raw.githubusercontent.com 无法访问</strong>：这是国内网络问题。解决方法有三：(1) 设置代理；(2) 修改 /etc/hosts 文件添加 raw.githubusercontent.com 的 IP 地址（通过 <code>sudo nano /etc/hosts</code> 添加 IP，IP 可通过 https://www.ipaddress.com 查询）；(3) 使用国内镜像的 rosdepc 工具（<code>sudo pip3 install rosdepc</code>，然后 <code>sudo rosdepc init</code> 和 <code>rosdepc update</code>）。</li>
    <li><strong>提示 "rosdep: command not found"</strong>：说明 python3-rosdep 没有安装成功，重新执行 <code>sudo apt install python3-rosdep</code>。</li>
    <li><strong>提示已存在</strong>：如果之前装过 ROS 可能会报错 "ERROR: default sources list file already exists"，执行 <code>sudo rm /etc/ros/rosdep/sources.list.d/20-default.list</code> 后重试。</li>
  </ul>
</div>

<h2>第六步：验证安装</h2>
<p>激动人心的时刻到了！让我们验证 ROS 是否正常工作。</p>

<h3>6.1 运行 roscore</h3>
<p>打开一个新终端（Ctrl+Alt+T），输入：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>roscore</code></pre></div>
<div class="code-out">... logging to /home/yourname/.ros/log/...
started roslaunch server http://yourname:xxxxx/
ros_comm version 1.16.0

SUMMARY
========

PARAMETERS
 * /rosdistro: noetic
 * /rosversion: 1.16.0

NODES

auto-starting new master
process[master]: started with pid [xxxxx]
ROS_MASTER_URI=http://yourname:11311/

setting /run_id to ...
process[rosout-1]: started with pid [xxxxx]
started core service [/rosout]</div>

<p>看到 <code>started core service [/rosout]</code> 说明 roscore 启动成功！<strong>保持这个终端不要关闭</strong>（roscore 是 ROS 的核心，它关了所有节点都无法通信）。</p>

<h3>6.2 运行小海龟仿真</h3>
<p>打开第二个终端（Ctrl+Shift+T 或新窗口），运行：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>rosrun turtlesim turtlesim_node</code></pre></div>
<p>你会看到一个蓝色背景的窗口出现，中间有一只小海龟。</p>
<p>打开第三个终端，运行键盘控制节点：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>rosrun turtlesim turtle_teleop_key</code></pre></div>
<div class="code-out">Reading from keyboard
---------------------------
Use arrow keys to move the turtle.
Use G|B|V|C|D|E|R|T keys to drive in FRC style!
(Anything else will stop the turtle)</div>
<p>确保<strong>第三个终端窗口是选中状态</strong>（点击它），然后按方向键，你就可以控制小海龟在屏幕上移动了！</p>

<h2>第七步：安装常用工具</h2>
<p>以下工具在后续开发中会经常用到，建议一并安装：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># ROS常用包和工具</span>
<span class="kw">sudo</span> apt install ros-noetic-rqt* ros-noetic-rviz -y

<span class="cm"># Python和C++开发工具</span>
<span class="kw">sudo</span> apt install python3-catkin-tools python3-osrf-pycommon -y
<span class="kw">sudo</span> apt install build-essential gdb cmake git -y

<span class="cm"># catkin build工具（比catkin_make更现代）</span>
<span class="kw">sudo</span> apt install python3-catkin-tools -y</code></pre></div>

<h2>常见安装问题排查</h2>
<table>
  <tr><th>问题</th><th>原因</th><th>解决方案</th></tr>
  <tr><td>Unable to locate package ros-noetic-desktop-full</td><td>sources.list 未设置或 apt update 未执行</td><td>重新执行第三步的 sources.list 配置和 sudo apt update</td></tr>
  <tr><td>rosdep update 超时</td><td>无法访问 raw.githubusercontent.com</td><td>设置代理或使用 rosdepc 替代，或修改 hosts 文件</td></tr>
  <tr><td>roscore 命令找不到</td><td>没有 source setup.bash</td><td>执行 <code>source /opt/ros/noetic/setup.bash</code>，并检查 .bashrc</td></tr>
  <tr><td>运行 rosrun 时 Tab 补全无效</td><td>没有安装 python3-argcomplete</td><td><code>sudo apt install python3-argcomplete</code></td></tr>
  <tr><td>小海龟窗口弹不出来</td><td>虚拟机没有启用 3D 加速或缺少 GUI 依赖</td><td>虚拟机设置中开启 3D 加速；安装 <code>sudo apt install ros-noetic-turtlesim</code></td></tr>
</table>

<div class="callout tip">
  <strong>检查你的安装：</strong>执行 <code>printenv | grep ROS</code>，你应该能看到 ROS_DISTRO=noetic、ROS_ROOT=/opt/ros/noetic/share/ros、ROS_MASTER_URI=http://localhost:11311 等环境变量。这些是 ROS 正常工作的前提。
</div>

<p>恭喜！你已经成功搭建好了 ROS Noetic 的开发环境。在下一篇教程中，我们将学习 Git 版本控制，这是管理 ROS 项目代码的必备技能。</p>
`
},

"git-basics": {
  t: "Git 版本控制基础",
  cat: "linux",
  lv: 0,
  pre: 2,
  time: "25分钟",
  desc: "ROS开发中必备的Git版本控制技能",
  body: `
<h2>为什么 ROS 开发需要 Git</h2>
<p>ROS 项目通常包含多个功能包（package）、大量源代码、配置文件、启动文件（launch 文件）和消息定义。在开发过程中，你可能会：修改了一段代码导致机器人不工作了，想回到之前的版本；和同学合作开发一个机器人项目，需要合并彼此的代码；想记录每一次修改做了什么——这正是 <strong>Git</strong> 解决的问题。</p>
<p>Git 是目前世界上最流行的<strong>分布式版本控制系统</strong>。ROS 的核心代码和绝大多数开源 ROS 包都托管在 GitHub 上。学会 Git，你不仅能管理自己的代码，还能方便地使用全世界 ROS 开发者贡献的开源项目。</p>

<div class="callout goal">
  <strong>学习目标：</strong>掌握 Git 的安装配置、基本工作流（init/add/commit/push/pull）、分支操作、.gitignore 配置，以及在 ROS 工作空间中使用 Git 的最佳实践。
</div>

<h2>Git 安装与初始配置</h2>

<h3>安装 Git</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">sudo</span> apt install git -y

<span class="cm"># 验证安装</span>
<span class="kw">git</span> --version
<span class="cm"># 输出示例：git version 2.25.1</span></code></pre></div>

<h3>配置用户信息</h3>
<p>每次 Git 提交都会记录你的名字和邮箱，所以第一次使用必须配置：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">git</span> config --global user.name <span class="str">"Your Name"</span>
<span class="kw">git</span> config --global user.email <span class="str">"your.email@example.com"</span>

<span class="cm"># 配置默认编辑器为nano（可选）</span>
<span class="kw">git</span> config --global core.editor nano

<span class="cm"># 查看所有配置</span>
<span class="kw">git</span> config --list</code></pre></div>

<div class="callout tip">
  <strong>重要：</strong>user.email 建议使用你注册 GitHub 时的邮箱，这样你的提交才能在 GitHub 上正确关联到你的账户。
</div>

<h2>Git 基本概念</h2>
<p>在开始使用之前，理解几个核心概念：</p>
<ul>
  <li><strong>仓库（Repository）</strong>：被 Git 管理的项目目录，包含所有文件及其修改历史。</li>
  <li><strong>工作区（Working Directory）</strong>：你在电脑上实际看到和编辑的文件。</li>
  <li><strong>暂存区（Staging Area/Index）</strong>：下次要提交的文件列表，用 <code>git add</code> 添加。</li>
  <li><strong>提交（Commit）</strong>：一次快照，记录某一时刻文件的状态。每个 commit 有唯一的哈希值（如 a1b2c3d）。</li>
  <li><strong>远程仓库（Remote）</strong>：托管在服务器（如 GitHub）上的仓库，用于多人协作和备份。</li>
</ul>

<h2>基本工作流：init → add → commit</h2>

<h3>git init — 初始化仓库</h3>
<p>在项目目录中执行 <code>git init</code> 会创建一个隐藏的 <code>.git</code> 目录，Git 从这时候开始追踪你的文件变化：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">mkdir</span> my_ros_project
<span class="kw">cd</span> my_ros_project
<span class="kw">git</span> init
<span class="cm"># 输出: Initialized empty Git repository in /home/you/my_ros_project/.git/</span></code></pre></div>

<h3>git status — 查看状态</h3>
<p><code>git status</code> 是你最常用的命令之一，它告诉你哪些文件被修改了、哪些在暂存区、哪些未被追踪：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">echo</span> <span class="str">"# My ROS Project"</span> > README.md
<span class="kw">git</span> status</code></pre></div>
<div class="code-out">On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)</div>
<p>"Untracked files" 表示 Git 还没有开始管理这个文件。</p>

<h3>git add — 添加到暂存区</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">git</span> add README.md           <span class="cm"># 添加单个文件</span>
<span class="kw">git</span> add .                   <span class="cm"># 添加当前目录下所有变化（常用！）</span></code></pre></div>

<h3>git commit — 提交</h3>
<p>把暂存区的内容永久记录到仓库历史中：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">git</span> commit -m <span class="str">"Initial commit: add README"</span></code></pre></div>
<p><code>-m</code> 后面跟的是<strong>提交信息</strong>（commit message），应该简洁明了地描述这次提交做了什么。好的提交信息如 "Add laser scan obstacle avoidance node"、"Fix odometry frame_id bug"；不好的提交信息如 "update"、"fix stuff"、"asdf"。</p>

<div class="callout tip">
  <strong>工作流口诀：</strong>改文件 → <code>git add</code> → <code>git commit -m "说明"</code>。每完成一个小功能或修复一个 bug，就做一次提交，保持提交粒度小而频繁。
</div>

<h3>git log — 查看历史</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">git</span> log                     <span class="cm"># 查看提交历史</span>
<span class="kw">git</span> log --oneline           <span class="cm"># 紧凑格式（每个提交一行）</span>
<span class="kw">git</span> log --oneline --graph   <span class="cm"># 图形化显示分支合并历史</span></code></pre></div>

<h2>与远程仓库交互：push / pull / clone</h2>

<h3>git clone — 克隆远程仓库</h3>
<p>当你想下载一个已有的 ROS 项目（比如 GitHub 上的开源包），使用 <code>git clone</code>：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 克隆ROS官方tutorials仓库</span>
<span class="kw">git</span> clone https://github.com/ros/ros_tutorials.git
<span class="kw">cd</span> ros_tutorials</code></pre></div>

<h3>在 GitHub 上创建远程仓库</h3>
<div class="steps">
  <div class="step">
    <h4>注册/登录 GitHub</h4>
    <p>访问 github.com，注册一个免费账户（学生可以申请 GitHub Student Pack，获得私有仓库等福利）。</p>
  </div>
  <div class="step">
    <h4>创建新仓库</h4>
    <p>点击右上角 "+" → "New repository"，填写仓库名称（如 my_ros_project），选择 Public 或 Private，不要勾选 "Initialize this repository with a README"（因为你本地已经有内容了），点击 "Create repository"。</p>
  </div>
  <div class="step">
    <h4>关联本地仓库并推送</h4>
  </div>
</div>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 在你的本地项目目录中</span>
<span class="kw">git</span> remote add origin https://github.com/你的用户名/my_ros_project.git
<span class="kw">git</span> branch -M main
<span class="kw">git</span> push -u origin main</code></pre></div>

<h3>git push — 推送到远程</h3>
<p>之后每次本地提交后，执行 <code>git push</code> 就可以把本地的提交上传到 GitHub：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">git</span> add .
<span class="kw">git</span> commit -m <span class="str">"Add navigation launch file"</span>
<span class="kw">git</span> push</code></pre></div>

<h3>git pull — 拉取远程更新</h3>
<p>如果你在多台电脑上开发，或者和别人协作，需要先拉取远程最新改动再推送：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">git</span> pull                    <span class="cm"># 拉取并合并远程更新</span></code></pre></div>

<h3>配置 SSH 免密推送（可选但推荐）</h3>
<p>每次 push 都输入密码很麻烦，可以配置 SSH 密钥：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 生成SSH密钥（一路回车即可）</span>
ssh-keygen -t ed25519 -C <span class="str">"your.email@example.com"</span>

<span class="cm"># 显示公钥，复制全部内容</span>
<span class="kw">cat</span> ~/.ssh/id_ed25519.pub</code></pre></div>
<p>然后去 GitHub → Settings → SSH and GPG keys → New SSH key，粘贴公钥内容保存。之后把远程 URL 改为 SSH 格式：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">git</span> remote set-url origin git@github.com:你的用户名/my_ros_project.git</code></pre></div>

<h2>分支操作</h2>
<p><strong>分支</strong>是 Git 最强大的功能之一。你可以在不影响主分支（main/master）的情况下开发新功能，开发完成后再合并回去。</p>

<h3>创建与切换分支</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">git</span> branch                  <span class="cm"># 查看所有分支（*标记当前分支）</span>
<span class="kw">git</span> branch feature-lidar    <span class="cm"># 创建名为feature-lidar的新分支</span>
<span class="kw">git</span> checkout feature-lidar  <span class="cm"># 切换到feature-lidar分支</span>
<span class="kw">git</span> checkout -b feature-imu <span class="cm"># 创建并切换到新分支（快捷写法）</span>
<span class="kw">git</span> switch main             <span class="cm"># 切回主分支（git 2.23+新语法）</span></code></pre></div>

<h3>合并分支</h3>
<p>当你在 feature 分支上完成了开发和测试，需要把它合并回主分支：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">git</span> checkout main           <span class="cm"># 先切回主分支</span>
<span class="kw">git</span> merge feature-lidar     <span class="cm"># 将feature-lidar分支的改动合并进来</span></code></pre></div>

<h3>删除分支</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">git</span> branch -d feature-lidar <span class="cm"># 删除已合并的分支</span>
<span class="kw">git</span> branch -D feature-lidar <span class="cm"># 强制删除未合并的分支</span></code></pre></div>

<h2>.gitignore 文件</h2>
<p>不是所有文件都应该被 Git 管理。ROS 编译产生的 <code>build/</code>、<code>devel/</code>、<code>install/</code> 目录，编辑器临时文件，日志文件等都不应该提交到仓库。在项目根目录创建一个 <code>.gitignore</code> 文件来告诉 Git 忽略它们：</p>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">nano</span> .gitignore</code></pre></div>

<p>ROS 工作空间推荐的 .gitignore 内容：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># Catkin编译产物</span>
build/
devel/
install/
logs/

<span class="cm"># IDE和编辑器文件</span>
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

<span class="cm"># 日志文件</span>
*.log
.ros/

<span class="cm"># Python缓存</span>
__pycache__/
*.pyc

<span class="cm"># CMake缓存</span>
CMakeCache.txt
CMakeFiles/
cmake_install.cmake
Makefile</code></pre></div>

<div class="callout warn">
  <strong>切记：</strong>永远不要把 <code>build/</code>、<code>devel/</code>、<code>install/</code> 这三个目录提交到 Git！它们是编译生成的，每个电脑上编译出来的都不一样，提交它们只会污染仓库。只需要提交 <code>src/</code> 目录下的源代码和配置文件。
</div>

<h2>ROS 工作空间的 Git 最佳实践</h2>

<h3>推荐策略一：整个工作空间一个仓库（适合个人项目）</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cd</span> ~/catkin_ws
<span class="kw">git</span> init
<span class="kw">nano</span> .gitignore              <span class="cm"># 写入上面的忽略规则</span>
<span class="kw">git</span> add .gitignore
<span class="kw">git</span> commit -m <span class="str">"Add .gitignore for catkin workspace"</span>
<span class="kw">git</span> add src/
<span class="kw">git</span> commit -m <span class="str">"Add source packages"</span></code></pre></div>

<h3>推荐策略二：每个 Package 单独仓库（适合开源/协作项目）</h3>
<p>如果你的 package 要开源给别人用，应该为每个 package 创建独立的 Git 仓库。在别人的工作空间中，通过 <code>git clone</code> 将包放到 <code>src/</code> 下即可：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cd</span> ~/catkin_ws/src
<span class="kw">git</span> clone https://github.com/someone/awesome_ros_pkg.git
<span class="kw">cd</span> ..
catkin_make                  <span class="cm"># 重新编译工作空间</span></code></pre></div>

<h3>实用技巧：撤销修改</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 撤销工作区的修改（还没git add），恢复到上次commit的状态</span>
<span class="kw">git</span> checkout -- filename.txt

<span class="cm"># 取消暂存（已经git add但还没commit）</span>
<span class="kw">git</span> reset HEAD filename.txt

<span class="cm"># 撤销最近一次提交（保留修改在工作区）</span>
<span class="kw">git</span> reset --soft HEAD^

<span class="cm"># 查看某个文件的修改内容</span>
<span class="kw">git</span> diff filename.txt</code></pre></div>

<h2>动手练习</h2>
<div class="steps">
  <div class="step">
    <h4>练习1：创建本地仓库并提交</h4>
    <p>创建一个目录，git init，创建几个文件，练习 add 和 commit 操作，用 git log 查看历史。</p>
  </div>
  <div class="step">
    <h4>练习2：分支开发</h4>
    <p>创建一个新分支，在新分支上修改文件并提交，然后切回主分支观察文件是否变化，最后合并分支。</p>
  </div>
  <div class="step">
    <h4>练习3：推送到 GitHub</h4>
    <p>在 GitHub 上创建一个仓库，将你的 catkin_ws/src 推送到远程（注意先配置好 .gitignore 排除 build/devel）。</p>
  </div>
</div>

<div class="callout tip">
  <strong>进阶学习：</strong>Git 还有很多高级功能，如 stash（暂存未完成的修改）、rebase（变基）、tag（打标签标记版本）、解决合并冲突等。入门阶段先掌握 add/commit/push/pull/branch/checkout 这六个命令，就能覆盖 90% 的日常使用场景。
</div>
`
},

"c-basics-intro": {
  t: "C语言入门：从编译到运行",
  cat: "code",
  lv: 0,
  pre: 0,
  time: "30分钟",
  desc: "ROS C++开发所需的C语言基础知识",
  body: `
<h2>为什么 ROS 开发者需要学 C 语言</h2>
<p>ROS 的客户端库主要有两个：<strong>roscpp</strong>（C++）和 <strong>rospy</strong>（Python）。C++ 是 ROS 的主要开发语言，核心库和性能关键的节点（如导航、SLAM、点云处理）几乎都用 C++ 编写。而 C++ 是 C 语言的超集，C++ 编译器可以直接编译 C 代码，C++ 的基本语法（变量、指针、函数、结构体）都继承自 C。</p>
<p>理解 C 语言的核心概念——尤其是<strong>指针</strong>和<strong>内存管理</strong>——是读懂和编写 ROS C++ 节点的基础。本篇不会全面覆盖 C 语言的所有特性，而是聚焦于"编译 ROS 节点所需的最小 C 知识"。</p>

<div class="callout goal">
  <strong>学习目标：</strong>掌握 gcc 编译流程、基本变量类型、指针概念、函数定义、结构体、头文件与源文件分离、Makefile 基础。学完后你能读懂简单的 ROS C++ 节点的 C 语言部分。
</div>

<h2>从 Hello World 开始：编译与运行</h2>

<h3>编写第一个 C 程序</h3>
<p>创建一个 <code>hello.c</code> 文件：</p>
<div class="code-block"><span class="code-lang">c</span><pre><code><span class="cm">// hello.c - 我的第一个C程序</span>
<span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="type">int</span> <span class="fn">main</span>() {
    <span class="fn">printf</span>(<span class="str">"Hello, ROS!\n"</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<p>逐行解释：</p>
<ul>
  <li><code>#include &lt;stdio.h&gt;</code>：引入标准输入输出头文件，<code>printf</code> 函数就在这里声明。</li>
  <li><code>int main()</code>：程序入口函数，每个 C 程序必须有且仅有一个 <code>main</code> 函数。<code>int</code> 表示它返回一个整数。</li>
  <li><code>printf("Hello, ROS!\n");</code>：调用标准库函数 printf 打印字符串，<code>\n</code> 是换行符。</li>
  <li><code>return 0;</code>：返回 0 给操作系统，表示程序正常退出。</li>
</ul>

<h3>用 gcc 编译</h3>
<p>C 是<strong>编译型语言</strong>，源代码（.c 文件）不能直接运行，必须先经过编译器翻译成机器码（可执行文件）。在 Ubuntu 上我们使用 <code>gcc</code>（GNU Compiler Collection）：</p>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 先确保gcc已安装</span>
<span class="kw">sudo</span> apt install gcc build-essential -y

<span class="cm"># 编译hello.c，生成名为hello的可执行文件</span>
<span class="kw">gcc</span> hello.c -o hello

<span class="cm"># 运行</span>
./hello</code></pre></div>
<div class="code-out">Hello, ROS!</div>

<p><code>-o hello</code> 指定输出文件名。如果不加 <code>-o</code>，gcc 会默认生成 <code>a.out</code>。</p>

<h3>编译的四个阶段</h3>
<p>了解编译过程有助于理解 ROS 的 catkin 编译系统在做什么：</p>
<ol>
  <li><strong>预处理（Preprocessing）</strong>：处理 <code>#include</code>、<code>#define</code> 等预处理指令，展开宏。<code>gcc -E hello.c -o hello.i</code></li>
  <li><strong>编译（Compilation）</strong>：将预处理后的代码翻译成汇编语言。<code>gcc -S hello.i -o hello.s</code></li>
  <li><strong>汇编（Assembly）</strong>：将汇编代码翻译成机器码（目标文件 .o）。<code>gcc -c hello.s -o hello.o</code></li>
  <li><strong>链接（Linking）</strong>：将目标文件和库文件链接成最终的可执行文件。<code>gcc hello.o -o hello</code></li>
</ol>

<h2>变量与基本数据类型</h2>
<p>C 语言中变量必须先声明后使用，声明时要指定类型：</p>
<div class="code-block"><span class="code-lang">c</span><pre><code><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="type">int</span> <span class="fn">main</span>() {
    <span class="type">int</span> count = <span class="num">10</span>;              <span class="cm">// 整数，通常4字节</span>
    <span class="type">float</span> pi = <span class="num">3.14f</span>;           <span class="cm">// 单精度浮点数</span>
    <span class="type">double</span> e = <span class="num">2.71828</span>;        <span class="cm">// 双精度浮点数（ROS中常用）</span>
    <span class="type">char</span> grade = <span class="str">'A'</span>;           <span class="cm">// 单个字符，1字节</span>
    <span class="type">char</span> name[] = <span class="str">"ROS"</span>;        <span class="cm">// 字符串（字符数组）</span>

    <span class="fn">printf</span>(<span class="str">"count=%d, pi=%.2f, e=%.5f, grade=%c, name=%s\n"</span>,
           count, pi, e, grade, name);
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<p>printf 格式说明符：<code>%d</code> 整数、<code>%f</code> 浮点数、<code>%c</code> 字符、<code>%s</code> 字符串、<code>%p</code> 指针地址。</p>

<h2>指针基础</h2>
<p><strong>指针</strong>是 C 语言最核心也最容易让初学者困惑的概念。一句话解释：指针是一个变量，它存储的是<strong>内存地址</strong>，而不是普通数据。</p>

<div class="code-block"><span class="code-lang">c</span><pre><code><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="type">int</span> <span class="fn">main</span>() {
    <span class="type">int</span> x = <span class="num">42</span>;
    <span class="type">int</span> *p = &x;    <span class="cm">// p是一个指针，存储x的地址；&是取地址运算符</span>

    <span class="fn">printf</span>(<span class="str">"x的值: %d\n"</span>, x);        <span class="cm">// 输出 42</span>
    <span class="fn">printf</span>(<span class="str">"x的地址: %p\n"</span>, &x);     <span class="cm">// 输出类似 0x7ffd...</span>
    <span class="fn">printf</span>(<span class="str">"p存储的地址: %p\n"</span>, p);  <span class="cm">// 和&x相同</span>
    <span class="fn">printf</span>(<span class="str">"p指向的值: %d\n"</span>, *p);   <span class="cm">// 输出 42（*是解引用运算符）</span>

    *p = <span class="num">100</span>;                       <span class="cm">// 通过指针修改x的值</span>
    <span class="fn">printf</span>(<span class="str">"修改后x的值: %d\n"</span>, x);  <span class="cm">// 输出 100</span>

    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<div class="callout warn">
  <strong>指针符号的双重含义：</strong>
  <ul>
    <li>声明时：<code>int *p</code> 中的 <code>*</code> 表示"p是一个指向int的指针"。</li>
    <li>使用时：<code>*p</code> 中的 <code>*</code> 是解引用运算符，表示"取p指向地址的值"。</li>
    <li><code>&x</code> 中的 <code>&</code> 是取地址运算符，表示"取变量x的内存地址"。</li>
  </ul>
</div>

<h3>指针与 ROS 的关系</h3>
<p>在 ROS C++ 编程中，指针无处不在：</p>
<ul>
  <li>消息发布器/订阅器的句柄通常用智能指针（如 <code>boost::shared_ptr</code>）。</li>
  <li>回调函数中传入的消息通常是 <code>const 消息类型::ConstPtr&</code>（常引用的智能指针）。</li>
  <li>理解指针有助于理解 ROS 的<strong>引用传递</strong>机制，避免不必要的数据拷贝。</li>
</ul>

<h2>函数</h2>
<p>C 程序由函数组成。函数可以接收参数、返回值。函数在使用前必须<strong>声明</strong>（告诉编译器函数的签名），<strong>定义</strong>（具体实现）可以放在后面或其他文件中。</p>

<div class="code-block"><span class="code-lang">c</span><pre><code><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span>

<span class="cm">// 函数声明（原型）</span>
<span class="type">int</span> <span class="fn">add</span>(<span class="type">int</span> a, <span class="type">int</span> b);
<span class="type">void</span> <span class="fn">greet</span>(<span class="type">const</span> <span class="type">char</span> *name);

<span class="type">int</span> <span class="fn">main</span>() {
    <span class="type">int</span> result = <span class="fn">add</span>(<span class="num">3</span>, <span class="num">5</span>);
    <span class="fn">printf</span>(<span class="str">"3 + 5 = %d\n"</span>, result);
    <span class="fn">greet</span>(<span class="str">"ROS Developer"</span>);
    <span class="kw">return</span> <span class="num">0</span>;
}

<span class="cm">// 函数定义</span>
<span class="type">int</span> <span class="fn">add</span>(<span class="type">int</span> a, <span class="type">int</span> b) {
    <span class="kw">return</span> a + b;
}

<span class="type">void</span> <span class="fn">greet</span>(<span class="type">const</span> <span class="type">char</span> *name) {
    <span class="fn">printf</span>(<span class="str">"Hello, %s!\n"</span>, name);
}</code></pre></div>

<h3>值传递 vs 指针传递</h3>
<p>C 语言函数参数默认是<strong>值传递</strong>（传递一份拷贝），函数内修改参数不影响外面的变量。要修改外部变量需要传指针：</p>
<div class="code-block"><span class="code-lang">c</span><pre><code><span class="type">void</span> <span class="fn">wrong_swap</span>(<span class="type">int</span> a, <span class="type">int</span> b) {
    <span class="type">int</span> tmp = a; a = b; b = tmp;  <span class="cm">// 只交换了拷贝，外面没变化</span>
}

<span class="type">void</span> <span class="fn">correct_swap</span>(<span class="type">int</span> *a, <span class="type">int</span> *b) {
    <span class="type">int</span> tmp = *a; *a = *b; *b = tmp;  <span class="cm">// 通过指针修改原值</span>
}

<span class="cm">// 调用</span>
<span class="type">int</span> x = <span class="num">1</span>, y = <span class="num">2</span>;
<span class="fn">correct_swap</span>(&x, &y);  <span class="cm">// 传入地址</span></code></pre></div>

<h2>结构体</h2>
<p><strong>结构体（struct）</strong>允许你将多个不同类型的变量组合成一个自定义类型，类似于 ROS 消息中的复合数据：</p>

<div class="code-block"><span class="code-lang">c</span><pre><code><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span>
<span class="pp">#include</span> <span class="str">&lt;string.h&gt;</span>

<span class="kw">struct</span> <span class="type">RobotPose</span> {
    <span class="type">double</span> x;
    <span class="type">double</span> y;
    <span class="type">double</span> theta;
    <span class="type">char</span> frame_id[<span class="num">32</span>];
};

<span class="type">int</span> <span class="fn">main</span>() {
    <span class="kw">struct</span> <span class="type">RobotPose</span> pose;
    pose.x = <span class="num">1.5</span>;
    pose.y = <span class="num">2.3</span>;
    pose.theta = <span class="num">0.785</span>;  <span class="cm">// 45度（弧度）</span>
    <span class="fn">strcpy</span>(pose.frame_id, <span class="str">"odom"</span>);

    <span class="fn">printf</span>(<span class="str">"Robot at (%.2f, %.2f), heading %.2f rad, frame=%s\n"</span>,
           pose.x, pose.y, pose.theta, pose.frame_id);

    <span class="cm">// 结构体指针</span>
    <span class="kw">struct</span> <span class="type">RobotPose</span> *p = &pose;
    p->x = <span class="num">3.0</span>;  <span class="cm">// -> 是通过指针访问成员的简写（等价于 (*p).x）</span>
    <span class="fn">printf</span>(<span class="str">"Updated x: %.2f\n"</span>, p->x);

    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<div class="callout tip">
  <strong>联系 ROS：</strong>ROS 中的消息类型（如 geometry_msgs/Twist、sensor_msgs/LaserScan）在 C++ 中本质上就是结构体（class/struct）。你通过 <code>msg.linear.x = 0.5</code> 这样的方式赋值，和上面结构体的用法完全一致。
</div>

<h2>头文件与源文件分离</h2>
<p>当程序变大时，不能把所有代码写在一个 .c 文件里。C 语言的做法是将代码拆分为<strong>头文件（.h）</strong>和<strong>源文件（.c）</strong>：</p>
<ul>
  <li><strong>头文件（.h）</strong>：包含函数声明、宏定义、类型声明。相当于"说明书"。</li>
  <li><strong>源文件（.c）</strong>：包含函数的具体实现。相当于"内部实现"。</li>
</ul>

<p>创建一个简单的两文件项目：</p>

<p><code>mymath.h</code>（头文件）：</p>
<div class="code-block"><span class="code-lang">c</span><pre><code><span class="pp">#ifndef</span> MYMATH_H
<span class="pp">#define</span> MYMATH_H

<span class="type">double</span> <span class="fn">circle_area</span>(<span class="type">double</span> r);
<span class="type">double</span> <span class="fn">to_radians</span>(<span class="type">double</span> degrees);

<span class="pp">#endif</span></code></pre></div>

<p><code>mymath.c</code>（源文件）：</p>
<div class="code-block"><span class="code-lang">c</span><pre><code><span class="pp">#include</span> <span class="str">"mymath.h"</span>
<span class="pp">#define</span> _USE_MATH_DEFINES
<span class="pp">#include</span> <span class="str">&lt;math.h&gt;</span>

<span class="type">double</span> <span class="fn">circle_area</span>(<span class="type">double</span> r) {
    <span class="kw">return</span> M_PI * r * r;
}

<span class="type">double</span> <span class="fn">to_radians</span>(<span class="type">double</span> degrees) {
    <span class="kw">return</span> degrees * M_PI / <span class="num">180.0</span>;
}</code></pre></div>

<p><code>main.c</code>（主程序）：</p>
<div class="code-block"><span class="code-lang">c</span><pre><code><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span>
<span class="pp">#include</span> <span class="str">"mymath.h"</span>   <span class="cm">// 用双引号包含自定义头文件</span>

<span class="type">int</span> <span class="fn">main</span>() {
    <span class="fn">printf</span>(<span class="str">"半径为3的圆面积: %.2f\n"</span>, <span class="fn">circle_area</span>(<span class="num">3.0</span>));
    <span class="fn">printf</span>(<span class="str">"90度 = %.4f 弧度\n"</span>, <span class="fn">to_radians</span>(<span class="num">90.0</span>));
    <span class="kw">return</span> <span class="num">0</span>;
}</code></pre></div>

<p>编译多文件项目：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 分别编译每个.c文件为.o文件，然后链接</span>
<span class="kw">gcc</span> -c mymath.c -o mymath.o
<span class="kw">gcc</span> -c main.c -o main.o
<span class="kw">gcc</span> main.o mymath.o -o myprogram -lm
./myprogram</code></pre></div>
<div class="code-out">半径为3的圆面积: 28.27
90度 = 1.5708 弧度</div>

<p><code>-lm</code> 链接数学库（libm.so），因为用了 <code>math.h</code> 中的 M_PI。</p>

<div class="callout tip">
  <strong>为什么用 #ifndef 头文件保护？</strong>防止同一个头文件被多次包含导致重复定义错误。<code>#ifndef</code> 检查宏是否未定义，<code>#define</code> 定义它，<code>#endif</code> 结束。这是 C/C++ 头文件的标准写法。在 ROS 包中你会看到大量这种模式。
</div>

<h2>Makefile 简介</h2>
<p>当文件很多时，手动输入 gcc 命令很麻烦。<strong>Makefile</strong> 是一个自动化编译脚本，<code>make</code> 工具会读取它来决定哪些文件需要重新编译。这也是 ROS 的 CMakeLists.txt 的底层原理。</p>

<p>创建 <code>Makefile</code> 文件（注意：必须用 Tab 缩进，不能用空格）：</p>
<div class="code-block"><span class="code-lang">makefile</span><pre><code><span class="var">CC</span> = gcc
<span class="var">CFLAGS</span> = -Wall -g
<span class="var">LDFLAGS</span> = -lm

<span class="var">TARGET</span> = myprogram
<span class="var">OBJS</span> = main.o mymath.o

<span class="fn">all</span>: <span class="var">$(TARGET)</span>

<span class="fn">$(TARGET)</span>: <span class="var">$(OBJS)</span>
	<span class="var">$(CC)</span> <span class="var">$(OBJS)</span> -o <span class="var">$(TARGET)</span> <span class="var">$(LDFLAGS)</span>

<span class="fn">%.o</span>: %.c
	<span class="var">$(CC)</span> <span class="var">$(CFLAGS)</span> -c $&lt; -o $@

<span class="fn">clean</span>:
	rm -f <span class="var">$(OBJS)</span> <span class="var">$(TARGET)</span>

<span class="fn">.PHONY</span>: all clean</code></pre></div>

<p>然后只需执行：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">make</span>              <span class="cm"># 编译</span>
./myprogram       <span class="cm"># 运行</span>
<span class="kw">make</span> clean        <span class="cm"># 清理编译产物</span></code></pre></div>

<p>ROS 使用 CMake（比 Make 更高级的构建系统）生成 Makefile，然后再调用 make 进行编译。理解 Makefile 的基本原理有助于你理解 CMakeLists.txt 的作用。</p>

<h2>编译 ROS 节点所需的最小 C 知识总结</h2>
<p>作为 ROS C++ 开发者，你需要知道：</p>
<ol>
  <li><strong>编译流程</strong>：源代码 → 预处理 → 编译 → 汇编 → 链接 → 可执行文件。catkin_make 本质就是在自动化这个过程。</li>
  <li><strong>变量和类型</strong>：int、float、double、char，以及如何声明和使用它们。</li>
  <li><strong>指针</strong>：理解 <code>*</code> 和 <code>&amp;</code> 的含义，理解内存地址的概念，因为 C++ 大量使用引用和智能指针。</li>
  <li><strong>函数</strong>：声明、定义、参数传递（值传递 vs 指针/引用传递）。</li>
  <li><strong>结构体</strong>：自定义数据类型，成员访问（<code>.</code> 和 <code>-&gt;</code>），这是理解 ROS 消息类型的基础。</li>
  <li><strong>头文件分离</strong>：.h 和 .c/.cpp 的分工，#include 的作用，头文件保护。</li>
  <li><strong>Makefile/CMake</strong>：自动化编译的概念，知道编译命令和链接库是怎么组织的。</li>
</ol>

<h2>动手练习</h2>
<div class="steps">
  <div class="step">
    <h4>练习1：编译运行</h4>
    <p>将上面的 hello.c、结构体示例、多文件项目分别手动用 gcc 编译运行，确保没有报错。</p>
  </div>
  <div class="step">
    <h4>练习2：指针操作</h4>
    <p>写一个程序，定义一个 double 数组存5个机器人速度值，用指针遍历数组并打印每个元素的值和地址。</p>
  </div>
  <div class="step">
    <h4>练习3：多文件项目</h4>
    <p>创建一个 geometry_utils 模块，包含 point_distance 函数（计算两点距离），用头文件+源文件的方式组织，写 main.c 测试，并用 Makefile 编译。</p>
  </div>
</div>

<div class="callout tip">
  <strong>下一步：</strong>C++ 在 C 的基础上增加了面向对象（class、继承、多态）、STL 标准库（vector、string、map）、异常处理等特性。在 ROS 开发中，你主要用 C++ 的 class 来组织节点代码，用 std::vector 和 std::string 来管理数据，这些将在后续的 C++ for ROS 教程中详细讲解。
</div>
`
},

"python-for-ros-intro": {
  t: "Python for ROS：快速开发节点",
  cat: "code",
  lv: 0,
  pre: 0,
  time: "25分钟",
  desc: "用Python快速编写ROS节点",
  body: `
<h2>为什么用 Python 写 ROS 节点</h2>
<p>在 ROS 开发中，<strong>Python</strong>（通过 <strong>rospy</strong> 客户端库）是除了 C++ 之外最常用的语言。Python 语法简洁、开发速度快、无需编译，非常适合：</p>
<ul>
  <li>快速原型验证（写一个节点试试想法是否可行）</li>
  <li>配置和工具脚本（数据记录、批量处理、测试工具）</li>
  <li>AI/机器学习相关节点（深度学习推理、数据预处理）</li>
  <li>教学和入门学习（代码更短、更容易理解）</li>
</ul>
<p>ROS Noetic 默认使用 <strong>Python 3</strong>（准确说是 python3，Noetic 是第一个完全放弃 Python 2 的 ROS 版本）。</p>

<div class="callout goal">
  <strong>学习目标：</strong>掌握 Python 基础语法、rospy 入门、最小的 Publisher/Subscriber 节点编写、setup.py 配置、Python 节点的运行方式。学完后你能独立写出可以编译运行的 ROS Python 节点。
</div>

<h2>Python 基础速览</h2>
<p>假设你已经有一些编程经验，这里快速回顾 Python 的核心语法，重点放在与 ROS 开发相关的部分。</p>

<h3>变量与基本类型</h3>
<p>Python 是动态类型语言，不需要声明类型：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm"># 变量不需要声明类型</span>
count = <span class="num">10</span>                <span class="cm"># int</span>
pi = <span class="num">3.14159</span>             <span class="cm"># float</span>
name = <span class="str">"ROS"</span>              <span class="cm"># str</span>
is_active = <span class="kw">True</span>          <span class="cm"># bool（注意首字母大写）</span>

<span class="cm"># 打印</span>
<span class="fn">print</span>(<span class="str">f"count=</span>{count}<span class="str">, pi=</span>{pi:.2f}<span class="str">"</span>)  <span class="cm"># f-string格式化（推荐）</span></code></pre></div>

<h3>列表与字典</h3>
<p>Python 的 <strong>list</strong>（列表）和 <strong>dict</strong>（字典）是最常用的数据结构：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm"># 列表（类似C数组，但可以混合类型、动态大小）</span>
joints = [<span class="str">"shoulder"</span>, <span class="str">"elbow"</span>, <span class="str">"wrist"</span>]
<span class="fn">print</span>(joints[<span class="num">0</span>])           <span class="cm"># shoulder</span>
joints.<span class="fn">append</span>(<span class="str">"gripper"</span>)    <span class="cm"># 添加元素</span>

<span class="cm"># 字典（键值对，类似C++的map）</span>
robot = {
    <span class="str">"name"</span>: <span class="str">"turtlebot"</span>,
    <span class="str">"sensors"</span>: [<span class="str">"lidar"</span>, <span class="str">"camera"</span>],
    <span class="str">"max_speed"</span>: <span class="num">0.5</span>
}
<span class="fn">print</span>(robot[<span class="str">"name"</span>])       <span class="cm"># turtlebot</span>
robot[<span class="str">"battery"</span>] = <span class="num">0.85</span>    <span class="cm"># 添加/修改键值对</span></code></pre></div>

<h3>控制流</h3>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm"># if-elif-else（注意冒号和缩进！）</span>
<span class="kw">if</span> battery > <span class="num">0.5</span>:
    <span class="fn">print</span>(<span class="str">"电量充足"</span>)
<span class="kw">elif</span> battery > <span class="num">0.2</span>:
    <span class="fn">print</span>(<span class="str">"电量低"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"请充电"</span>)

<span class="cm"># for循环</span>
<span class="kw">for</span> joint <span class="kw">in</span> joints:
    <span class="fn">print</span>(<span class="str">f"关节: </span>{joint}<span class="str">"</span>)

<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>):      <span class="cm"># range(5)生成0,1,2,3,4</span>
    <span class="fn">print</span>(i)

<span class="cm"># while循环</span>
rate = rospy.Rate(<span class="num">10</span>)   <span class="cm"># 10Hz</span>
<span class="kw">while not</span> rospy.is_shutdown():
    <span class="cm"># 做周期性任务</span>
    rate.<span class="fn">sleep</span>()</code></pre></div>

<div class="callout warn">
  <strong>Python 的缩进是语法！</strong>C/C++ 用花括号 <code>{}</code> 表示代码块，Python 用<strong>缩进</strong>（通常是4个空格）。缩进错误会直接导致程序报错。使用好的编辑器（VS Code、PyCharm）可以自动处理缩进。
</div>

<h3>函数</h3>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="kw">def</span> <span class="fn">calculate_distance</span>(x1, y1, x2, y2):
    <span class="str">"""计算两点之间的欧几里得距离"""</span>
    dx = x2 - x1
    dy = y2 - y1
    <span class="kw">return</span> (dx**<span class="num">2</span> + dy**<span class="num">2</span>) ** <span class="num">0.5</span>

<span class="cm"># 调用</span>
d = <span class="fn">calculate_distance</span>(<span class="num">0</span>, <span class="num">0</span>, <span class="num">3</span>, <span class="num">4</span>)  <span class="cm"># 5.0</span></code></pre></div>

<h3>导入模块</h3>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="kw">import</span> math
<span class="fn">print</span>(math.pi)

<span class="kw">import</span> numpy <span class="kw">as</span> np              <span class="cm"># 给模块起别名（ROS中常见）</span>
arr = np.array([<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>])

<span class="kw">from</span> geometry_msgs.msg <span class="kw">import</span> Twist   <span class="cm"># 从包中导入特定类</span></code></pre></div>

<h2>Shebang 行：#!/usr/bin/env python3</h2>
<p>每个 ROS Python 节点脚本的第一行必须是 shebang 行，告诉操作系统用 python3 解释器来执行这个脚本：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python3</span>
<span class="cm"># -*- coding: utf-8 -*-</span>

<span class="kw">import</span> rospy
<span class="cm"># ... 其余代码</span></code></pre></div>

<p><code>#!/usr/bin/env python3</code> 的意思是：在当前环境的 PATH 中查找 python3 并用它执行。这比写死 <code>#!/usr/bin/python3</code> 更灵活。</p>

<div class="callout warn">
  <strong>别忘了可执行权限！</strong>Python 脚本必须有可执行权限才能被 rosrun 运行：
  <code>chmod +x your_script.py</code>
</div>

<h2>rospy 入门</h2>
<p><strong>rospy</strong> 是 ROS 的 Python 客户端库。它提供了编写 ROS 节点所需的所有 API：创建节点、发布/订阅话题、调用/提供服务、参数操作、日志输出等。</p>

<h3>核心 API 一览</h3>
<table>
  <tr><th>API</th><th>功能</th></tr>
  <tr><td><code>rospy.init_node('name')</code></td><td>初始化节点</td></tr>
  <tr><td><code>rospy.Publisher('topic', MsgType, queue_size)</code></td><td>创建发布器</td></tr>
  <tr><td><code>rospy.Subscriber('topic', MsgType, callback)</code></td><td>创建订阅器</td></tr>
  <tr><td><code>rospy.Rate(hz)</code></td><td>创建固定频率循环器</td></tr>
  <tr><td><code>rospy.is_shutdown()</code></td><td>检测节点是否应该退出</td></tr>
  <tr><td><code>rospy.loginfo/debug/warn/err</code></td><td>输出日志（替代print）</td></tr>
  <tr><td><code>rospy.get_param/set_param</code></td><td>获取/设置参数服务器参数</td></tr>
  <tr><td><code>rospy.Time.now()</code></td><td>获取当前ROS时间</td></tr>
</table>

<h2>最小 Publisher 节点</h2>
<p>让我们写一个最简单的发布器节点，让小海龟沿圆形轨迹运动。我们将发布 <code>geometry_msgs/Twist</code> 消息到 <code>/turtle1/cmd_vel</code> 话题。</p>

<p>首先创建一个 ROS 包（如果你还没有工作空间，先参考 catkin-workspace 教程创建）：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cd</span> ~/catkin_ws/src
catkin_create_pkg my_python_pkg rospy std_msgs geometry_msgs
<span class="kw">cd</span> my_python_pkg
<span class="kw">mkdir</span> scripts
<span class="kw">nano</span> scripts/circle_driver.py</code></pre></div>

<p><code>circle_driver.py</code>：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python3</span>
<span class="cm"># -*- coding: utf-8 -*-</span>

<span class="kw">import</span> rospy
<span class="kw">from</span> geometry_msgs.msg <span class="kw">import</span> Twist

<span class="kw">def</span> <span class="fn">circle_driver</span>():
    <span class="cm"># 初始化节点，节点名必须唯一</span>
    rospy.<span class="fn">init_node</span>(<span class="str">'circle_driver'</span>, anonymous=<span class="kw">True</span>)

    <span class="cm"># 创建发布器：话题名 /turtle1/cmd_vel，消息类型Twist，队列大小10</span>
    pub = rospy.<span class="fn">Publisher</span>(<span class="str">'/turtle1/cmd_vel'</span>, Twist, queue_size=<span class="num">10</span>)

    <span class="cm"># 设置循环频率为10Hz</span>
    rate = rospy.<span class="fn">Rate</span>(<span class="num">10</span>)

    rospy.<span class="fn">loginfo</span>(<span class="str">"Circle driver node started! Driving the turtle in circles."</span>)

    <span class="kw">while not</span> rospy.<span class="fn">is_shutdown</span>():
        <span class="cm"># 创建Twist消息并赋值</span>
        msg = <span class="fn">Twist</span>()
        msg.linear.x = <span class="num">2.0</span>      <span class="cm"># 前进速度 2.0 m/s</span>
        msg.angular.z = <span class="num">1.0</span>     <span class="cm"># 旋转速度 1.0 rad/s</span>

        <span class="cm"># 发布消息</span>
        pub.<span class="fn">publish</span>(msg)

        <span class="cm"># 按照设定频率休眠</span>
        rate.<span class="fn">sleep</span>()

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="kw">try</span>:
        <span class="fn">circle_driver</span>()
    <span class="kw">except</span> rospy.ROSInterruptException:
        <span class="kw">pass</span></code></pre></div>

<p>代码解析：</p>
<ul>
  <li><code>init_node('circle_driver', anonymous=True)</code>：初始化节点。<code>anonymous=True</code> 会在节点名后面追加随机数，避免重名冲突。</li>
  <li><code>Publisher('/turtle1/cmd_vel', Twist, queue_size=10)</code>：创建发布器。<code>queue_size=10</code> 表示缓冲区最多保存10条待发布消息。</li>
  <li><code>Twist()</code>：创建消息对象。Twist 消息有 <code>linear</code>（线速度）和 <code>angular</code>（角速度）两个 Vector3 字段，每个字段有 x/y/z 三个分量。</li>
  <li><code>rospy.is_shutdown()</code>：当节点收到关闭信号（Ctrl+C）时返回 True，循环退出。</li>
  <li><code>try/except ROSInterruptException</code>：捕获 Ctrl+C 时的异常，优雅退出。</li>
</ul>

<h2>最小 Subscriber 节点</h2>
<p>现在写一个订阅器，监听小海龟的位姿（<code>/turtle1/pose</code> 话题）并打印位置：</p>

<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python3</span>
<span class="cm"># -*- coding: utf-8 -*-</span>

<span class="kw">import</span> rospy
<span class="kw">from</span> turtlesim.msg <span class="kw">import</span> Pose

<span class="kw">def</span> <span class="fn">pose_callback</span>(pose_msg):
    <span class="cm"># 回调函数：每次收到消息时被调用</span>
    rospy.<span class="fn">loginfo</span>(
        <span class="str">f"Turtle pose -> x: </span>{pose_msg.x:.2f}<span class="str">, "</span>
        <span class="str">f"y: </span>{pose_msg.y:.2f}<span class="str">, "</span>
        <span class="str">f"theta: </span>{pose_msg.theta:.2f}<span class="str">"</span>
    )

<span class="kw">def</span> <span class="fn">pose_listener</span>():
    rospy.<span class="fn">init_node</span>(<span class="str">'pose_listener'</span>, anonymous=<span class="kw">True</span>)

    <span class="cm"># 创建订阅器：话题、消息类型、回调函数</span>
    rospy.<span class="fn">Subscriber</span>(<span class="str">'/turtle1/pose'</span>, Pose, pose_callback)

    rospy.<span class="fn">loginfo</span>(<span class="str">"Pose listener node started!"</span>)

    <span class="cm"># spin()保持节点运行，直到节点被关闭</span>
    rospy.<span class="fn">spin</span>()

<span class="kw">if</span> __name__ == <span class="str">'__main__'</span>:
    <span class="fn">pose_listener</span>()</code></pre></div>

<p>注意：订阅器不需要 while 循环，<code>rospy.spin()</code> 会让节点保持活跃状态，等待消息到来并自动调用回调函数。</p>

<h2>setup.py 配置</h2>
<p>与 C++ 节点不同，Python 节点不需要编译，但你需要告诉 catkin 你的 Python 脚本在哪里。有两种方式：</p>

<h3>方式一：使用 catkin_install_python（推荐，Noetic推荐方式）</h3>
<p>在 <code>CMakeLists.txt</code> 中取消注释并修改：</p>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="fn">catkin_install_python</span>(PROGRAMS
  scripts/circle_driver.py
  scripts/pose_listener.py
  DESTINATION ${<span class="var">CATKIN_PACKAGE_BIN_DESTINATION</span>}
)</code></pre></div>

<h3>方式二：使用 setup.py</h3>
<p>在包目录下创建 <code>setup.py</code>：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="cm">#!/usr/bin/env python3</span>

<span class="kw">from</span> distutils.core <span class="kw">import</span> setup
<span class="kw">from</span> catkin_pkg.python_setup <span class="kw">import</span> generate_distutils_setup

d = <span class="fn">generate_distutils_setup</span>(
    packages=[<span class="str">'my_python_pkg'</span>],
    package_dir={<span class="str">''</span>: <span class="str">'src'</span>},
)

<span class="fn">setup</span>(**d)</code></pre></div>

<p>同时需要创建 <code>src/my_python_pkg/</code> 目录并在其中放 <code>__init__.py</code> 文件，用于存放可导入的 Python 模块。scripts/ 目录下的脚本直接在 CMakeLists.txt 中安装即可。</p>

<p>无论哪种方式，package.xml 中需要包含：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="tag">&lt;buildtool_depend&gt;</span>catkin<span class="tag">&lt;/buildtool_depend&gt;</span>
<span class="tag">&lt;build_depend&gt;</span>rospy<span class="tag">&lt;/build_depend&gt;</span>
<span class="tag">&lt;exec_depend&gt;</span>rospy<span class="tag">&lt;/exec_depend&gt;</span></code></pre></div>

<h2>编译和运行 Python 节点</h2>

<h3>编译工作空间</h3>
<p>虽然 Python 不需要编译，但需要 catkin 来配置环境和安装脚本：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cd</span> ~/catkin_ws
catkin_make
<span class="cm"># 或者如果你使用catkin tools：</span>
<span class="cm"># catkin build</span>

<span class="cm"># source环境（每个新终端都要做，或者加到.bashrc）</span>
<span class="kw">source</span> devel/setup.bash</code></pre></div>

<h3>添加可执行权限</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">chmod</span> +x ~/catkin_ws/src/my_python_pkg/scripts/circle_driver.py
<span class="kw">chmod</span> +x ~/catkin_ws/src/my_python_pkg/scripts/pose_listener.py</code></pre></div>

<h3>运行节点</h3>
<p>打开三个终端：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 终端1：启动roscore</span>
roscore

<span class="cm"># 终端2：启动小海龟仿真</span>
rosrun turtlesim turtlesim_node

<span class="cm"># 终端3：运行你的圆形驱动节点</span>
rosrun my_python_pkg circle_driver.py

<span class="cm"># 终端4（可选）：运行位姿监听节点</span>
rosrun my_python_pkg pose_listener.py</code></pre></div>

<p>你应该看到小海龟做圆周运动，同时位姿监听器不断打印海龟的坐标。</p>

<h2>Python 节点开发的最佳实践</h2>

<h3>使用 rospy.loginfo 代替 print</h3>
<p>rospy 的日志函数比 print 更好，因为它们：</p>
<ul>
  <li>自动添加时间戳和节点名</li>
  <li>支持日志级别（debug/info/warn/err/fatal）</li>
  <li>可以通过 rqt_console 统一查看和过滤</li>
</ul>
<div class="code-block"><span class="code-lang">python</span><pre><code>rospy.<span class="fn">logdebug</span>(<span class="str">"调试信息，默认不显示"</span>)
rospy.<span class="fn">loginfo</span>(<span class="str">"普通信息"</span>)
rospy.<span class="fn">logwarn</span>(<span class="str">"警告信息，黄色显示"</span>)
rospy.<span class="fn">logerr</span>(<span class="str">"错误信息，红色显示"</span>)</code></pre></div>

<h3>避免在回调函数中执行耗时操作</h3>
<p>rospy 的回调是串行执行的，一个回调里做太多事情（如 sleep、大计算量操作）会阻塞其他消息的处理。耗时操作应该放到主循环或单独的线程中。</p>

<h3>正确关闭节点</h3>
<p>使用 <code>rospy.on_shutdown()</code> 注册清理函数，在节点关闭时执行收尾工作（如停止机器人、保存数据）：</p>
<div class="code-block"><span class="code-lang">python</span><pre><code><span class="kw">def</span> <span class="fn">shutdown_hook</span>():
    <span class="cm"># 发布零速度，让机器人停下</span>
    pub.<span class="fn">publish</span>(<span class="fn">Twist</span>())
    rospy.<span class="fn">loginfo</span>(<span class="str">"Node shutting down, stopped the robot."</span>)

rospy.<span class="fn">on_shutdown</span>(shutdown_hook)</code></pre></div>

<h2>动手练习</h2>
<div class="steps">
  <div class="step">
    <h4>练习1：方形轨迹</h4>
    <p>修改 circle_driver.py，让小海龟走正方形轨迹：前进2秒→左转90度→重复4次。提示：用 rospy.sleep(2) 控制时间。</p>
  </div>
  <div class="step">
    <h4>练习2：速度控制订阅器</h4>
    <p>写一个订阅器，订阅 /turtle1/cmd_vel 话题，统计收到的速度指令频率，并在屏幕上实时显示。</p>
  </div>
  <div class="step">
    <h4>练习3：参数配置</h4>
    <p>修改 circle_driver.py，从参数服务器读取线速度和角速度（rospy.get_param('~linear_speed', 2.0)），而不是硬编码。在 launch 文件中设置这些参数。</p>
  </div>
</div>

<div class="callout tip">
  <strong>Python vs C++ 怎么选？</strong>
  <ul>
    <li>需要快速验证想法、写工具脚本、做AI相关任务 → 用 Python</li>
    <li>性能要求高（高频控制、点云处理、SLAM）、需要部署到真实机器人 → 用 C++</li>
    <li>实际项目中经常混用：底层控制用 C++，上层决策和AI用 Python</li>
  </ul>
</div>
`
},

"catkin-workspace": {
  t: "Catkin 工作空间与 Package 管理",
  cat: "score",
  lv: 1,
  pre: 2,
  time: "25分钟",
  desc: "理解ROS的catkin编译系统和包管理机制",
  body: `
<h2>什么是 Catkin 工作空间</h2>
<p><strong>Catkin</strong> 是 ROS 的官方构建系统（Build System），基于 CMake 扩展而来。<strong>Catkin 工作空间（workspace）</strong>是你组织和编译 ROS 项目的文件夹。理解 catkin 工作空间的结构和工作原理，是组织 ROS 项目的基础。</p>
<p>简单来说：<strong>工作空间</strong>是一个包含多个 ROS <strong>功能包（package）</strong>的目录，catkin 负责编译这些包、解决它们之间的依赖关系、设置运行环境。</p>

<div class="callout goal">
  <strong>学习目标：</strong>理解工作空间的目录结构（src/build/devel/install），掌握创建工作空间的完整流程，理解 package.xml 和 CMakeLists.txt 的核心内容，学会创建自己的 ROS Package，区分 catkin_make 和 catkin build，掌握依赖管理和环境 source。
</div>

<h2>工作空间目录结构</h2>
<p>一个标准的 catkin 工作空间如下：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>~/catkin_ws/          <span class="cm"># 工作空间根目录</span>
├── src/             <span class="cm"># 源代码空间（Source Space）：放所有ROS包的源码</span>
│   ├── CMakeLists.txt  <span class="cm"># catkin自动生成的顶层CMake文件（不要手动修改）</span>
│   ├── package1/    <span class="cm"># 你的第一个ROS包</span>
│   ├── package2/    <span class="cm"># 你的第二个ROS包</span>
│   └── ...
├── build/           <span class="cm"># 编译空间（Build Space）：存放编译中间产物（CMake缓存、.o文件等）</span>
├── devel/           <span class="cm"># 开发空间（Development Space）：编译后生成的可执行文件、脚本、环境配置</span>
│   ├── setup.bash   <span class="cm"># 重要！source这个文件来使用工作空间中的包</span>
│   └── ...
└── install/         <span class="cm"># 安装空间（Install Space）：make install后生成（可选）</span></code></pre></div>

<div class="callout warn">
  <strong>哪些目录需要提交到 Git？</strong>只有 <code>src/</code> 目录需要版本控制！<code>build/</code>、<code>devel/</code>、<code>install/</code> 都是编译生成的，不应该提交。确保你的 .gitignore 中包含了这三个目录。
</div>

<h2>创建工作空间</h2>
<p>让我们从头创建一个名为 <code>catkin_ws</code> 的工作空间：</p>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 1. 创建src目录</span>
<span class="kw">mkdir</span> -p ~/catkin_ws/src

<span class="cm"># 2. 进入src目录，初始化工作空间</span>
<span class="kw">cd</span> ~/catkin_ws/src
catkin_init_workspace
<span class="cm"># 这会在src/下创建一个CMakeLists.txt符号链接</span>

<span class="cm"># 3. 回到工作空间根目录，首次编译（即使src为空也可以编译）</span>
<span class="kw">cd</span> ~/catkin_ws
catkin_make

<span class="cm"># 4. source环境配置文件（关键步骤！）</span>
<span class="kw">source</span> devel/setup.bash</code></pre></div>

<p>执行完之后，检查目录结构：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">ls</span> ~/catkin_ws
<span class="cm"># 应该能看到 build/ devel/ src/ 三个目录</span></code></pre></div>

<h3>将工作空间加入 .bashrc</h3>
<p>为了让每个新终端都能自动识别你的工作空间，把 source 命令加到 .bashrc：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">echo</span> <span class="str">"source ~/catkin_ws/devel/setup.bash"</span> >> ~/.bashrc
<span class="kw">source</span> ~/.bashrc</code></pre></div>

<div class="callout tip">
  <strong>source 的叠加效应：</strong>当你 source 了多个工作空间的 setup.bash，后 source 的会叠加在前一个之上。ROS 使用<strong>覆盖（overlay）</strong>机制：你自己的工作空间会覆盖系统安装的包（/opt/ros/noetic）。这意味着如果你修改了一个系统中已有的包，你的版本会优先生效。
</div>

<h2>catkin_make vs catkin build</h2>
<p>ROS 有两个常用的编译命令：</p>

<table>
  <tr><th>特性</th><th>catkin_make</th><th>catkin build（catkin_tools）</th></tr>
  <tr><td>安装方式</td><td>ROS默认自带</td><td>需要额外安装：<code>sudo apt install python3-catkin-tools</code></td></tr>
  <tr><td>编译方式</td><td>单次CMake调用，所有包一起编译</td><td>每个包独立CMake调用，支持隔离编译</td></tr>
  <tr><td>并行性</td><td>包之间可能有冲突</td><td>更好的依赖解析和并行编译</td></tr>
  <tr><td>出错处理</td><td>一个包出错全部停止</td><td>可以继续编译其他不相关的包</td></tr>
  <tr><td>命令</td><td><code>catkin_make</code></td><td><code>catkin build</code></td></tr>
  <tr><td>清理</td><td><code>catkin_make clean</code> 或手动删build</td><td><code>catkin clean</code>（交互式，更安全）</td></tr>
</table>

<div class="callout tip">
  <strong>推荐：</strong>初学者可以先使用 <code>catkin_make</code>（简单直接，教程资料多）。当项目变复杂（几十个包）时，切换到 <code>catkin build</code>。<strong>注意：不要在同一个工作空间中混用 catkin_make 和 catkin build！</strong>选择一个一直用。如果要切换，先删除 build、devel、logs 目录。
</div>

<h2>什么是 ROS Package</h2>
<p><strong>Package（功能包）</strong>是 ROS 中组织代码的最小单元。每个 ROS 包通常对应一个功能模块（如驱动程序、算法实现、可视化工具等）。一个 catkin 包必须包含两个文件：</p>
<ul>
  <li><strong>package.xml</strong>：包的元信息（名称、版本、作者、依赖等）</li>
  <li><strong>CMakeLists.txt</strong>：描述如何编译这个包（编译哪些文件、链接哪些库、生成哪些可执行文件）</li>
</ul>
<p>包目录下通常还有：</p>
<ul>
  <li><code>src/</code>：C++ 源代码（.cpp 文件）</li>
  <li><code>include/包名/</code>：C++ 头文件（.h 文件）</li>
  <li><code>scripts/</code>：Python 脚本（.py 文件）</li>
  <li><code>msg/</code>：自定义消息定义（.msg 文件）</li>
  <li><code>srv/</code>：自定义服务定义（.srv 文件）</li>
  <li><code>launch/</code>：ROS 启动文件（.launch 文件）</li>
  <li><code>config/</code>：配置文件（.yaml 文件）</li>
</ul>

<h2>创建 ROS Package</h2>
<p>使用 <code>catkin_create_pkg</code> 命令创建新包：</p>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cd</span> ~/catkin_ws/src

<span class="cm"># 格式：catkin_create_pkg &lt;包名&gt; [依赖1] [依赖2] ...</span>
catkin_create_pkg my_first_pkg roscpp rospy std_msgs geometry_msgs turtlesim</code></pre></div>

<p>这个命令会创建 <code>my_first_pkg/</code> 目录，并自动生成 package.xml 和 CMakeLists.txt（包含了指定的依赖）。</p>

<p>查看生成的目录：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cd</span> my_first_pkg
<span class="kw">ls</span> -la
<span class="cm"># CMakeLists.txt  include/  package.xml  src/</span></code></pre></div>

<h3>编译新包</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cd</span> ~/catkin_ws
catkin_make
<span class="cm"># 或者 catkin build my_first_pkg（只编译这个包及其依赖）</span>

<span class="cm"># 编译后source环境</span>
<span class="kw">source</span> devel/setup.bash

<span class="cm"># 验证包是否被ROS识别</span>
rospack find my_first_pkg
<span class="cm"># 应该输出: /home/you/catkin_ws/src/my_first_pkg</span></code></pre></div>

<h2>package.xml 详解</h2>
<p>package.xml 是包的"身份证"，它定义了包的名称、版本、描述、作者和<strong>依赖关系</strong>。</p>

<p>自动生成的 package.xml 大致如下（简化版）：</p>
<div class="code-block"><span class="code-lang">xml</span><pre><code><span class="cp">&lt;?xml version="1.0"?&gt;</span>
<span class="tag">&lt;package</span> format=<span class="str">"2"</span><span class="tag">&gt;</span>
  <span class="tag">&lt;name&gt;</span>my_first_pkg<span class="tag">&lt;/name&gt;</span>
  <span class="tag">&lt;version&gt;</span>0.0.0<span class="tag">&lt;/version&gt;</span>
  <span class="tag">&lt;description&gt;</span>The my_first_pkg package<span class="tag">&lt;/description&gt;</span>

  <span class="tag">&lt;maintainer</span> email=<span class="str">"you@example.com"</span><span class="tag">&gt;</span>Your Name<span class="tag">&lt;/maintainer&gt;</span>
  <span class="tag">&lt;license&gt;</span>MIT<span class="tag">&lt;/license&gt;</span>

  <span class="cm">&lt;!-- 构建工具依赖 --&gt;</span>
  <span class="tag">&lt;buildtool_depend&gt;</span>catkin<span class="tag">&lt;/buildtool_depend&gt;</span>

  <span class="cm">&lt;!-- 编译时依赖 --&gt;</span>
  <span class="tag">&lt;build_depend&gt;</span>roscpp<span class="tag">&lt;/build_depend&gt;</span>
  <span class="tag">&lt;build_depend&gt;</span>rospy<span class="tag">&lt;/build_depend&gt;</span>
  <span class="tag">&lt;build_depend&gt;</span>std_msgs<span class="tag">&lt;/build_depend&gt;</span>

  <span class="cm">&lt;!-- 运行时依赖 --&gt;</span>
  <span class="tag">&lt;exec_depend&gt;</span>roscpp<span class="tag">&lt;/exec_depend&gt;</span>
  <span class="tag">&lt;exec_depend&gt;</span>rospy<span class="tag">&lt;/exec_depend&gt;</span>
  <span class="tag">&lt;exec_depend&gt;</span>std_msgs<span class="tag">&lt;/exec_depend&gt;</span>
<span class="tag">&lt;/package&gt;</span></code></pre></div>

<h3>依赖类型说明</h3>
<table>
  <tr><th>依赖标签</th><th>含义</th></tr>
  <tr><td><code>&lt;build_depend&gt;</code></td><td>编译时需要的包（编译器需要它的头文件）</td></tr>
  <tr><td><code>&lt;exec_depend&gt;</code></td><td>运行时需要的包（节点运行时需要它的库或消息）</td></tr>
  <tr><td><code>&lt;build_export_depend&gt;</code></td><td>其他包编译依赖你的包时需要的依赖</td></tr>
  <tr><td><code>&lt;test_depend&gt;</code></td><td>测试时需要的包（如 rostest、gtest）</td></tr>
  <tr><td><code>&lt;depend&gt;</code></td><td>等价于同时写 build_depend、build_export_depend、exec_depend（最常用）</td></tr>
</table>

<div class="callout tip">
  <strong>简便写法：</strong>对于大多数依赖（如 roscpp、std_msgs），编译和运行时都需要，直接用 <code>&lt;depend&gt;</code> 标签即可，不用分别写 build_depend 和 exec_depend。
</div>

<h2>CMakeLists.txt 核心部分</h2>
<p>CMakeLists.txt 告诉 catkin 如何编译你的包。自动生成的文件有很多注释，以下是需要你关注的核心部分：</p>

<h3>1. 最低版本和项目名</h3>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="fn">cmake_minimum_required</span>(VERSION <span class="num">3.0.2</span>)
<span class="fn">project</span>(my_first_pkg)</code></pre></div>

<h3>2. 查找 catkin 和依赖包</h3>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="fn">find_package</span>(catkin REQUIRED COMPONENTS
  roscpp
  rospy
  std_msgs
  geometry_msgs
  turtlesim
)</code></pre></div>
<p>这行告诉 CMake 去查找 catkin 和你列出的 ROS 包。<code>REQUIRED</code> 表示如果找不到就报错。<code>COMPONENTS</code> 后面列出你的包所依赖的其他 catkin 包。</p>

<h3>3. catkin_package 宏</h3>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="fn">catkin_package</span>(
  CATKIN_DEPENDS roscpp rospy std_msgs geometry_msgs turtlesim
  <span class="cm"># INCLUDE_DIRS include</span>
  <span class="cm"># LIBRARIES my_first_pkg</span>
)</code></pre></div>
<p><code>catkin_package()</code> 是 catkin 提供的宏，用于生成包的配置信息，让其他包能找到你的包的头文件和库。<code>CATKIN_DEPENDS</code> 列出本包依赖的其他 catkin 包。</p>

<h3>4. 包含目录</h3>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="fn">include_directories</span>(
  <span class="com"># include  # 如果有自定义头文件，取消注释</span>
  ${<span class="var">catkin_INCLUDE_DIRS</span>}
)</code></pre></div>
<p><code>${catkin_INCLUDE_DIRS}</code> 包含了所有依赖包的头文件路径。</p>

<h3>5. 声明可执行文件（C++节点）</h3>
<p>如果你有 C++ 节点，需要声明如何编译：</p>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="cm"># 将src/my_node.cpp编译成名为my_node的可执行文件</span>
<span class="fn">add_executable</span>(my_node src/my_node.cpp)

<span class="cm"># 链接依赖库</span>
<span class="fn">target_link_libraries</span>(my_node
  ${<span class="var">catkin_LIBRARIES</span>}
)</code></pre></div>

<h3>6. Python 脚本安装</h3>
<p>Python 脚本不需要编译，但需要告诉 catkin 安装它们：</p>
<div class="code-block"><span class="code-lang">cmake</span><pre><code><span class="fn">catkin_install_python</span>(PROGRAMS
  scripts/my_python_node.py
  DESTINATION ${<span class="var">CATKIN_PACKAGE_BIN_DESTINATION</span>}
)</code></pre></div>

<h2>查找和安装依赖</h2>

<h3>用 rosdep 安装依赖</h3>
<p>当你从 GitHub clone 了一个别人的 ROS 包，它可能依赖一些你没安装的包。<code>rosdep</code> 可以自动安装所有依赖：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="kw">cd</span> ~/catkin_ws
rosdep install --from-paths src --ignore-src -r -y</code></pre></div>
<p>这条命令会检查 src/ 下所有包的 package.xml，自动安装缺失的依赖。</p>

<h3>常用依赖查找命令</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 查找某个包是否安装</span>
rospack find roscpp
<span class="cm"># 输出: /opt/ros/noetic/share/roscpp</span>

<span class="cm"># 列出包的直接依赖</span>
rospack depends1 my_first_pkg

<span class="cm"># 列出包的所有递归依赖</span>
rospack depends my_first_pkg

<span class="cm"># 搜索可用的ROS包（apt安装）</span>
apt search ros-noetic-导航
apt search ros-noetic-navigation</code></pre></div>

<h2>环境变量与工作空间验证</h2>

<h3>关键环境变量</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 查看ROS相关的所有环境变量</span>
<span class="kw">printenv</span> | grep ROS

<span class="cm"># ROS发行版</span>
<span class="kw">echo</span> $ROS_DISTRO       <span class="cm"># noetic</span>

<span class="cm"># ROS Master地址（节点通信的地址）</span>
<span class="kw">echo</span> $ROS_MASTER_URI   <span class="cm"># http://localhost:11311</span>

<span class="cm"># 包搜索路径（冒号分隔的多个路径）</span>
<span class="kw">echo</span> $ROS_PACKAGE_PATH
<span class="cm"># 应该包含你的工作空间: /home/you/catkin_ws/src:/opt/ros/noetic/share</span></code></pre></div>

<h3>常见问题</h3>
<table>
  <tr><th>问题</th><th>原因</th><th>解决</th></tr>
  <tr><td>Package not found</td><td>没有 source devel/setup.bash</td><td><code>source ~/catkin_ws/devel/setup.bash</code></td></tr>
  <tr><td>编译报错找不到头文件</td><td>CMakeLists.txt中find_package缺少依赖</td><td>在find_package中添加对应的包名</td></tr>
  <tr><td>rosrun Tab补全找不到自己的包</td><td>编译后没有source环境</td><td>source devel/setup.bash，或者执行 <code>rospack profile</code></td></tr>
  <tr><td>catkin_make 报错"Cannot find source code"</td><td>不在正确的目录执行</td><td>必须在工作空间根目录（catkin_ws/）执行catkin_make</td></tr>
</table>

<h2>动手练习</h2>
<div class="steps">
  <div class="step">
    <h4>练习1：创建工作空间和包</h4>
    <p>按照上面的步骤创建 catkin_ws 工作空间，创建一个名为 learning_pkg 的包，依赖 roscpp、rospy、std_msgs。编译成功后用 rospack find 验证。</p>
  </div>
  <div class="step">
    <h4>练习2：添加C++节点</h4>
    <p>在 learning_pkg 中创建 src/hello.cpp（一个简单的ROS节点，只打印 "Hello from C++ node!"），修改 CMakeLists.txt 添加 add_executable 和 target_link_libraries，编译后用 rosrun 运行。</p>
  </div>
  <div class="step">
    <h4>练习3：添加Python节点</h4>
    <p>在 learning_pkg 中创建 scripts/hello.py（打印 "Hello from Python node!"），添加可执行权限，在 CMakeLists.txt 中添加 catkin_install_python，编译并运行。</p>
  </div>
</div>

<div class="callout tip">
  <strong>小结：</strong>Catkin 工作空间是 ROS 开发的"工作台"。记住三个关键操作：(1) 新代码放在 src/ 下；(2) 在工作空间根目录执行 catkin_make 编译；(3) 编译后 source devel/setup.bash。package.xml 管依赖声明，CMakeLists.txt 管编译规则，这两个文件是每个包的核心。
</div>
`
},

"ros-architecture": {
  t: "ROS 计算图架构与 roscore",
  cat: "score",
  lv: 1,
  pre: 1,
  time: "20分钟",
  desc: "理解ROS的核心架构：节点、Master、参数服务器",
  body: `
<h2>ROS 的计算图概念</h2>
<p>ROS 不是一个单一的程序，而是一套让多个<strong>进程</strong>（称为节点）互相通信的<strong>中间件</strong>。理解 ROS 的核心架构，关键是理解<strong>计算图（Computation Graph）</strong>模型。</p>
<p>ROS 计算图由以下核心概念组成：</p>
<ul>
  <li><strong>节点（Node）</strong>：一个独立运行的进程，执行具体任务（如驱动传感器、执行导航算法、显示图像）。一个机器人系统通常有几十个甚至上百个节点。</li>
  <li><strong>节点管理器（Master）</strong>：所有节点的"名字服务器"，帮助节点互相找到对方。<code>roscore</code> 命令启动的就是 Master。</li>
  <li><strong>话题（Topic）</strong>：节点之间传递数据的"总线"。发布者（Publisher）往话题上发消息，订阅者（Subscriber）从话题上收消息。</li>
  <li><strong>服务（Service）</strong>：一对一的请求/响应式通信，适用于需要即时响应的场景（如"抓取这个物体"）。</li>
  <li><strong>参数服务器（Parameter Server）</strong>：一个共享的字典，节点可以从中读写配置参数。</li>
  <li><strong>消息（Message）</strong>：话题和服务上传递的数据结构，由 .msg 或 .srv 文件定义。</li>
</ul>

<div class="callout goal">
  <strong>学习目标：</strong>理解 roscore 的组成（Master + 参数服务器 + rosout），掌握 rosnode/rostopic/rosservice/rosparam 命令行工具的使用，学会用 rqt_graph 可视化计算图，理解 ROS 分布式通信的原理。
</div>

<h2>roscore 的组成</h2>
<p><strong>roscore</strong> 是你运行任何 ROS 程序时第一个要启动的东西。它实际上启动了三个核心组件：</p>

<ol>
  <li><strong>ROS Master（节点管理器）</strong>：负责节点的名称注册和查找。没有 Master，节点之间无法发现彼此，也就无法通信。默认监听端口 <code>11311</code>。</li>
  <li><strong>参数服务器（Parameter Server）</strong>：运行在 Master 内部的共享键值存储，用于存放配置参数。</li>
  <li><strong>rosout 节点</strong>：负责收集所有节点的日志输出，相当于系统的"日志聚合中心"。</li>
</ol>

<p>启动 roscore：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>roscore</code></pre></div>
<div class="code-out">...
SUMMARY
========

PARAMETERS
 * /rosdistro: noetic
 * /rosversion: 1.16.0

NODES

ROS_MASTER_URI=http://hostname:11311/

process[master]: started with pid [12345]
process[rosout-1]: started with pid [12346]
started core service [/rosout]</div>

<p>注意 SUMMARY 部分：PARAMETERS 列出了参数服务器上已有的参数（rosdistro 和 rosversion 是 roscore 自动设置的），NODES 列出了当前运行的节点（此时还没有用户节点）。</p>

<div class="callout warn">
  <strong>roscore 必须先启动：</strong>所有 ROS 节点都需要连接到 Master。如果你尝试在 roscore 没启动的情况下运行节点，会报错 "Unable to communicate with master!"。确保 roscore 一直运行（不要关闭那个终端）。
</div>

<h2>节点（Node）与节点管理器</h2>

<h3>节点的特性</h3>
<ul>
  <li>每个节点是一个独立的进程（可以用 C++、Python 等编写）。</li>
  <li>每个节点在运行时必须有<strong>唯一的名称</strong>（如果设置了 anonymous=True，ROS 会自动在名称后追加随机数保证唯一性）。</li>
  <li>节点启动时向 Master 注册自己的名称和发布/订阅的话题信息。</li>
  <li>节点之间通过话题和服务<strong>点对点</strong>直接通信（Master 只负责介绍，不转发数据）。</li>
</ul>

<h3>rosnode 命令行工具</h3>
<p><code>rosnode</code> 用于查看和管理运行中的节点。</p>

<p>先启动小海龟仿真，方便我们演示：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 终端1：启动roscore（如果还没启动）</span>
roscore

<span class="cm"># 终端2：启动小海龟仿真器</span>
rosrun turtlesim turtlesim_node

<span class="cm"># 终端3：启动键盘控制节点</span>
rosrun turtlesim turtle_teleop_key</code></pre></div>

<p>现在用 rosnode 命令探索：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 列出所有当前运行的节点</span>
rosnode list
<span class="cm"># 输出：</span>
<span class="cm"># /rosout</span>
<span class="cm"># /teleop_turtle</span>
<span class="cm"># /turtlesim</span>

<span class="cm"># 查看某个节点的详细信息</span>
rosnode info /turtlesim</code></pre></div>
<div class="code-out">--------------------------------------------------------------------------------
Node [/turtlesim]
Publications:
 * /rosout [rosgraph_msgs/Log]
 * /turtle1/color_sensor [turtlesim/Color]
 * /turtle1/pose [turtlesim/Pose]

Subscriptions:
 * /turtle1/cmd_vel [geometry_msgs/Twist]

Services:
 * /clear
 * /kill
 * /reset
 * /spawn
 * /turtle1/set_pen
 * /turtle1/teleport_absolute
 * /turtle1/teleport_relative
 * /turtlesim/get_loggers
 * /turtlesim/set_logger_level

contacting node http://hostname:xxxxx/ ...
Pid: 12346</div>

<p>从输出可以看到：<code>/turtlesim</code> 节点发布了 <code>/turtle1/pose</code> 话题、订阅了 <code>/turtle1/cmd_vel</code> 话题、提供了 <code>/spawn</code>、<code>/kill</code> 等服务。</p>

<h3>常用 rosnode 命令</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code>rosnode list                    <span class="cm"># 列出所有活跃节点</span>
rosnode info /node_name         <span class="cm"># 查看节点信息（发布、订阅、服务）</span>
rosnode ping /node_name         <span class="cm"># 测试与节点的连通性</span>
rosnode machine hostname        <span class="cm"># 列出某台机器上的节点</span>
rosnode kill /node_name         <span class="cm"># 杀死（停止）某个节点</span>
rosnode cleanup                 <span class="cm"># 清除失效节点的注册信息（节点异常退出时）</span></code></pre></div>

<h2>话题（Topic）通信</h2>
<p><strong>话题</strong>是 ROS 中最常用的异步通信机制，采用<strong>发布/订阅（Pub/Sub）</strong>模式。其核心特点：</p>
<ul>
  <li><strong>异步</strong>：发布者发消息后不需要等待响应，继续执行自己的任务。</li>
  <li><strong>多对多</strong>：一个话题可以有多个发布者和多个订阅者。</li>
  <li><strong>匿名</strong>：发布者不知道谁在订阅，订阅者不知道谁在发布，它们只通过话题名耦合。</li>
  <li><strong>持续流式</strong>：适合持续传输传感器数据、控制指令等。</li>
</ul>

<h3>rostopic 命令行工具</h3>
<p><code>rostopic</code> 是调试话题通信的瑞士军刀。</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 列出所有当前活跃的话题</span>
rostopic list
<span class="cm"># 输出：</span>
<span class="cm"># /rosout</span>
<span class="cm"># /rosout_agg</span>
<span class="cm"># /turtle1/cmd_vel</span>
<span class="cm"># /turtle1/color_sensor</span>
<span class="cm"># /turtle1/pose</span>

<span class="cm"># 查看某个话题的消息类型</span>
rostopic type /turtle1/cmd_vel
<span class="cm"># 输出: geometry_msgs/Twist</span>

<span class="cm"># 查看话题的发布/订阅信息</span>
rostopic info /turtle1/cmd_vel</code></pre></div>
<div class="code-out">Type: geometry_msgs/Twist

Publishers: None

Subscribers:
 * /turtlesim (http://hostname:xxxxx/)</div>

<h3>rostopic echo — 打印话题消息</h3>
<p>实时查看某个话题上发布的消息内容，调试时最常用：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 实时打印小海龟的位姿（你需要在另一个终端用键盘控制海龟移动）</span>
rostopic echo /turtle1/pose</code></pre></div>
<div class="code-out">x: 5.544444561004639
y: 5.544444561004639
theta: 0.0
linear_velocity: 0.0
angular_velocity: 0.0
---
x: 5.544444561004639
y: 5.544444561004639
theta: 0.0
...</div>

<h3>rostopic pub — 从命令行发布消息</h3>
<p>不写代码就能向话题发消息，极其方便测试：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 发布一次Twist消息，让海龟前进</span>
rostopic pub /turtle1/cmd_vel geometry_msgs/Twist <span class="str">"linear:
  x: 2.0
  y: 0.0
  z: 0.0
angular:
  x: 0.0
  y: 0.0
  z: 1.0"</span> -r <span class="num">10</span>

<span class="cm"># 参数说明：-r 10 表示以10Hz频率持续发布</span>
<span class="cm"># 按Ctrl+C停止发布</span></code></pre></div>

<h3>rostopic hz — 查看发布频率</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 统计/turtle1/pose话题的发布频率</span>
rostopic hz /turtle1/pose</code></pre></div>
<div class="code-out">average rate: 62.501
        min: 0.014s max: 0.017s std dev: 0.00069s window: 62</div>

<h2>服务（Service）通信</h2>
<p><strong>服务</strong>是 ROS 中的同步通信机制，采用<strong>请求/响应（Request/Response）</strong>模式，类似于函数调用：</p>
<ul>
  <li>一个服务有一个服务端（提供服务）和一个客户端（调用服务）。</li>
  <li>客户端发送请求（Request）后会阻塞等待，直到服务端返回响应（Response）。</li>
  <li>适合需要即时反馈的场景："执行一次抓取"、"生成一只新海龟"、"清空屏幕"。</li>
</ul>

<h3>rosservice 命令行工具</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 列出所有当前可用的服务</span>
rosservice list
<span class="cm"># 输出包含: /clear, /kill, /reset, /spawn, /turtle1/set_pen 等</span>

<span class="cm"># 查看服务类型</span>
rosservice type /spawn
<span class="cm"># 输出: turtlesim/Spawn</span>

<span class="cm"># 调用服务：在(3,3)位置生成一只名为'turtle2'的新海龟</span>
rosservice call /spawn <span class="str">"x: 3.0
y: 3.0
theta: 0.0
name: 'turtle2'"</span></code></pre></div>
<p>调用后你会看到仿真窗口中多出了一只新海龟！</p>

<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 清空画布</span>
rosservice call /clear <span class="str">"{}"</span>

<span class="cm"># 杀死（移除）turtle2</span>
rosservice call /kill <span class="str">"name: 'turtle2'"</span></code></pre></div>

<h3>话题 vs 服务：怎么选？</h3>
<table>
  <tr><th>特性</th><th>话题（Topic）</th><th>服务（Service）</th></tr>
  <tr><td>通信模式</td><td>发布/订阅（异步）</td><td>请求/响应（同步）</td></tr>
  <tr><td>连接关系</td><td>多对多</td><td>一对一</td></tr>
  <tr><td>数据流</td><td>持续流</td><td>一次性</td></tr>
  <tr><td>是否阻塞</td><td>否</td><td>是（等待响应）</td></tr>
  <tr><td>典型用途</td><td>传感器数据、速度指令</td><td>触发动作、查询状态</td></tr>
  <tr><td>例子</td><td>/scan（激光数据）、/cmd_vel（速度）</td><td>/spawn（生成海龟）、/set_pen（设置画笔）</td></tr>
</table>

<h2>参数服务器（Parameter Server）</h2>
<p><strong>参数服务器</strong>是一个共享的、可通过网络访问的多变量字典（键值存储），节点可以在运行时从中读取或写入参数。适合存放配置参数（如PID增益、机器人尺寸、话题名称等不频繁变化的数据）。</p>

<h3>rosparam 命令行工具</h3>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 列出所有参数</span>
rosparam list
<span class="cm"># 输出:</span>
<span class="cm"># /background_b</span>
<span class="cm"># /background_g</span>
<span class="cm"># /background_r</span>
<span class="cm"># /rosdistro</span>
<span class="cm"># /rosversion</span>
<span class="cm"># /run_id</span>

<span class="cm"># 获取参数值</span>
rosparam get /background_r
<span class="cm"># 输出: 69（小海龟背景色的R分量）</span>

<span class="cm"># 获取所有参数（YAML格式）</span>
rosparam get /

<span class="cm"># 设置参数值</span>
rosparam set /background_r <span class="num">255</span>
rosparam set /background_g <span class="num">0</span>
rosparam set /background_b <span class="num">0</span>

<span class="cm"># 修改背景色后需要调用/clear服务才能生效</span>
rosservice call /clear <span class="str">"{}"</span>
<span class="cm"># 背景变成了红色！</span>

<span class="cm"># 保存参数到文件</span>
rosparam dump params.yaml

<span class="cm"># 从文件加载参数</span>
rosparam load params.yaml

<span class="cm"># 删除参数</span>
rosparam delete /background_r</code></pre></div>

<div class="callout warn">
  <strong>参数服务器不适合什么？</strong>参数服务器设计上不适合存储高频变化的数据（如每帧激光扫描、每一时刻的位姿）。这类数据应该通过话题传输。参数适合存放启动时加载一次、运行中很少改变的配置。
</div>

<h2>rqt_graph：可视化计算图</h2>
<p>当系统中有很多节点时，文字输出难以看清节点之间的连接关系。<strong>rqt_graph</strong> 是 ROS 提供的图形化工具，可以实时绘制计算图：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code>rqt_graph</code></pre></div>
<p>你会看到一个窗口，节点用椭圆表示，话题用矩形表示，箭头表示数据流向。在小海龟例子中，你会看到：<code>/teleop_turtle</code> → <code>/turtle1/cmd_vel</code> → <code>/turtlesim</code>，表示键盘控制节点通过 cmd_vel 话题向仿真器节点发送速度指令。</p>

<p>rqt_graph 工具栏选项：</p>
<ul>
  <li><strong>Nodes only</strong>：只显示节点（隐藏话题）</li>
  <li><strong>Nodes/Topics (all)</strong>：显示所有节点和话题</li>
  <li><strong>Nodes/Topics (active)</strong>：只显示当前有数据流动的话题（最常用）</li>
</ul>

<div class="callout tip">
  <strong>调试技巧：</strong>当你的节点之间没有数据流动时，第一反应就是打开 rqt_graph 看看连接关系。常见问题包括：话题名拼写不一致（/cmd_vel vs /turtle1/cmd_vel）、消息类型不匹配、节点没有正确启动等，在图上一目了然。
</div>

<h2>理解分布式通信</h2>
<p>ROS 的一个强大特性是<strong>分布式计算</strong>：节点可以运行在不同的计算机上（比如你的笔记本和机器人上的工控机），通过网络透明地通信。</p>

<h3>ROS_MASTER_URI</h3>
<p>所有节点通过环境变量 <code>ROS_MASTER_URI</code> 知道 Master 的地址。默认是 <code>http://localhost:11311</code>（本机）。如果要连接另一台机器上的 Master：</p>
<div class="code-block"><span class="code-lang">bash</span><pre><code><span class="cm"># 在你的电脑上，指向机器人上的Master</span>
<span class="kw">export</span> ROS_MASTER_URI=http://robot-ip:11311

<span class="cm"># 同时需要设置ROS_IP为你自己电脑的IP（让其他节点能找到你）</span>
<span class="kw">export</span> ROS_IP=your-pc-ip</code></pre></div>

<h3>通信流程示例</h3>
<p>以"键盘控制小海龟"为例，完整的通信流程是：</p>
<div class="steps">
  <div class="step">
    <h4>1. Master启动</h4>
    <p>roscore 启动 Master，等待节点注册。</p>
  </div>
  <div class="step">
    <h4>2. turtlesim节点注册</h4>
    <p>turtlesim_node 启动，向 Master 注册：我要订阅 /turtle1/cmd_vel（Twist类型），我要发布 /turtle1/pose。Master 记录这些信息。</p>
  </div>
  <div class="step">
    <h4>3. teleop_turtle节点注册</h4>
    <p>turtle_teleop_key 启动，向 Master 注册：我要发布 /turtle1/cmd_vel（Twist类型）。Master 发现有两个节点在同一个话题上匹配，于是把 turtlesim 的地址告诉 teleop_turtle。</p>
  </div>
  <div class="step">
    <h4>4. 点对点连接建立</h4>
    <p>teleop_turtle 直接连接到 turtlesim 的 TCP 端口，开始传输速度消息。<strong>数据不经过 Master！</strong></p>
  </div>
  <div class="step">
    <h4>5. 持续通信</h4>
    <p>你按方向键时，teleop_turtle 发布 Twist 消息，turtlesim 收到后移动海龟，同时发布新的 Pose 消息。</p>
  </div>
</div>

<div class="callout tip">
  <strong>关键理解：Master 只是"介绍人"</strong>，它只在节点启动时帮助建立连接，实际的数据传输是节点之间直接进行的 TCP 连接。这也是为什么 Master 崩溃后，已建立连接的节点之间还能继续通信（但新节点无法加入）。
</div>

<h2>常用 ROS 命令行工具速查</h2>
<table>
  <tr><th>命令</th><th>功能</th></tr>
  <tr><td><code>roscore</code></td><td>启动Master + 参数服务器 + rosout</td></tr>
  <tr><td><code>rosrun &lt;pkg&gt; &lt;node&gt;</code></td><td>运行指定包中的节点</td></tr>
  <tr><td><code>roslaunch &lt;pkg&gt; &lt;file.launch&gt;</code></td><td>通过launch文件启动多个节点</td></tr>
  <tr><td><code>rosnode list/info/ping/kill</code></td><td>节点管理</td></tr>
  <tr><td><code>rostopic list/echo/pub/hz/type/info</code></td><td>话题调试</td></tr>
  <tr><td><code>rosservice list/call/type/args</code></td><td>服务调试</td></tr>
  <tr><td><code>rosparam list/get/set/load/dump</code></td><td>参数操作</td></tr>
  <tr><td><code>rospack find &lt;pkg&gt;</code></td><td>查找包的路径</td></tr>
  <tr><td><code>roscd &lt;pkg&gt;</code></td><td>跳转到包目录</td></tr>
  <tr><td><code>rosls &lt;pkg&gt;</code></td><td>列出包目录内容</td></tr>
  <tr><td><code>rqt_graph</code></td><td>可视化计算图</td></tr>
  <tr><td><code>rqt_console</code></td><td>图形化查看日志</td></tr>
  <tr><td><code>rviz</code></td><td>3D可视化工具</td></tr>
</table>

<h2>动手练习</h2>
<div class="steps">
  <div class="step">
    <h4>练习1：探索计算图</h4>
    <p>启动 roscore、turtlesim_node、turtle_teleop_key。依次使用 rosnode list、rostopic list、rosservice list、rosparam list 查看系统中有哪些节点、话题、服务和参数。用 rosnode info 查看每个节点的详细连接信息。</p>
  </div>
  <div class="step">
    <h4>练习2：命令行遥控海龟</h4>
    <p>不使用 turtle_teleop_key，完全通过 rostopic pub 命令手动控制海龟画一个正方形。再用 rosservice call /spawn 生成第二只海龟。</p>
  </div>
  <div class="step">
    <h4>练习3：修改背景色</h4>
    <p>用 rosparam set 修改 /background_r/g/b 三个参数，然后 rosservice call /clear 刷新，尝试调出你喜欢的颜色。用 rosparam dump 保存你的配置。</p>
  </div>
  <div class="step">
    <h4>练习4：rqt_graph观察</h4>
    <p>启动 rqt_graph，尝试启动和关闭不同节点，观察图中连接关系的变化。特别是注意当你生成 turtle2 后，话题和服务有哪些新增。</p>
  </div>
</div>

<div class="callout tip">
  <strong>小结：</strong>ROS 计算图是理解一切 ROS 操作的基础。记住三个核心：(1) roscore 是中枢，必须先启动；(2) 节点通过话题（异步多对多）和服务（同步一对一）通信；(3) Master 只做介绍，数据点对点传输。掌握这些命令行工具，你就能调试几乎所有 ROS 通信问题。
</div>
`
}

});