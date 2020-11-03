---
layout: post
title:  "又要统计？试着更进一步吧"
author: Xu Chi
toc: true
tags: [Tech, Python]
---

半自动化一部分统计工作之后还是想继续偷点懒，尝试着用轮子让速度更快一些。

# 1. 半年一度开学季还在持续

是的，上周统计过了注册、返校情况，但这周又有毕业去向要统计。人生大起大落就是这么刺激。

仅仅相隔三天，又要重复同一遍流程，这让我不禁扪心自问：是因为我长胖了么，需要让我这样锻炼来燃脂么？

作为一个懒人，面对重复频率这么高的项目，我拆开一包辣条，仔细地思考了下是否可以进行进一步自动优化。

幸好看上去可以做，那就动起来。

# 2. 前次流程改进存在的缺陷及流程分析（如何更加偷懒）

## 2.1 前次实施中遇到的问题

在上一次尝试将大家发过来的excel表自动汇总成一个表的时候，发现了不少问题。之前的统计步骤中提到“写一个良好的excel模板，规规矩矩地写好例子以供大家照写不误，谁都喜欢无脑匹配不是么。”
但实际上每个人对于同一件事情的理解差别远比最初简单想象的可能性更多。


文件名： 1234张三.xls

| 序号 | 学号 | 姓名 | 性别 | 是否返校 |    未返校原因    | 返校日期 |
|:---:|:----:|:---:|:---:|:-------:|:--------------:|:-------:|
| 示例 | 1234 | 小A |  男  |   是    |（如未返校请填写） | 20180221|
|请在本行填写|

在之前的统计中，采用了上述模板，利用示例的形式以期望的结果如下，然后汇总时取每份文件第四行的内容汇总成一份表即可。

| 序号 | 学号 | 姓名 | 性别 | 是否返校 |    未返校原因    | 返校日期 |
|:---:|:----:|:---:|:---:|:-------:|:--------------:|:-------:|
| 示例 | 1234 | 小A |  男  |   是    |（如未返校请填写） | 20180221|
|请在本行填写|5678|小B| 男  |  是     |               | 20180226|

但实施结果并不完全符合预期，遇到了一些问题，主要两个问题如下：

* 【目标行偏差】尽管在“请在本行填写”列采用了高亮来暗示本行为填写域，还是会有同学认为应当覆盖示例行的内容，导致第四行为空行：

| 序号 | 学号 | 姓名 | 性别 | 是否返校 |    未返校原因    | 返校日期 |
|:---:|:----:|:---:|:---:|:-------:|:--------------:|:-------:|
| 示例 | 5678 | 小B | 男   |  是     |                | 20180226|
|请在本行填写|


* 【文件名未改】有的返回结果中，文件内容完全正确，但文件名仍然保留了“1234张三.xls”

于是我拆开一包薯片仔细地分析了上述问题出现的原因：

* 【目标行偏差】最初设计时，已经考虑了会出现预期结果行与实际情况不一致的情况，但认为在添加了行头的“示例”及“请在本行填写”及高亮后，大家都会统一填写到我们期待的域中。但由于这一行除了行头的“请在本行填写”外均为空格，很容易被忽略，进而去覆盖“示例”行的数据。
* 【文件名未改】这个问题的主要原因在于，实际情况中很多同学遇到在微信中收到一份excel表需要填写这一情况时，最方便的方式是在手机app中打开表，填写完后发还到微信中，而改文件名这个在PC端很方便的操作在手机端会很麻烦，最终尽管意识到可能需要把文件名按照“学号+姓名.xls”规则修改，仍选择跳过这一步骤，直接发还。

最主要的原因还是在于，在大家看来，无论发还给什么文件，何种格式，甚至直接回复微信而不在excel中填写，最后汇总的都是“汇总者”这个具体的人，而非机器。而错行问题、文件名问题、格式问题等，对于人的操作来讲几乎不构成任何的额外开销。

那既然我们想自动化地解决汇总统计这个问题，就必须发挥机器的优势，让机器多干活，让大家少填写，写的单元格越少，误解的可能性越小，自然最终交上来的结果与预期更接近。

## 2.2 流程分析

正如前文中提到过，我们要收集大家的信息，好比把大象塞进冰箱，一共分三步。之前仅仅改进了最后汇总的一步，现在则要改进前两步。

第一步. 【设计模板】仍然是写一个良好的excel模板。（但需要吸取前次的经验进行一些改进，最好是能为每个人形成一份文件）。

