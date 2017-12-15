import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';

@Component({
  selector: 'teacher-selector',
  templateUrl: './teacher-selector.component.html',
  styleUrls: ['./teacher-selector.component.css']
})
export class TeacherSelectorComponent implements OnInit, OnChanges {
  @Input() grade: any;
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
    if (change.grade && change.grade.currentValue || change.without && change.without.currentValue
      || change.with && change.with.currentValue) {
      this.buildTreeViewData()
    }
  }

  private buildTreeViewData() {
    const items = [];
    if (!this.grade) return;
    for (const group of this.grade.groups) {
      group.text = group.name;
      group.value = group.id;
      group.collapsed = !_.includes(group.name, this.subject);
      group.children = _.filter(this.grade.teachers, (teacher) => _.includes(teacher.groups, group.name)).map((teacher) => {
        teacher.text = teacher.name;
        teacher.value = teacher.id;
        teacher.disabled = _.includes(this.without, teacher.id);
        teacher.checked = _.includes(this.with, teacher.id) && !_.includes(this.without, teacher.id);
        return teacher
      });
      let item;
      item = new TreeviewItem(group);
      // item.setCheckedRecursive(false);
      items.push(item)
    }
    this.items = items
  }
}
