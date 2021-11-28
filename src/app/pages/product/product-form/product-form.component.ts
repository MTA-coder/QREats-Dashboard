import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/product';
import { IType } from 'src/app/models/type';
import { ProductService } from '../../services/product.service';
import { StorageService } from '../../services/storage.service';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  product: IProduct;
  types: IType[];
  url: any = null;
  isProductViewed = false;
  uploadedNewImg = false;
  loading = false;
  uploadImg = false;

  productForm: FormGroup;

  constructor(
    private _product: ProductService,
    private _type: TypeService,
    private fb: FormBuilder,
    private _router: Router,
    private _storage: StorageService) {
    this.product = {
      description: '', id: 0, name: '', price: 0, type_id: 1, url: ''
    };
  }

  ngOnInit(): void {
    this.initForm();
    this.FetchData();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      description: [
        null
      ],
      price: [
        0,
        Validators.compose([
          Validators.min(0)
        ]),
      ],
      type_id: [0],
      files: [null],
      restaurant_id: [this._storage.getLocalObject('resto').id],
      url: null
    });
  }

  patchForm() {
    this.productForm.patchValue({
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      type_id: this.product.type_id,
      url: this.product.url
    });
  }

  FetchData() {
    this.getProductSelected();
    this.getTypes();
  }

  getProductSelected() {
    this._product.product.subscribe((product) => {
      this.product = product;
      //Check To Update
      this.isProductViewed = this.product.id != 0;
      if (this.isProductViewed) {
        this.uploadedNewImg = false;
        this.patchForm();
      }

    });
  }

  getTypes() {
    this._type.fetchTypes().subscribe((response: any) => {
      this.types = response.data.slice();
    });
  }

  storeImages(target) {
    this.uploadImg = true;
    this.productForm.patchValue({
      files: target.files[0]
    });
    var reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onload = () => {
      this.product.url = String(reader.result);
      this.uploadedNewImg = true;
    };
  }

  submit() {
    this.loading = true;
    if (this.isProductViewed) {
      if (this.uploadedNewImg) {
        const files = new FormData();
        files.append('file', this.productForm.get('files').value);
        this.uploadFiles(files);
      }
      else {
        this.update();
      }
    } else {
      if (this.uploadImg) {
        const files = new FormData();
        files.append('file', this.productForm.get('files').value);
        this.uploadFiles(files);
      }
      else {
        this.create();
      }
    }
    this.uploadImg = false;
  }

  uploadFiles(files) {
    this._product.upload(files).subscribe((response: any) => {
      this.productForm.patchValue({ url: response.data });
      if (this.isProductViewed) this.update();
      else this.create();
    });
  }

  update() {
    this._product.updateProductById(this.product.id, this.productForm.value).subscribe((response) => {
      // this.SwalSuccess();
      this.loading = false;
      window.location.reload();
    });
  }

  create() {
    this._product.createProduct(this.productForm.value).subscribe((response) => {
      console.log(response);
      // this.SwalSuccess();
      this.loading = false;
      window.location.reload();
    });
  }

  delete() {
    // this._product.deleteSelectedProduct(this.product.id)
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You will not be able to recover this imaginary file!',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, keep it'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    this._product.deleteSelectedProduct(this.product.id).subscribe((response: any) => {
      // Swal.fire(
      //   'Deleted!',
      //   'Your imaginary file has been deleted.',
      //   'success'
      // )
      window.location.reload();
    });
    //   } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal.fire(
    //       'Cancelled',
    //       'Your imaginary file is safe :)',
    //       'error'
    //     )
    //   }
    // })
  }

  // SwalSuccess() {
  //   Swal.fire(
  //     'Saved Successfuly',
  //     'yourn product is saved :)',
  //     'success'
  //   );
  // }

}
