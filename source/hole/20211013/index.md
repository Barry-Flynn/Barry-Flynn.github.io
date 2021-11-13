---
title: 【并行计算】Linpack的安装与调试（一）：安装编译器和并行环境
date: 2021-10-13 17:09:32
updated:
top_img: https://i.loli.net/2021/11/01/FyGk2bgaUd9N561.jpg #加密锁
---

<!-- 
title: 【并行计算】Linpack的安装与调试（一）：安装编译器和并行环境
date: 2021-10-13 17:09:32
tags: 
    - Linpack 
    - Linux
    - MPICH
    - 高性能计算
    - 并行计算
categories: 【高性能并行计算】
description: 安装编译器（vim、gcc、g++、gfortran、make），安装并行环境（MPICH）
cover: false
top_img: 
 -->


踩了很多坑，
网上教程每个人写的都不一样，
装错又卸载，卸载又重装，
老师也不教，直接布置任务下来，
有经验的同学也不知道我报错是因为什么，
好几个同学都压力大退课了。
头疼又难受，想吐，
做梦都在Linux上装软件，
都快魔怔了，写篇总结文吧。
>本文全过程在Ubuntu系统下进行

---
# 编译器的安装
安装vim，gcc，g++，gfortran，make
是的，如果没有安装过，那就全安装一遍。


	sudo apt install vim
    您希望继续执行吗？ [Y/n] y

	sudo apt install gcc
    您希望继续执行吗？ [Y/n] y

	sudo apt install g++
    您希望继续执行吗？ [Y/n] y

	sudo apt install gfortran
    您希望继续执行吗？ [Y/n] y

	sudo apt install make

---
# 并行环境(mpich)的安装

- 常用的MPI并行环境有：MPICH、LAM-MPI、openmpi、Intel的MPI等。
- 如果CPU是Intel的产品，提议使用Intel的MPI。
- 这里使用MPICH。

**安装目标：**
将 `mpich` 安装到 `/usr/local/mpich` 文件夹

**下载mpich安装包：**
我以`mpich-3.4.2.tar.gz`版本为例
下载地址：www.mpich.org/downloads/
默认下载到家目录的“下载”目录中

**安装步骤：**

---
**进入源代码压缩包所在目录**

    ~$ cd 下载


## 解压安装包：tar命令

    ~/下载$ sudo tar -zxvf  mpich-3.4.2.tar.gz