第二步. 【信息收发】发放模板给大家，并收集填写完成后的文件，这是曾经认为最繁琐的步骤，因此也是最需要改进的步骤。由于考虑到大家回复内容的隐私性，在以前的发放中，多采取群中统一通知后私信接收回复的方式。但这一方式存在如下的问题：
* 群消息一旦被设为“免打扰”，很多通知会被大家忽略
* 第一步中希望采取的每位同学定制化发送自己表格的想法无法实现
* 接收到的文件要在微信客户端手工保存到电脑，由于不同的同学回复时间不同，整个过程需要收集的信息多、时间跨度大

第三步. 【信息汇总】将收到的文件汇总到一张表中

## 2.3 流程改进

* 第一步. 【设计模板】给每个人形成一个文件，帮大家把文件名写好，并把表格中我们已知的能够填写的部分都填好，而只要求填写我们需要知道的那一项。例如，发给小A同学的文件中，文件名即为学号，不需要修改。而且文件中学号、姓名项也一并填好，方便大家的操作，也方便后续的文件处理。

1234.xls

| 学号 | 姓名 | 毕业去向 | 工作单位/深造学校 | 
|:----:|:---:|:------:|:---------------:|
| 1234 | 小A |  工作   |                 |

* 第二步. 【信息收发】利用微信的API进行操作，群发信息、文件并自动接收保存大家发回的文件。
* 第三步. 【信息汇总】本项工作在之前已经做完。

# 3. 实现

## 3.1 生成每个人自己的文件

我们先按照上一节的分析，生成一个模板表(template.xls)，从而在获取到所有人信息后，可以拷贝这张表，并填写相应内容。而班级同学信息可以根据花名册获取（包含学号、姓名等信息），读取其中学号列及姓名列，存入字典中。这样我们就可以批量生成目标表。

这个过程类似于之前介绍的利用xlrd及xlwt库进行文件的读写操作，我们对之前的代码进行了一些改进，拆分出了ExcelReader和ExcelWriter两个类，包装了一些方法，以便调用。

* ExcelReader 主要用来读取特定excel文件的内容。由于我们需要以列为单位读取数据，因此主要实现了读取一列及两列的方法。

```python
import xlrd, os

class ExcelReader:
    
    def __init__(self, filepath, filename):
        self.rtable = self.__load_sheet(filepath, filename)

    def __load_sheet(self, filepath, filename):
        fullpath = os.path.join('%s/%s' % (filepath, filename))
        source = xlrd.open_workbook(fullpath)
        rtable = source.sheets()[0]
        return rtable

    def read_cell(self, row, col):
        return self.rtable.cell(row, col).value

    def read_column(self, row_range, col):
        result = []
        for row in row_range:
            result.append(self.read_cell(row, col))
        return result

    def read_two_column_as_pair(self, row_range, col1, col2):
        result = {}
        for row in row_range:
            result[self.read_cell(row, col1)] = self.read_cell(row, col2)
        return result
```


* ExcelWriter 主要用来复制或者改写某个文件
在读取了每个人的学号和姓名后，我们需要拷贝模板文件，并修改其文件名及特定单元格。因此ExcelWriter需要传入想要生成的目标文件路径及名字作为参数。而进行拷贝或修改时则需要另外提供拷贝对象的路径及文件名或需要修改的单元格的值以及行列号。


```python
from xlrd import open_workbook
from xlutils.copy import copy

import xlrd, xlwt, xlutils, os


class ExcelWriter:

    def __init__(self, target_path, target_name, target_sheet_name='sheet'):
        self.target_path = target_path
        self.target_name = target_name
        self.target_full_path = os.path.join(target_path, target_name)
        self.target_sheet_name = target_sheet_name

    def copy(self, source_path, source_name):
        rb = open_workbook(os.path.join(source_path, source_name), 
                           formatting_info=True, on_demand=True)
        wb = copy(rb)
        wb.save(self.target_full_path)

    def change_cell(self, row, col, value, sheet_num=0):
        rb = open_workbook(self.target_full_path,
                            formatting_info=True, on_demand=True)
        wb = copy(rb)
        wb.get_sheet(sheet_num).write(row, col, value)
        wb.save(self.target_full_path)
```

* 生成文件
完成上述工作后，只需要根据我们的工作流程生成需要的文件。我们将花名册命名为“2015master.xls”，读取3到90行的同学信息（第一列学号，第二列姓名），并存如num_name中，并生成对应的87份文件即可。

