---
layout: post
title:  "统计太麻烦了，用python吧！"
author: Xu Chi
toc: true
tags: [tech, python]
---

如果回想起来应该是2015年9月的某个晚上桥梁馆101开完会之后就获得了一些每年必做的工作，人工做多了总想着自动化一些。

# 半年一度开学季

开学意味着要开始忙碌起来了，而一切忙碌的起始是统计班级同学返校、注册、思想动态等情况。
而需要进行八十多人的“庞大”班级的统计，哪怕只要统计一些简单的信息都要耗费颇多精力。开学统计，也只是其中一项而已。

幸好，逻辑够简单，那脚本也够简单，动起来。

# 要做些什么

我们要收集大家的信息，好比把大象塞进冰箱，一共分三步：

Step1. 写一个良好的excel模板，规规矩矩地写好例子以供大家照写不误，谁都喜欢无脑匹配不是么。

Step2. 发放模板给大家，并收集填写完成后的文件（最繁琐之步骤）

Step3. 写脚本跑脚本（最有趣的部分）

# 上代码

用python实现，方便快捷：
* get_file_list(path)，接收一个path参数，返回该路径下所有excel文件的文件名的集合
* read_content(filepath, filename)，返回目标excel文件的第一张表
* write_content(wtable, target_row, rtable)向目标table中拷贝源rtable的特定行
* assemble()则是业务逻辑，组织从分散的表到最终汇总表的映射关系

```
        import xlrd, xlwt, os

        class AssembleClient:

        def __init__(self, source_path, source_row, column_range, 
                    target_file_name="result", target_sheet_name="sheet"):
            SUFFIX = ".xls"
            self.source_path = source_path
            self.source_row = source_row
            self.column_range = column_range
            self.target_file_name = target_file_name + SUFFIX
            self.target_sheet_name = target_sheet_name

        def assemble(self):
            target =  xlwt.Workbook()
            wtable = target.add_sheet(self.target_sheet_name, cell_overwrite_ok=True)
            
            index = 0
            for filename in self.get_file_list(self.source_path):
                rtable = self.read_content(self.source_path, filename)
                self.write_content(wtable, index, rtable)
                index += 1
                
            target.save(self.target_file_name)
            print("Completed!")

        def get_file_list(self, path):
            childs = os.listdir(path)

            result = []
            for a in childs:
                if a.endswith(".xlsx") or a.endswith(".xls"):
                    result.append(a)
            return result

        def read_content(self, filepath, filename):
            fullpath = os.path.join('%s/%s' % (filepath, filename))
            source = xlrd.open_workbook(fullpath)
            rtable = source.sheets()[0]
            return rtable
            
        def write_content(self, wtable, target_row, rtable):

            if isinstance(self.column_range, int):
                column_range = list(range(0, self.column_range))
            elif isinstance(self.column_range, list):
                column_range = self.column_range

            target_index = 0
            for i in column_range:
                wtable.write(target_row, target_index, rtable.cell(self.source_row, i).value)
                target_index += 1
            return wtable

    if __name__ == "__main__":

        SOURCE_PATH = './data'
        SOURCE_ROW = 3
        COLUMN_RANGE = 10

        ac = AssembleClient(SOURCE_PATH, SOURCE_ROW, COLUMN_RANGE, "result", "sheet")
        ac.assemble()
```

## 小结

目前来看，写得还不够成熟，很多地方也只是就事论事地解决了当下的问题，在以后的使用中继续refactor，不断完善。
