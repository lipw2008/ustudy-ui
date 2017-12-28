import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'teacher-selector',
  templateUrl: './teacher-selector.component.html',
  styleUrls: ['./teacher-selector.component.css']
})
export class TeacherSelectorComponent implements OnInit, OnChanges {
  @Input() subjectTeachers: any;
  @Input() subject: string;
  @Input() without = [];
  @Input() with = [];
  @Output() selectResult = new EventEmitter();
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 300
  });

  items = [];

  onSelectedChange(evt) {
    this.selectResult.emit(evt)
  }
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(change) {
    if (change.subjectTeachers && change.subjectTeachers.currentValue || change.without && change.without.currentValue
      || change.with && change.with.currentValue) {
      this.buildTreeViewData()
    }
  }

  private buildTreeViewData() {
    const items = [];
    if (!this.subjectTeachers) return;
    for (const subject of this.subjectTeachers) {
      subject.text = subject.subName;
      subject.value = subject.subId;
      subject.collapsed = !_.includes(subject.subName, this.subject);
      subject.children = _.filter(subject.teachers, (teacher) => _.includes(teacher.groups, subject.subName)).map((teacher) => {
        teacher.text = teacher.teacName;
        teacher.value = teacher.teacId;
        teacher.disabled = _.includes(this.without, teacher.teacId);
        teacher.checked = _.includes(this.with, teacher.teacId) && !_.includes(this.without, teacher.teacId);
        return teacher
      });
      let item;
      item = new TreeviewItem(subject);
      if (!item.children) {
        item.checked = false;
        item.disabled = true;
      }
      // item.setCheckedRecursive(false);
      items.push(item)
    }
    this.items = items
  }
}