```python
from ExcelReader import ExcelReader
from ExcelWriter import ExcelWriter

if __name__ == "__main__":
    filepath = "."
    filename = "2015master.xls"
    reader = ExcelReader(filepath, filename)

    classmates_range = range(3, 90)
    num_name = reader.read_two_column_as_pair(classmates_range, 1, 2)
    
    source_path = "."
    source_name = "template.xls"
    target_path = "./blank"
    

    for num in num_name:
        name = num_name[num]
        target_name = "{}.xls".format(num, name)
        writer = ExcelWriter(target_path, target_name)
        writer.copy(source_path, source_name)
        writer.change_cell(2, 1, num)
        writer.change_cell(2, 2, name)
```

## 3.2 利用微信群发并自动下载

在与微信交互方面我们利用了一个优秀的微信个人号接口：[itchat]

[itchat]:https://github.com/littlecodersh/ItChat

* WeChatClient

我们需要的操作很少也很简单，主要如下：
 
  （1） 登陆微信
  （2） 获取好友列表
  （3） 根据姓名/备注名获取微信中的好友信息
  （4） 发送信息给某位好友
  （5） 发送文件给某位好友
  （6） 自动下载好友

因此也只需要根据我们的要求对itchat提供的接口做简单包装即可。


```python
import itchat

class WeChatClient:

    def __init__(self):
        self.itchat = itchat.auto_login(hotReload=True)
        self.friends = itchat.get_friends(update=True)[1:]

    def get_friends(self):
        friendList = itchat.get_friends(update=True)[1:]
        return friendList

    def get_friend(self, name):
        for friend in self.friends:
            if (friend["NickName"] == name) or (friend["RemarkName"] == name):
                return friend
        return None

    def send_msg(self, msg, user):
        itchat.send(msg, user)

    def send_file(self, file_dir, user):
        itchat.send_file(file_dir, toUserName=user)

    @itchat.msg_register(itchat.content.ATTACHMENT)
    def download_files(msg):
        msg.download('./data/' + msg.fileName)

    @itchat.msg_register(itchat.content.ATTACHMENT)
    def file_reply(self, msg):
        return_msg = "收到，谢谢！"
        return return_msg

    def start_service(self):
        itchat.run(True)
```

* 文件收发流程

由于我们会在前一步先生成好文件，因此我们仍需要先读取所有人的信息，并根据姓名匹配微信中好友信息，获得好友的UserName项，将上一步生成的文件发送给对应同学，并等待回复。收到回复文件后回复消息，并将文件下载到./data文件夹下即可。

```python
from ExcelReader import ExcelReader
from WeChatClient import WeChatClient

import itchat
import os

if __name__=="__main__":

    # get classmates from document
    filepath = "."
    filename = "2015master.xls"
    reader = ExcelReader(filepath, filename)

    classmates_range = range(3, 90)
    classmates_name = reader.read_column(classmates_range, 2)
    name_num = reader.read_two_column_as_pair(classmates_range, 2, 1)

    # get classmates' info from wechat
    client = WeChatClient()
    friends = client.get_friends()
    
    classmates = {}
    for classmate_name in classmates_name:
        classmate = client.get_friend(classmate_name)
        if classmate != None:
            classmates[classmate_name] = classmate

    # send files to classmates
    msg = "通知内容"
    for classmate_name in classmates_name:
        # send message
        client.send_msg(msg, classmates[classmate_name]['UserName'])

        # send files
        blank_excel = name_num[classmate_name] + ".xls"
        blank_excel_path = os.path.join("./blank", blank_excel)
        client.send_file(blank_excel_path, classmates[classmate_name]['UserName'])
        sleep(5)

    client.start_service()

```

## 3.3 汇总结果

本步骤即之前一篇文章的流程。

# 4. 结果及反省

## 4.1 失误

在完成上步骤后，进行了小范围测试，基本符合预期，能够有效地发送及下载文件。但在实际使用过程中，由于脚本执行过快，微信认为发送过于频繁，导致后边部分同学信息发送失败，只能手工在群中发放了一份空表供未收到的同学填写。因此在最后一段中，在两位同学发送的间隔，加入了sleep(5)，这样应该可以解决这一问题。至于能不能真的解决，或者是否需要再调大时间间隔，只能留待下次检验了-_-;

## 4.2 小结

本次实践中，
【在时间方面】原本完成整套流程需要持续5小时左右，持续地在微信跟大家收发消息、下载文件。本次脚本编写及调试用时3小时左右，实际操作工作用时1h左右，总体时间相较纯手工有所缩短。

【自动化程度】完成了54%的发送及65%的自动汇总，算是一个良好的尝试但不能算一个很好的结果。本次未能自动的部分主要是由于上述屏蔽问题及部分同学通过微信直接回复。后续希望可以继续改进，给大家带来更好的体验感和更高的效率。