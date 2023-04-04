import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Consultation } from 'src/app/medecin/models/consultation';
import { Patient } from 'src/app/medecin/models/patient';
import { FormService } from 'src/app/medecin/services/form.service';
import { PatientService } from 'src/app/medecin/services/patient.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class ConsultationComponent {

  // consultationForm
  mainForm!: FormGroup;
  examenCliniqueForm!: FormGroup;
  symptomeForm: FormGroup[] = [];
  diagnostiqueForm: FormGroup[] = [];
  images: WebcamImage[] = [];
  imagesFiles: File[] = [];
  loading$!: Observable<boolean>;

  @ViewChild('consultationForm') form!: NgForm;

  constructor(private formBuilder: FormBuilder, private formService: FormService, private patientService: PatientService) {}

  readonly idPatient: string = this.patientService.getPatientId();

  ngOnInit(): void{
    this.initFormControls();
    this.loading$ = this.patientService.loading$;
  }
  //Examen clinique
  updateMain(): void{
    this.mainForm = this.formBuilder.group({
      examenClinique: this.examenCliniqueForm,
      ...this.symptomeForm,
      ...this.diagnostiqueForm,
      idPatient: [(this.idPatient!=="") ? this.idPatient : null, [Validators.required]]
    });
    console.log(this.idPatient);
  }

  initFormControls(): void{

    this.examenCliniqueForm = this.formBuilder.group({
      motif_consultation: [null, [Validators.required]],
      age: [null, [Validators.required]],
      taille: [null, [Validators.required]],
      temperature: [null, [Validators.required]],
      pression_arterielle: [null, [Validators.required]],
      poids: [null, [Validators.required]],
      pouls: [null, [Validators.required]],
      spo2: [null, [Validators.required]]
    }, {
      updateOn: 'blur'
    });


    this.onAddSymptom();
    this.onAddDiagnostique();
    this.updateMain();
  }

  //Symptoms methods
  onAddSymptom(): void{
    this.symptomeForm.push(this.formBuilder.group({
      symptome: [null, [Validators.required]],
      commentaire: [null, [Validators.required]]
    }, {
      updateOn: 'blur'
    }));
    this.updateMain();
  }

  onRemoveSymptom(index: number): void{
    this.symptomeForm = this.symptomeForm.filter((val, i) => i!==index);
    this.updateMain();
  }

  getSymptom(value: string, index: number): void{
    this.symptomeForm[index].controls['symptome'].setValue(value);
  }

  //Diagnostique methods
  onAddDiagnostique(): void{
    this.diagnostiqueForm.push(this.formBuilder.group({
      diagnostique: [null, [Validators.required]],
      remarque: [null, [Validators.required]]
    }, {
      updateOn: 'blur'
    }));
    this.updateMain();
  }

  onRemoveDiagnostique(index: number): void{
    this.diagnostiqueForm = this.diagnostiqueForm.filter((val, i) => i!==index);
    this.updateMain();
  }

  getDiagnostique(value: string, index: number): void{
    this.diagnostiqueForm[index].controls['diagnostique'].setValue(value);
  }

  onSubmit(): void{
    console.log(this.mainForm);
    if(this.mainForm.valid){
      const consultation: Consultation = this.formService.addHeaders({
        id: '1',
        examen_clinique: this.examenCliniqueForm.value,
        symptomes: [],
        diagnostiques: [],
        images: []
      });

      console.log('submitted')
      this.symptomeForm.forEach(symptom => consultation.symptomes.push(symptom.value))
      this.diagnostiqueForm.forEach(diagnostic => consultation.diagnostiques.push(diagnostic.value))
      this.images.forEach(image => consultation.images.push(image.imageAsDataUrl));

      //API post
      this.patientService.newMedication(consultation);
    }else{
      console.log('non submitted');
    }
  }

  getImages(images: WebcamImage[]): void{
    this.images = images;
    images.forEach(image => this.imagesFiles.push(this.formService.toFile(image, "name", "image/jpg")));
  }

}
