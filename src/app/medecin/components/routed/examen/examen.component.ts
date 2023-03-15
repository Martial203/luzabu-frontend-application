import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { ExamenGeneral } from 'src/app/medecin/models/examen-general';
import { FormService } from 'src/app/medecin/services/form.service';
import { PatientService } from 'src/app/medecin/services/patient.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent {

  mainForm!: FormGroup;
  examenGeneralForm: FormGroup[] = [];
  images: WebcamImage[] = [];
  imagesFiles: File[] = [];

  @ViewChild('examenForm') form!: NgForm;

  constructor(private formBuilder: FormBuilder, private formService: FormService, private patientService: PatientService) {}

  readonly idPatient: string = this.patientService.getPatientId();

  ngOnInit(): void {
    this.initFormControls();
  }

  updateMain(): void{
    this.mainForm = this.formBuilder.group({
      ...this.examenGeneralForm,
      idPatient: [(this.idPatient!=="") ? this.idPatient : null, [Validators.required]]
    });
  }

  initFormControls(): void{
    this.onAddExamenGroup();
  }

  onAddExamenGroup(): void{
    this.examenGeneralForm.push(this.formBuilder.group({
      examen: [null, [Validators.required]],
      consignes: [null, [Validators.required]]
    },{
      updateOn: 'blur'
    }));
    this.updateMain();
  }

  onGroupRemoveExamen(index: number): void{
    this.examenGeneralForm = this.examenGeneralForm.filter((x, i) => i!==index);
    this.updateMain();
  }

  onFillExamen(value: string, index: number): void{
    this.examenGeneralForm[index].controls['examen'].setValue(value);
  }

  onFillConsignes(value: string[], index: number): void{
    this.examenGeneralForm[index].controls['consignes'].setValue(value);
  }

  onSubmit(): void{
    if(this.mainForm.valid){
      const examen: ExamenGeneral = this.formService.addHeaders({
        id: 'a',
        examens: [],
        images: []
      });

      this.examenGeneralForm.forEach(exam => examen.examens.push(exam.value))
      this.images.forEach(image => examen.images.push(image.imageAsDataUrl));

      //Api post
      this.patientService.newMedication(examen);
    }
  }

  getImages(images: WebcamImage[]): void{
    this.images = images;
    images.forEach(image => this.imagesFiles.push(this.formService.toFile(image, "name", "image/jpg")));
  }
}
