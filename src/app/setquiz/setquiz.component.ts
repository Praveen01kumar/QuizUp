import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-setquiz',
  templateUrl: './setquiz.component.html',
  styleUrls: ['./setquiz.component.scss']
})
export class SetquizComponent implements OnInit {
  quizQAForm!: FormGroup;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.quizForminisilize();
  }
  sub: boolean = false;
  quizForminisilize() {
    this.quizQAForm = this.fb.group({
      questions: this.fb.array([]),
    })
  }

  questions(): FormArray {
    return this.quizQAForm.get("questions") as FormArray;
  }

  newQuestions(): FormGroup {
    return this.fb.group({
      question_name: ['', [Validators.required]],
      options: this.fb.array([
        this.fb.group({ option: ['', [Validators.required]], answer: [true] }),
        this.fb.group({ option: ['', [Validators.required]], answer: [false] }),
        this.fb.group({ option: ['', [Validators.required]], answer: [false] }),
        this.fb.group({ option: ['', [Validators.required]], answer: [false] }),
      ])
    })
  }

  addNewQuestions() {
    this.questions().push(this.newQuestions());
  }

  removeQuestions(qaIndex: number) {
    this.questions().removeAt(qaIndex);
  }

  questionsOptions(qaIndex: number): FormArray {
    return this.questions().at(qaIndex).get("options") as FormArray;
  }

  newOptions(): FormGroup {
    return this.fb.group({
      option: ['', [Validators.required]],
      answer: [false]
    })
  }

  addnewOptions(qaIndex: number) {
    this.questionsOptions(qaIndex).push(this.newOptions());
  }

  removenewOptions(qaIndex: number, opIndex: number) {
    const options = this.questionsOptions(qaIndex);
    const value = options?.at(opIndex)?.get('answer')?.value;
    if (value === true) {
      if (opIndex === 0) {
        options.at(1).get('answer')!.setValue(true);
      } else {
        options.at(0).get('answer')!.setValue(true);
      }
    }
    if (value === false) {
      const val = options.controls.find((control) => control?.value?.answer === true);
      if (!val) {
        options.at(0).get('answer')!.setValue(true);
      }
    }

    this.questionsOptions(qaIndex).removeAt(opIndex);
  }

  onSubmit() {
    this.sub = true;
    const qalen = this.quizQAForm.value?.questions?.length;
    if (this.quizQAForm?.invalid || qalen == 0) {
      return;
    }

    console.log(this.quizQAForm.value);

  }

  autoExpandTextarea(event: Event | any) {
    const textarea = event?.target;
    textarea.style.height = 'auto';
    textarea.style.height = (5 + textarea.scrollHeight) + 'px';
  }

  getChecked(qaIndex: number, opIndex: number, event: any) {
    const value = event?.target?.checked;
    const options = this.questionsOptions(qaIndex);
    if (options) {
      options.controls.forEach((control, index) => {
        if (index !== opIndex && control.get('answer')) {
          control.get('answer')!.setValue(false);
        }
      });
      if (options.at(opIndex).get('answer')) {
        options.at(opIndex).get('answer')!.setValue(value);
      }
    }
  }

  isChecked(qaIndex: number, opIndex: number): boolean {
    const option = this.questionsOptions(qaIndex)?.at(opIndex);
    return option ? option.get('answer')?.value === true : false;
  }

  validat(value: any): boolean {
    return (this.sub && value?.errors) || ((value?.dirty || value?.touched) && value?.errors);
  }


}
