import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-voucher-details',
  imports: [CommonModule],
  templateUrl: './voucher-details.component.html',
  styleUrl: './voucher-details.component.scss'
})
export class VoucherDetailsComponent {
  @Output() toggleModal = new EventEmitter<any>();
  @Input() voucher_details: any;

  closeModal(){
    this.toggleModal.emit('voucher-details');
  }

  parseReason(data: any): string {
    if (!data) return '';

    let obj: any = typeof data === 'object' ? JSON.stringify(data) : data;

    if (obj.charAt(0) === '[' || obj.charAt(0) === '{') {
      obj = JSON.parse(obj);
    } else {
      return obj;
    }

    const cleanAttributes = (obj: any): any => {
      if (typeof obj !== 'object' || obj === null) return obj;

      // Flatten @attributes if exists
      if (obj['@attributes']) {
        obj = { ...obj, ...obj['@attributes'] };
        delete obj['@attributes'];
      }

      // Recursively clean nested structures
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          obj[key] = Array.isArray(obj[key])
            ? obj[key].map((item: any) => cleanAttributes(item))
            : cleanAttributes(obj[key]);
        }
      }

      return obj;
    };

    obj = cleanAttributes(obj);

    const buildKeyValueTable = (entries: [string, any][]) => {
      let html = '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%; margin-bottom: 10px;">';
      html += '<thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>';
      for (const [key, value] of entries) {
        html += `<tr><td><b>${key}</b></td><td>${value ?? ''}</td></tr>`;
      }
      html += '</tbody></table>';
      return html;
    };

    let html = '';

    // Move claim-level fields to top
    const claimFields: [string, any][] = [];
    const otherFields: [string, any][] = [];

    for (const [key, value] of Object.entries(obj)) {
      if (key !== 'CHARGE') {
        claimFields.push([key, value]);
      } else {
        otherFields.push([key, value]);
      }
    }

    // Render claim-level fields first
    html += buildKeyValueTable(claimFields);

    // Render CHARGE section(s)
    const chargeItems = obj['CHARGE'] || [];
    if (Array.isArray(chargeItems)) {
      chargeItems.forEach((item: any, index: number) => {
        html += `<div><strong>CHARGE ${index + 1}</strong></div>`;
        html += buildKeyValueTable(Object.entries(item));
      });
    }

    return html;
  }



  /* parseReason(data: any): string {
    if (!data) return '';

    let obj: any = typeof data === 'object' ? JSON.stringify(data) : data;

    if (obj.charAt(0) === '[' || obj.charAt(0) === '{') {
      obj = JSON.parse(obj);
    } else {
      return obj;
    }

    const cleanAttributes = (obj: any): any => {
      if (typeof obj !== 'object' || obj === null) return obj;

      // If object has @attributes, merge them into the object
      if (obj['@attributes']) {
        obj = { ...obj, ...obj['@attributes'] };
        delete obj['@attributes'];
      }

      // Recursively clean nested structures
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          obj[key] = Array.isArray(obj[key])
            ? obj[key].map((item: any) => cleanAttributes(item))
            : cleanAttributes(obj[key]);
        }
      }

      return obj;
    };

    obj = cleanAttributes(obj);

    const buildTable = (obj: any): string => {
      let html = '<table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">';
      html += '<thead><tr><th>Key</th><th>Value</th></tr></thead><tbody>';

      Object.entries(obj).forEach(([key, value]) => {
        html += '<tr>';
        html += `<td><b>${key}</b></td>`;
        if (typeof value === 'object' && value !== null) {
          html += `<td>${Array.isArray(value)
            ? value.map(v => buildTable(v)).join('<br>')
            : buildTable(value)}</td>`;
        } else {
          html += `<td>${value ?? ''}</td>`;
        }
        html += '</tr>';
      });

      html += '</tbody></table>';
      return html;
    };

    return buildTable(obj);
  } */


  /* parseReason(data) {
    console.log(data)
    if(data) {
      let obj: any = typeof data === 'object' ? JSON.stringify(data) : data;
      let message: any = '';

      if(obj.charAt(0) === '[') {
        obj = JSON.parse(obj);
      } else {
        if(obj.charAt(0) === '{') {
          obj = JSON.parse(obj);
        } else {
          return obj;
        }
      }

      const parse = (obj: any) => {
        Object.entries(obj).forEach(([key, value]: any) => {
          if (typeof value === 'object' && value !== null) {
            parse(value);
          } else {
            message += `<b>${key}</b>: ${value}<br>`;
          }
        });
      };

      parse(obj);
      return message;
    }
    return '';
  } */
}
