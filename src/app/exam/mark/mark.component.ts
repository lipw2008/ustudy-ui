import { Component, OnInit, AfterViewInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';

declare var $: any;

@Component({
  templateUrl: 'mark.component.html'
})

export class MarkComponent implements OnInit {
  //Dom elements
  @ViewChild('questionSelector') questionSelector;
  @ViewChild('markContainer') markContainer;
  @ViewChild('rootContainer') rootContainer;

  //request content
  reqContent: any = {
    questions: [
      //		{"id": "001", "n": "1"}
    ],
    "startSeq": -1,
    "endSeq": -1
  }

  // mark content
  mark: any = {
    progress: "0%",
    groups: [
      {
        papers: [

        ]
      }
    ]
  };

  // question selector
  questionList: any;
  markQuestions: any = [];

  // score board
  displayScoreBoard: boolean = true;
  fullScore: string = "0";
  scoreList = [];
  scoreUnit = "1";
  autoSubmit = false;

  // page controller
  curPage: number = 0;
  pageCount: number = 0;

  // canvas
  editMode: string = "None";
  score: string = "";
  score2: string = "";
  score3: string = "";
  answer = {
    region: {
      x: "",
      y: "",
      w: "",
      h: ""
    },
    paperImg: "",
    answerType: "",
    markImg: "",
    markImgData: ""
  };
  answer2 = {
    region: {
      x: "",
      y: "",
      w: "",
      h: ""
    },
    paperImg: "",
    answerType: "",
    markImg: "",
    markImgData: ""
  };
  answer3 = {
    region: {
      x: "",
      y: "",
      w: "",
      h: ""
    },
    paperImg: "",
    answerType: "",
    markImg: "",
    markImgData: ""
  };
  markCanvas2Display: string = 'none';
  markCanvas3Display: string = 'none';

  constructor(private _sharedService: SharedService, private renderer: Renderer2, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.questionList = JSON.parse(this.route.snapshot.params.questionList);
  }

  ngAfterViewInit(): void {
    console.log();
    let question = { "id": "", "n": "" };
    question.id = this.route.snapshot.params.questionId;
    question.n = this.route.snapshot.params.questionName;
    this.markQuestions.push(question);
    console.log("init mark questions:" + JSON.stringify(this.markQuestions));
    $(this.questionSelector.nativeElement).selectpicker('val', question.n);
    $(this.questionSelector.nativeElement).on('changed.bs.select', { t: this }, this.onQuestionChange);
    this.reload();
  }

  onQuestionChange(event: any): void {
    var t = event.data.t;
    t.markQuestions = [];
    var questionNames = $(t.questionSelector.nativeElement).val();
    for (let questionName of questionNames) {
      for (let question of t.questionList) {
        if (question.n === questionName) {
          t.markQuestions.push(question);
          break;
        }
      }
    }

    console.log("On question change: " + JSON.stringify(t.markQuestions));
    // load marks data based on the mark questions.
    t.reload();
  }

  reload(): void {
    for (let markQuestion of this.markQuestions) {
      let question = { "id": "" };
      question.id = markQuestion.id;
      this.reqContent.questions.push(question);
    }

    //this._sharedService.makeRequest('POST', '/exam/marktask/paper/view/', JSON.stringify(this.reqContent)).then((data: any) => {
    this._sharedService.makeRequest('GET', 'assets/api/exams/multiMark.json', '').then((data: any) => {
      this.reqContent.questions = [];

      //cache the list
      console.log("data: " + JSON.stringify(data));
      this.mark = data;
      this.pageCount = this.mark.groups.length;
      if (this.pageCount <= 0) {
        alert("没有可阅试卷");
        return;
      }
      if (this.reqContent.startSeq === -1 && this.reqContent.endSeq === -1) {
        this.curPage = this.mark.groups[0].paperSeq;
      } else {
        this.reqContent.startSeq = -1;
        this.reqContent.endSeq = -1;
      }

      if (this.markQuestions.length == 1) {
        this.markCanvas2Display = 'none';
        this.markCanvas3Display = 'none';
      }
      if (this.markQuestions.length >= 2) {
        this.markCanvas2Display = 'block';
      }
      if (this.markQuestions.length == 3) {
        this.markCanvas3Display = 'block';
      }
      this.updateCanvas();
      this.updateFullScore();
    }).catch((error: any) => {
      console.log(error.status);
      console.log(error.statusText);
      alert("无法加载试卷");
    });
  }

  updateCanvas(): void {
    console.log("update canvas for page: " + this.curPage);
    for (let group of this.mark.groups) {
      if (group.paperSeq === this.curPage) {
        this.answer.region = group.papers[0].region;
        this.answer.paperImg = group.papers[0].paperImg;
        this.answer.answerType = group.papers[0].answerType;
        this.answer.markImg = group.papers[0].markImg;
        this.answer.markImgData = group.papers[0].markImgData;
        this.score = "阅卷老师：" + this.mark.teacherId + " 得分：";
        if (this.markQuestions.length >= 2) {
          this.answer2.region = group.papers[1].region;
          this.answer2.paperImg = group.papers[1].paperImg;
          this.answer2.answerType = group.papers[1].answerType;
          this.answer2.markImg = group.papers[1].markImg;
          this.answer2.markImgData = group.papers[1].markImgData;
          this.score2 = this.score;
        }
        if (this.markQuestions.length == 3) {
          this.answer3.region = group.papers[2].region;
          this.answer3.paperImg = group.papers[2].paperImg;
          this.answer3.answerType = group.papers[2].answerType;
          this.answer3.markImg = group.papers[2].markImg;
          this.answer3.markImgData = group.papers[2].markImgData;
          this.score3 = this.score;
        }
        break;
      }
    }
  }

  updateFullScore(): void {
    console.log("before update full score: " + this.fullScore);
    console.log("before update full score - mark: " + JSON.stringify(this.mark));
    for (let group of this.mark.groups) {
      if (group.paperSeq === this.curPage) {
        for (let paper of group.papers) {
          if (paper.isProblemPaper === true) {
            continue;
          }
          if (paper.steps.length === 0 && paper.score === "") {
            this.fullScore = paper.fullScore;
            console.log("after update full score: " + this.fullScore);
            this.updateScoreBoard();
            return;
          } else if (paper.steps.length > 0) {
            for (let step of paper.steps) {
              if (step.score === "") {
                this.fullScore = step.fullScore;
                console.log("after update full score: " + this.fullScore);
                this.updateScoreBoard();
                return;
              }
            }
          }
        }
      }
    }
    if (this.autoSubmit === true) {
      this.submit();
    }
  }

  setScoreUnit(unit): void {
    this.scoreUnit = unit;
    this.updateScoreBoard();
  }

  updateScoreBoard(): void {
    this.scoreList = [];
    var score = Number(this.fullScore);
    var unit = parseFloat(this.scoreUnit);
    for (var i = 0; i <= score; i += unit) {
      this.scoreList.push(i);
    }
    console.log(this.scoreList);
  }

  setFullScore(): void {
    this.setScore(this.fullScore);
  }

  setZeroScore(): void {
    this.setScore("0");
  }

  setScore(score: string): void {
    for (let group of this.mark.groups) {
      if (group.paperSeq === this.curPage) {
        for (let paper of group.papers) {
          if (paper.isProblemPaper === true) {
            continue;
          }
          if (paper.steps.length === 0 && paper.score === "") {
            if (score !== 'PROBLEM') {
              paper.score = score;
            } else {
              paper.isProblemPaper = true;
            }
            this.updateFullScore();
            return;
          } else if (paper.steps.length > 0) {
            for (let step of paper.steps) {
              if (step.score === "") {
                if (score !== 'PROBLEM') {
                  step.score = score;
                } else {
                  paper.isProblemPaper = true;
                }
                this.updateFullScore();
                return;
              }
            }
          }
        }
      }
    }
  }

  firstPage(): void {

  }

  previousPage(): void {
    this.curPage--;
    if (this.curPage < this.mark.groups[0].paperSeq) {
      this.reqContent.startSeq = (this.curPage - 10 < 0 ? 0 : this.curPage - 10);
      this.reqContent.endSeq = this.curPage;
      this.reload();
    } else {
      this.updateCanvas();
      this.updateFullScore();
    }
  }

  nextPage(): void {
    this.curPage++;
    if (this.curPage > this.mark.groups[this.pageCount - 1].paperSeq) {
      this.reload();
    } else {
      this.updateCanvas();
      this.updateFullScore();
    }
  }

  lastPage(): void {

  }

  submit(): void {
    for (let group of this.mark.groups) {
      if (group.paperSeq === this.curPage) {
        if (group.papers[0].score !== "") {
          this.score += group.papers[0].score + "/" + group.papers[0].fullScore;
        } else {
          for (let step of group.papers[0].steps) {
            this.score += step.score + "/" + step.fullScore + " ";
          }
        }
        if (this.markQuestions.length >= 2) {
          if (group.papers[1].score !== "") {
            this.score2 += group.papers[1].score + "/" + group.papers[1].fullScore;
          } else {
            for (let step of group.papers[1].steps) {
              this.score2 += step.score + "/" + step.fullScore + " ";
            }
          }
        }
        if (this.markQuestions.length == 3) {
          if (group.papers[2].score !== "") {
            this.score3 += group.papers[2].score + "/" + group.papers[2].fullScore;
          } else {
            for (let step of group.papers[2].steps) {
              this.score3 += step.score + "/" + step.fullScore + " ";
            }
          }
        }
      }
    }
    this.addScore();
  }

  updatePaper() {
    if (this.answer.markImgData === "" ||
      (this.markQuestions.length >= 2 && this.answer2.markImgData === "") ||
      (this.markQuestions.length === 3 && this.answer3.markImgData === "")) {
      return;
    }
    for (let group of this.mark.groups) {
      if (group.paperSeq === this.curPage) {
        if (group.papers.length >= 1) {
          group.papers[0].markImgData = this.answer.markImgData;
          group.papers[0].answerType = this.answer.answerType;
        }
        if (group.papers.length >= 2) {
          group.papers[1].markImgData = this.answer2.markImgData;
          group.papers[1].answerType = this.answer2.answerType;
        }
        if (group.papers.length === 3) {
          group.papers[2].markImgData = this.answer3.markImgData;
          group.papers[2].answerType = this.answer3.answerType;
        }
        this._sharedService.makeRequest('POST', '/exam/marktask/paper/update/', JSON.stringify(group)).then((data: any) => {
          alert("修改成功");
          this.nextPage();
        }).catch((error: any) => {
          console.log(error.status);
          console.log(error.statusText);
          alert("修改失败！");
        });
      }
    }
  }

  drawLine(): void {
    this.editMode = 'Line';
  }

  drawCircle(): void {
    this.editMode = 'Circle';
  }

  drawText(): void {
    this.editMode = 'Text';
  }

  addLike(): void {
    this.editMode = 'Like';
  }

  addHelp(): void {
    this.editMode = 'Help';
  }

  addBestAnswer(): void {
    //To DO: bese; faq; bad should not be specified at the same time
    this.editMode = "BestAnswer";
  }

  addFAQ(): void {
    this.editMode = "FAQ";
  }

  addQueerAnswer(): void {
    this.editMode = "QueerAnswer";
  }

  addScore(): void {
    this.editMode = "Score";
  }

  clear(): void {
    this.editMode = "Clear";
  }
}
