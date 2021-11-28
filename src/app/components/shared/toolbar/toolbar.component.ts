import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/pages/services/product.service';
import { StorageService } from 'src/app/pages/services/storage.service';
import { environment } from 'src/environments/environment';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('ktPageTitle', { static: true }) ktPageTitle: ElementRef;
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  };
  toolbarContainerCssClasses: string = '';
  pageTitleCssClasses: string = '';

  tableQRCode = [];
  message = "Save";

  constructor(
    private layout: LayoutService,
    private _product: ProductService,
    public _modal: NgbModal,
    private _storage: StorageService
  ) { }

  ngOnInit(): void {
    this.toolbarContainerCssClasses =
      this.layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
  }

  drawerProduct() {
    this._product.setinitial();
  }

  decode(str: string): string {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  encode(str: string): string {
    return decodeURIComponent(escape(window.atob(str)));
  }

  generateQRCodes(from, to) {

    if (from > to) return;

    this.message = "Download";

    this.tableQRCode = [];
    for (let index = from; index <= to; index++) {
      this.tableQRCode.push({
        url: "http://qr-eats.tech" + "/menu/" + btoa(String(this._storage.getLocalObject('resto').id)) + "/table/" + btoa(String(index)),
        table: index
      });
    }

    console.log(this.tableQRCode);


    var qrcodes = document.getElementsByClassName('qrCodes');

    for (let index = 0; index < qrcodes.length; index++) {
      const fileNameToDownload = 'QRCode Table ' + this.tableQRCode[index].table
      const base64Img = qrcodes[index].children[0]['src'];
      fetch(base64Img)
        .then(res => res.blob())
        .then((blob) => {
          // IE
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileNameToDownload;
          link.click();
          if (index + 1 == qrcodes.length) {
            this._modal.dismissAll();
            this.message = "Save";
          }
        });
    }
  }

  ngAfterViewInit() {
    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (
          this.pageTitleAttributes.hasOwnProperty(key) &&
          this.ktPageTitle.nativeElement
        ) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }
}