>命令详解：
[tar命令 – 打包和备份的归档工具](https://www.linuxcool.com/tar)
参数`-z`：通过gzip指令压缩/解压缩文件，文件名最好为*.tar.gz
参数`-x`：从归档文件中提取文件
参数`-v`：显示操作过程
参数`-f`：指定备份文件

**进入解压文件夹**

	~/下载$ cd mpich-3.4.2

**显示目录内容**

    ~/下载/mpich-3.4.2$ ls
>命令详解：
[ls命令 – 显示指定工作目录下的内容及属性信息](https://www.linuxcool.com/ls)

```
aclocal.m4     configure     examples     mpich-doxygen.in   test
autogen.sh     configure.ac  maint        README             www
CHANGES        contrib       Makefile.am  README.envvar
confdb         CONTRIBUTING  Makefile.in  RELEASE_NOTES
config.log     COPYRIGHT     man          src
config.system  doc           modules      subsys_include.m4
```

---
## 配置：configure命令

	~/下载/mpich-3.4.2$ sudo ./configure --prefix=/usr/local/mpich
>命令详解：
`configure`：是一个shell脚本，它在源文件的根目录中。他的作用是检查你的系统中是否有编译这个程序依赖的其它库之类的东西。
`prefix 参数`：指定目标安装路径，必须指定，否则不知道默认安装到哪里，不方便以后的管理（类似windows的安装路径）。prefix后的路径随意； 另外“ ./configure ”中“ ./ ”——表示当前目录，这个是相对路径。

- 若未进行第一步的“编译器的安装”，可能会出现以下报错，
（如遇到请先安装第一步的编译器，再执行./configure命令）
```
barryflynn@barryflynn:/usr/mpich/mpich-3.4.2$ sudo ./configure --prefix=/usr/mpich
[sudo] barryflynn 的密码： 
Configuring MPICH version 3.4.2 with  '--prefix=/usr/mpich'
Running on system: Linux barryflynn 5.11.0-34-generic #36~20.04.1-Ubuntu SMP Fri Aug 27 08:06:32 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
checking build system type... x86_64-unknown-linux-gnu
checking host system type... x86_64-unknown-linux-gnu
checking target system type... x86_64-unknown-linux-gnu
checking for gcc... no
checking for cc... no
checking for cl.exe... no
configure: error: in `/usr/mpich/mpich-3.4.2':
configure: error: no acceptable C compiler found in $PATH
See `config.log' for more details

------------------翻译----------------------

使用“--prefix=/usr/MPICH”配置MPICH版本3.4.2
在系统上运行：Linux barryflynn 5.11.0-34-generic#36~20.04.1-Ubuntu SMP Fri Aug 27 08:06:32 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
正在检查生成系统类型。。。x86_64-unknown-linux-gnu
正在检查主机系统类型。。。x86_64-unknown-linux-gnu
正在检查目标系统类型。。。x86_64-unknown-linux-gnu
正在检查gcc。。。不
正在检查抄送。。。不
正在检查cl.exe。。。不
配置：错误：在“/usr/mpich/mpich-3.4.2”中：
配置：错误：在$PATH中找不到可接受的C编译器
有关详细信息，请参阅“config.log” 
```

- 如果进最后进程代码报错是这样的：
（展开后直接看最后那部分跟你的是否一样）
```
Configuring MPICH version 3.4.2 with  '--prefix=/usr/local/mpich'
Running on system: Linux barryflynn 5.11.0-34-generic #36~20.04.1-Ubuntu SMP Fri Aug 27 08:06:32 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
checking build system type... x86_64-unknown-linux-gnu
checking host system type... x86_64-unknown-linux-gnu
checking target system type... x86_64-unknown-linux-gnu
checking for gcc... gcc
checking whether the C compiler works... yes
checking for C compiler default output file name... a.out
checking for suffix of executables... 
checking whether we are cross compiling... no
checking for suffix of object files... o
checking whether we are using the GNU C compiler... yes
checking whether gcc accepts -g... yes
checking for gcc option to accept ISO C89... none needed
checking whether gcc understands -c and -o together... yes
checking for gcc option to accept ISO C99... none needed
checking how to run the C preprocessor... gcc -E
checking for grep that handles long lines and -e... /usr/bin/grep
checking for egrep... /usr/bin/grep -E
checking for ANSI C header files... yes
checking for sys/types.h... yes
checking for sys/stat.h... yes
checking for stdlib.h... yes
checking for string.h... yes
checking for memory.h... yes
checking for strings.h... yes
checking for inttypes.h... yes
checking for stdint.h... yes
checking for unistd.h... yes
checking minix/config.h usability... no
checking minix/config.h presence... no
checking for minix/config.h... no
checking whether it is safe to define __EXTENSIONS__... yes
checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for a thread-safe mkdir -p... /usr/bin/mkdir -p
checking for gawk... no
checking for mawk... mawk
checking whether make sets $(MAKE)... yes
checking for style of include used by make... GNU
checking whether make supports nested variables... yes
checking dependency style of gcc... gcc3
checking whether to enable maintainer-specific portions of Makefiles... yes
checking for ar... ar
checking the archiver (ar) interface... ar
checking how to print strings... printf
checking for a sed that does not truncate output... /usr/bin/sed
checking for fgrep... /usr/bin/grep -F
checking for ld used by gcc... /usr/bin/ld
checking if the linker (/usr/bin/ld) is GNU ld... yes
checking for BSD- or MS-compatible name lister (nm)... /usr/bin/nm -B
checking the name lister (/usr/bin/nm -B) interface... BSD nm
checking whether ln -s works... yes
checking the maximum length of command line arguments... 1572864
checking how to convert x86_64-unknown-linux-gnu file names to x86_64-unknown-linux-gnu format... func_convert_file_noop
checking how to convert x86_64-unknown-linux-gnu file names to toolchain format... func_convert_file_noop
checking for /usr/bin/ld option to reload object files... -r
checking for objdump... objdump
checking how to recognize dependent libraries... pass_all
checking for dlltool... no
checking how to associate runtime and link libraries... printf %s\n
checking for archiver @FILE support... @
checking for strip... strip
checking for ranlib... ranlib
checking command to parse /usr/bin/nm -B output from gcc object... ok
checking for sysroot... no
checking for a working dd... /usr/bin/dd
checking how to truncate binary pipes... /usr/bin/dd bs=4096 count=1
checking for mt... mt
checking if mt is a manifest tool... no
checking for dlfcn.h... yes
checking for objdir... .libs
checking if gcc supports -fno-rtti -fno-exceptions... no
checking for gcc option to produce PIC... -fPIC -DPIC
checking if gcc PIC flag -fPIC -DPIC works... yes
checking if gcc static flag -static works... yes
checking if gcc supports -c -o file.o... yes
checking if gcc supports -c -o file.o... (cached) yes
checking whether the gcc linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking whether -lc should be explicitly linked in... no
checking dynamic linker characteristics... GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
checking whether stripping libraries is possible... yes
checking if libtool supports shared libraries... yes
checking whether to build shared libraries... yes
checking whether to build static libraries... yes
checking whether make supports nested variables... (cached) yes
checking for g++... g++
checking whether we are using the GNU C++ compiler... yes
checking whether g++ accepts -g... yes
checking dependency style of g++... gcc3
checking how to run the C++ preprocessor... g++ -E
checking for ld used by g++... /usr/bin/ld -m elf_x86_64
checking if the linker (/usr/bin/ld -m elf_x86_64) is GNU ld... yes
checking whether the g++ linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking for g++ option to produce PIC... -fPIC -DPIC
checking if g++ PIC flag -fPIC -DPIC works... yes
checking if g++ static flag -static works... yes
checking if g++ supports -c -o file.o... yes
checking if g++ supports -c -o file.o... (cached) yes
checking whether the g++ linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking dynamic linker characteristics... (cached) GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
checking for gfortran... gfortran
checking whether we are using the GNU Fortran compiler... yes
checking whether gfortran accepts -g... yes
checking if libtool supports shared libraries... yes
checking whether to build shared libraries... yes
checking whether to build static libraries... yes
checking for gfortran option to produce PIC... -fPIC
checking if gfortran PIC flag -fPIC works... yes
checking if gfortran static flag -static works... yes
checking if gfortran supports -c -o file.o... yes
checking if gfortran supports -c -o file.o... (cached) yes
checking whether the gfortran linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking dynamic linker characteristics... (cached) GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
checking whether we are using the GNU Fortran 77 compiler... yes
checking whether gfortran accepts -g... yes
checking if libtool supports shared libraries... yes
checking whether to build shared libraries... yes
checking whether to build static libraries... yes
checking for gfortran option to produce PIC... -fPIC
checking if gfortran PIC flag -fPIC works... yes
checking if gfortran static flag -static works... yes
checking if gfortran supports -c -o file.o... yes
checking if gfortran supports -c -o file.o... (cached) yes
checking whether the gfortran linker (/usr/bin/ld -m elf_x86_64) supports shared libraries... yes
checking dynamic linker characteristics... (cached) GNU/Linux ld.so
checking how to hardcode library paths into programs... immediate
configure: RUNNING PREREQ FOR CH4 DEVICE
checking rdma/fabric.h usability... no
checking rdma/fabric.h presence... no
checking for rdma/fabric.h... no
checking for fi_getinfo in -lfabric... no
checking ucp/api/ucp.h usability... no
checking ucp/api/ucp.h presence... no
checking for ucp/api/ucp.h... no
checking for ucp_config_read in -lucp... no
configure: error: no ch4 netmod selected

  The default ch4 device could not detect a preferred network
  library. Supported options are ofi (libfabric) and ucx:

    --with-device=ch4:ofi or --with-device=ch4:ucx

  Configure will use an embedded copy of libfabric or ucx if one is
  not found in the user environment. An installation can be specified
  by adding

    --with-libfabric=<path/to/install> or --with-ucx=<path/to/install>

  to the configuration.

  The previous MPICH default device (ch3) is also available and
  supported with option:

    --with-device=ch3
    
barryflynn@barryflynn:~/下载/mpich-3.4.2$ 
```
那你ls一下，肯定没有名为Makefile的文件，说明没有configure成功，

        ~/下载/mpich-3.4.2$ ls
```
aclocal.m4  config.system  COPYRIGHT    Makefile.in       README.envvar      www
autogen.sh  configure      doc          man               RELEASE_NOTES
CHANGES     configure.ac   examples     modules           src
confdb      contrib        maint        mpich-doxygen.in  subsys_include.m4
config.log  CONTRIBUTING   Makefile.am  README            test
```
那么按照上边报错代码的结尾，加上`--with-device=ch4:ofi`

        ~/下载/mpich-3.4.2$ sudo ./configure --prefix=/usr/local/mpich --with-device=ch4:ofi
然后飘过大坨大坨代码.....
```
config.status: creating Makefile
config.status: creating include/Makefile
config.status: creating src/Makefile
config.status: creating dtpoolsconf.h
config.status: executing depfiles commands
config.status: executing libtool commands
***
*** device: ch4
*** netmods: ofi
*** shm: auto
***
Configuration completed.
```
最后看到`Configuration completed.`代表配置完成。
现在查看一下目录：

        ~/下载/mpich-3.4.2$ ls
```
aclocal.m4  config.status  COPYRIGHT  Makefile       mpich-doxygen.in   test
autogen.sh  config.system  doc        Makefile.am    README             www
CHANGES     configure      examples   Makefile.in    README.envvar
confdb      configure.ac   lib        man            RELEASE_NOTES
config.log  contrib        libtool    modules        src
config.lt   CONTRIBUTING   maint      mpich-doxygen  subsys_include.m4
```
可以看到现在有Makefile 了，配置成功。


---
## 编译：make命令
    ~/下载/mpich-3.4.2$ sudo make
时间可能会很长，慢慢等待。

---
## 安装：make install命令
    ~/下载/mpich-3.4.2$ sudo make install

---
## 设置环境变量：export PATH
安装好了之后，还需要告诉系统mpi库的路径地址，这样当你调用mpi的命令时，系统才知道你在干什么。在用户的根目录（即：家目录 `~` ）下，有一个`.bashrc`的文本文件（默认使用的是bash，如果是zsh等自行查阅资料）。这个文件可以理解为，每次打开终端时都会加载的启动项。

    vim ~/.bashrc

通过之前安装的vim编译器打开当前用户下所对应的.bashrc文件，
按a进入插入模式，
在其中加入一行（建议用方向键滑到最下，添加到最下面一行）:

    export PATH="/usr/local/mpich/bin:$PATH" 

添加完后Esc退出插入模式，最后一行输入 `：wq` 保存退出。

保存退出之后 ，使用source这一命令执行一下就把新加的命令执行了。

    source ~/.bashrc

---
之后，用which来检验下配置的环境变量是否正确。
    
    which mpicc
若返回了类似下面这样的路径，就行了

    /usr/local/mpich/bin/mpicc
再执行命令：

    which mpif90
若返回了类似下面这样的路径，就行了

    /usr/local/mpich/bin/mpif90
如果执行`which mpicc`和`which mpif90`后没有返回路径，说明环境变量路径配置错误，请重新`vim ~/.bashrc`回去检查修改

---
进入当初安装包解压后的文件夹的`examples`目录下，去测试一下hello是否能顺利运行。

    cd ~/下载/mpich-3.4.2/examples
先编译一下

    mpicc -o hellow hellow.c

再运行试试：

    mpirun -np 4 ./hellow

若出现如下代码：
```
Hello world from process 1 of 4
Hello world from process 0 of 4
Hello world from process 2 of 4
Hello world from process 3 of 4
```
代表并行环境MPICH安装成功。

>如果细心可能注意到，我全程没有进入超级管理员模式，只是在必要时在命令前添加`sudo`命令（[以系统管理者的身份执行指令](https://www.linuxcool.com/sudo)），所以命令行之前都是`$`符号，而不是超级管理员下的`#`符号。

<br /><br /><br /><br /><br />
**THE END.**
**本文完~**

---
# 专业名词积累

- `OS`：操作系统（Operating System）。
- `MKL`：英特尔数学核心函数库（Intel Math Kernel Library）。
- `MPI`：消息传递接口（Moldflow Plastic Insight），是为并行任务开发的一个标准接口库，是一个提供深入制件和模具设计分析的软件包,它提供强大的分析功能、可视化功能和项目管理工具。这些工具使客户可以进行深入的分析和优化。MPI使用户可以对制件的几何形状、材料的选择、模具设计及加工参数设置进行优化以获得高质量的产品。MPI是一个库，而不是一门语言。它是一种标准或规范的代表，而不特指某一个对它的具体实现。
- `MPICH`：消息传递接口（Message Passing Interface）。MPICH是一种最重要的MPI实现，MPICH是一个与MPI-1规范同步发展的版本，每当MPI推出新的版本，就会有相应的MPICH的实现版本。MPICH含三层结构，最上层是MPI的API，基本是点到点通信，和在点到点通信基础上构造的集群通信（Collective Communication）；中间层是ADI层（Abstract Device Interface），其中device可以简单地理解为某一种底层通信库，ADI就是对各种不同的底层通信库的不同接口的统一标准；底层是具体的底层通 信库，例如工作站机群上的p4通信库、曙光1000上的NX库、曙光3000上的BCL通信库等。
- `Linpack`：线性系统软件包（Linear system package）。至目前为止， LINPACK 还是广泛地应用于解各种数学和工程问题。 也由于它高效率的运算， 使得其它几种数学软件例如IMSL、 MATLAB 纷纷加以引用来处理矩阵问题， 所以足见其在科学计算上有举足轻重的地位。Linpack现在在国际上已经成为最流行的用于测试高性能计算机系统浮点性能的benchmark。通过利用高性能计算机，用**高斯消元法**求解N元一次稠密线性代数方程组的测试，评价高性能计算机的浮点性能。
- `HPL`：用于分布式内存计算机的高性能Linpack基准测试（High-performance Linpack Benchmark for Distributed-memory Computers），是针对现代并行计算机提出的测试方式。用户在不修改任意测试程序的基础上，可以调节问题规模大小N(矩阵大小)、使用到的CPU数目、使用各种优化方法等来执行该测试程序，以获取最佳的性能。HPL采用高斯消元法求解线性方程组。当求解问题规模为N时，浮点运算次数为(2/3 * N^3－2*N^2)。因此，只要给出问题规模N，测得系统计算时间T，峰值=计算量(2/3 * N^3－2*N^2)/计算时间T，测试结果以浮点运算每秒（Flops）给出，衡量计算机性能的一个重要指标就是计算峰值或者浮点计算峰值。HPL测试结果是TOP500排名的重要依据。在比赛中，参赛队正确安装和编译HPL包之后，通过一定的配置修改，开始运行HPL，HPL的运行方式和MPI密切相关，不同的MPI在运行方面有一定的差别。运行结束输出结果后，参赛队需要针对实际测试结果进行分析，不断修改配置，优化测试，以取得满意的结果。
- `HPCG`：高性能共轭梯度 （High Performance Conjugate Gradient）。随着高性能应用的不断发展，其性能与HPL所测的结果（主要是系统利用率）相差较大，这主要是由于HPL包含大量稠密矩阵计算，具有良好的数据局部性，容易开发并行性和局部性，但并不能代表其他大量实际应用中常见的不易扩展和开发局部性的稀疏计算和访存模式。HPCG是求解稀疏矩阵方程组的一种迭代算法，使用局部对称Gauss—Seidel预条件子的预处理共轭梯度法，主要数据为对称正定稀疏矩阵，每一个计算循环需要调用稀疏矩阵向量乘、预条件子、向量更新和向量内积操作。覆盖了常用的计算和通信模式。HPCG类似HPL，允许使用多种优化方法调优，例如新的稀疏矩阵格式等。


---
# 参考内容

**主要：**
- [两小时入门MPI与并行计算（二）：MPI的安装与配置](https://zhuanlan.zhihu.com/p/356705583)-知乎 
- [MPI部署踩坑实况！！！最终成功跑通梯形面积法！！！精准全流程命令+各步骤报错解决方案！！！](https://blog.csdn.net/weixin_42711189/article/details/116245574)-CSDN 
- [mpich安装教程-魏大王敲代码](https://www.cnblogs.com/weidawang/p/10069583.html)-博客园
- Linpack的安装、调试与优化-曙光认证服务器工程师DCSA(Dawning Certified Server Associate)培训课程PDF课件
- [Linux 中如何卸载已安装的软件(转载)](http://www.blogjava.net/zhyiwww/archive/2006/06/19/53786.html)

**其他：**
- 《超算竞赛导引》电子版（PDF第145页）
- [HPL环境安装、配置及初步优化方案（报告）](https://blog.csdn.net/sishuiliunian0710/article/details/20493101)-CSDN博客
- [HPL与HPCG测试（一）](https://blog.csdn.net/hanzhenbushihu/article/details/88416724)-CSDN博客
- [Linpack之HPL测试](https://www.bbsmax.com/A/kvJ3qy29dg/)-bbsmax.com
- [Linpack之HPCG测试](https://www.bbsmax.com/A/A7zgkxXlz4/)-bbsmax.com
- [linpack百度百科](https://baike.baidu.com/item/linpack/8831771?fr=aladdin)
- [基准测试程序-百度百科](https://baike.baidu.com/item/%E5%9F%BA%E5%87%86%E6%B5%8B%E8%AF%95%E7%A8%8B%E5%BA%8F/22398676?fr=aladdin)
- [HPL测试程序安装](https://blog.csdn.net/linfengfeiye/article/details/5708444)-CSDN博客
- [Linpack（HPL）傻瓜式安装全过程一【MPICH的安装】](http://www.51testing.com/html/92/422092-241401.html)
- [MPICH 消息传递接口](https://www.oschina.net/p/mpich?hmsr=aladdin1e1)-OSCHINA/开源软件
