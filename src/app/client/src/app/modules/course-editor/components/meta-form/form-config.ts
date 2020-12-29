import {tap, switchMap} from 'rxjs/operators';
import {of, merge, from} from 'rxjs';
import { map } from 'lodash-es';

export const formConfig = [
  {
    'code': 'name',
    'dataType': 'text',
    'description': 'Name of the content',
    'editable': true,
    'inputType': 'text',
    'label': 'Name',
    'name': 'Name',
    'placeholder': 'Name',
    'renderingHints': {},
    'required': true,
    'visible': true,
    'default': 'Test Name',
    'validation': [{
      'type': 'max',
      'value': '120',
      'message': 'Input is Exceded'
    }]
  },
  {
    'code': 'description',
    'dataType': 'text',
    'description': 'Brief description',
    'editable': true,
    'inputType': 'textarea',
    'label': 'Description',
    'name': 'Description',
    'placeholder': 'Description',
    'renderingHints': {},
    'required': false,
    'visible': true,
    'validation': [{
      'type': 'max',
      'value': '1000',
      'message': 'Input is Exceded'
    }]
  },
  // {
  //   'code': 'topic',
  //   'visible': true,
  //   'editable': true,
  //   'dataType': 'list',
  //   'renderingHints': {},
  //   'name': 'Topic',
  //   'description': 'Choose a Topics',
  //   'index': 11,
  //   'inputType': 'topicselector',
  //   'label': 'Topics',
  //   'placeholder': 'Choose Topics',
  //   'required': false,
  //   'section': {
  //     'index': 3,
  //     'name': ''
  //   }
  // }, {
  //   'code': 'keywords',
  //   'visible': true,
  //   'editable': true,
  //   'dataType': 'list',
  //   'name': 'Keywords',
  //   'renderingHints': {
  //     'class': 'col-span-2'
  //   },
  //   'index': 3,
  //   'description': 'Keywords for the content',
  //   'inputType': 'keywordsuggestion',
  //   'label': 'keywords',
  //   'placeholder': 'Enter Keywords',
  //   'required': false,
  //   'section': {
  //     'index': 1,
  //     'name': ''
  //   }
  // }
  // {
  //   'code': 'board',
  //   'dataType': 'text',
  //   'depends': [
  //       'gradeLevel',
  //       'medium',
  //       'subject',
  //       'topic'
  //   ],
  //   'description': 'Board',
  //   'editable': true,
  //   'index': 2,
  //   'inputType': 'select',
  //   'label': 'Board/Syllabus',
  //   'name': 'Board/Syllabus',
  //   'placeholder': 'Select Board/Syllabus',
  //   'renderingHints': {},
  //   'required': true,
  //   'visible': true,
  //   'type': 'select',
  //   'templateOptions': {
  //     'placeHolder': 'Select Board',
  //     'multiple': false,
  //     'hidden': false,
  //   },
  //   'validations': [{
  //     'type': 'required'
  //   }],
  //   'identifier': 'ekstep_ncert_k-12_board',
  //   'terms': [
  //     {
  //     'associations': [
  //       {
  //         'identifier': 'ekstep_ncert_k-12_medium_sanskrit',
  //         'code': 'sanskrit',
  //         'translations': null,
  //         'name': 'Sanskrit',
  //         'description': 'Sanskrit',
  //         'index': 0,
  //         'category': 'medium',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_medium_urdu',
  //         'code': 'urdu',
  //         'translations': null,
  //         'name': 'Urdu',
  //         'description': 'Urdu',
  //         'index': 0,
  //         'category': 'medium',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_medium_hindi',
  //         'code': 'hindi',
  //         'translations': null,
  //         'name': 'Hindi',
  //         'description': 'Hindi',
  //         'index': 0,
  //         'category': 'medium',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_medium_english',
  //         'code': 'english',
  //         'translations': null,
  //         'name': 'English',
  //         'description': 'English',
  //         'index': 0,
  //         'category': 'medium',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class1',
  //         'code': 'class1',
  //         'translations': null,
  //         'name': 'Class 1',
  //         'description': 'Class 1',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class2',
  //         'code': 'class2',
  //         'translations': null,
  //         'name': 'Class 2',
  //         'description': 'Class 2',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class3',
  //         'code': 'class3',
  //         'translations': null,
  //         'name': 'Class 3',
  //         'description': 'Class 3',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class4',
  //         'code': 'class4',
  //         'translations': null,
  //         'name': 'Class 4',
  //         'description': 'Class 4',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class5',
  //         'code': 'class5',
  //         'translations': null,
  //         'name': 'Class 5',
  //         'description': 'Class 5',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class6',
  //         'code': 'class6',
  //         'translations': null,
  //         'name': 'Class 6',
  //         'description': 'Class 6',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class7',
  //         'code': 'class7',
  //         'translations': null,
  //         'name': 'Class 7',
  //         'description': 'Class 7',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class8',
  //         'code': 'class8',
  //         'translations': null,
  //         'name': 'Class 8',
  //         'description': 'Class 8',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class9',
  //         'code': 'class9',
  //         'translations': null,
  //         'name': 'Class 9',
  //         'description': 'Class 9',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       }
  //     ],
  //     'identifier': 'ekstep_ncert_k-12_board_cbse',
  //     'code': 'cbse',
  //     'translations': null,
  //     'name': 'CBSE',
  //     'description': 'CBSE',
  //     'index': 1,
  //     'category': 'board',
  //     'status': 'Live'
  //   },
  //   {
  //     'associations': [
  //       {
  //         'identifier': 'ekstep_ncert_k-12_medium_hindi',
  //         'code': 'hindi',
  //         'translations': null,
  //         'name': 'Hindi',
  //         'description': 'Hindi',
  //         'index': 0,
  //         'category': 'medium',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_medium_english',
  //         'code': 'english',
  //         'translations': null,
  //         'name': 'English',
  //         'description': 'English',
  //         'index': 0,
  //         'category': 'medium',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class6',
  //         'code': 'class6',
  //         'translations': null,
  //         'name': 'Class 6',
  //         'description': 'Class 6',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class7',
  //         'code': 'class7',
  //         'translations': null,
  //         'name': 'Class 7',
  //         'description': 'Class 7',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class8',
  //         'code': 'class8',
  //         'translations': null,
  //         'name': 'Class 8',
  //         'description': 'Class 8',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class9',
  //         'code': 'class9',
  //         'translations': null,
  //         'name': 'Class 9',
  //         'description': 'Class 9',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class10',
  //         'code': 'class10',
  //         'translations': null,
  //         'name': 'Class 10',
  //         'description': 'Class 10',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class11',
  //         'code': 'class11',
  //         'translations': null,
  //         'name': 'Class 11',
  //         'description': 'Class 11',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //       {
  //         'identifier': 'ekstep_ncert_k-12_gradelevel_class12',
  //         'code': 'class12',
  //         'translations': null,
  //         'name': 'Class 12',
  //         'description': 'Class 12',
  //         'index': 0,
  //         'category': 'gradeLevel',
  //         'status': 'Live'
  //       },
  //     ],
  //     'identifier': 'ekstep_ncert_k-12_board_ncert',
  //     'code': 'ncert',
  //     'translations': null,
  //     'name': 'NCERT',
  //     'description': 'NCERT',
  //     'index': 1,
  //     'category': 'board',
  //     'status': 'Live'
  //   }
  // ],
  //   'translations': null,
  //   'status': 'Live'
  // },
  // {
  //   'code': 'medium',
  //   'dataType': 'list',
  //   'description': '',
  //   'editable': true,
  //   'index': 3,
  //   'depends': [
  //       'gradeLevel',
  //       'subject',
  //       'topic'
  //   ],
  //   'inputType': 'select',
  //   'label': 'medium',
  //   'name': 'medium',
  //   'placeholder': 'Select Medium',
  //   'renderingHints': {},
  //   'required': true,
  //   'visible': true,
  //   'identifier': 'ekstep_ncert_k-12_medium',
  //   'terms': [
  //     {
  //       'associations': [
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class1',
  //           'code': 'class1',
  //           'translations': null,
  //           'name': 'Class 1',
  //           'description': 'Class 1',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         },
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class2',
  //           'name': 'Class 2',
  //           'status': 'Live',
  //           'code': 'class2',
  //           'description': 'Class 2',
  //           'translations': null,
  //           'index': 0,
  //           'category': 'gradeLevel'
  //         },
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class3',
  //           'code': 'class3',
  //           'translations': null,
  //           'name': 'Class 3',
  //           'description': 'Class 3',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         }
  //       ],
  //       'identifier': 'ekstep_ncert_k-12_medium_english',
  //       'code': 'english',
  //       'translations': null,
  //       'name': 'English',
  //       'description': 'English',
  //       'index': 1,
  //       'category': 'medium',
  //       'status': 'Live'
  //     },
  //     {
  //       'associations': [
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class4',
  //           'code': 'class4',
  //           'translations': null,
  //           'name': 'Class 4',
  //           'description': 'Class 4',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         },
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class5',
  //           'code': 'class5',
  //           'translations': null,
  //           'name': 'Class 5',
  //           'description': 'Class 5',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         },
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class6',
  //           'code': 'class6',
  //           'translations': null,
  //           'name': 'Class 6',
  //           'description': 'Class 6',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         }
  //       ],
  //       'identifier': 'ekstep_ncert_k-12_medium_hindi',
  //       'code': 'hindi',
  //       'translations': null,
  //       'name': 'Hindi',
  //       'description': 'Hindi',
  //       'index': 2,
  //       'category': 'medium',
  //       'status': 'Live'
  //     },
  //     {
  //       'associations': [
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class7',
  //           'code': 'class7',
  //           'translations': null,
  //           'name': 'Class 7',
  //           'description': 'Class 7',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         },
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class8',
  //           'code': 'class8',
  //           'translations': null,
  //           'name': 'Class 8',
  //           'description': 'Class 8',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         },
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class9',
  //           'code': 'class9',
  //           'translations': null,
  //           'name': 'Class 9',
  //           'description': 'Class 9',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         },
  //       ],
  //       'identifier': 'ekstep_ncert_k-12_medium_sanskrit',
  //       'code': 'sanskrit',
  //       'translations': null,
  //       'name': 'Sanskrit',
  //       'description': 'Sanskrit',
  //       'index': 12,
  //       'category': 'medium',
  //       'status': 'Live'
  //     },
  //     {
  //       'associations': [
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class10',
  //           'code': 'class10',
  //           'translations': null,
  //           'name': 'Class 10',
  //           'description': 'Class 10',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         },
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class11',
  //           'code': 'class11',
  //           'translations': null,
  //           'name': 'Class 11',
  //           'description': 'Class 11',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         },
  //         {
  //           'identifier': 'ekstep_ncert_k-12_gradelevel_class12',
  //           'code': 'class12',
  //           'translations': null,
  //           'name': 'Class 12',
  //           'description': 'Class 12',
  //           'index': 0,
  //           'category': 'gradeLevel',
  //           'status': 'Live'
  //         }
  //       ],
  //       'identifier': 'ekstep_ncert_k-12_medium_urdu',
  //       'code': 'urdu',
  //       'translations': null,
  //       'name': 'Urdu',
  //       'description': 'Urdu',
  //       'index': 13,
  //       'category': 'medium',
  //       'status': 'Live'
  //     }
  //   ],
  //   'translations': null,
  //   'association': true,
  //   'status': 'Live',
  //   'type': 'select',
  //   'templateOptions': {
  //     'placeHolder': 'Select Category',
  //     'multiple': false,
  //   },
  //   'validations': [{
  //     'type': 'required'
  //   }]
  // },
  // {
  //   'code': 'gradeLevel',
  //   'dataType': 'list',
  //   'description': 'Class',
  //   'editable': true,
  //   'index': 4,
  //   'depends': [
  //       'subject',
  //       'topic'
  //   ],
  //   'inputType': 'select',
  //   'label': 'Class',
  //   'name': 'Class',
  //   'placeholder': 'Select Class',
  //   'renderingHints': {},
  //   'required': true,
  //   'visible': true,
  //   'identifier': 'ekstep_ncert_k-12_gradelevel',
  //   'terms': [
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class1',
  //       'code': 'class1',
  //       'translations': null,
  //       'name': 'Class 1',
  //       'description': 'Class 1',
  //       'index': 1,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class2',
  //       'code': 'class2',
  //       'translations': null,
  //       'name': 'Class 2',
  //       'description': 'Class 2',
  //       'index': 2,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class3',
  //       'code': 'class3',
  //       'translations': null,
  //       'name': 'Class 3',
  //       'description': 'Class 3',
  //       'index': 3,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class4',
  //       'code': 'class4',
  //       'translations': null,
  //       'name': 'Class 4',
  //       'description': 'Class 4',
  //       'index': 4,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class5',
  //       'code': 'class5',
  //       'translations': null,
  //       'name': 'Class 5',
  //       'description': 'Class 5',
  //       'index': 5,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class6',
  //       'code': 'class6',
  //       'translations': null,
  //       'name': 'Class 6',
  //       'description': 'Class 6',
  //       'index': 6,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class7',
  //       'code': 'class7',
  //       'translations': null,
  //       'name': 'Class 7',
  //       'description': 'Class 7',
  //       'index': 7,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class8',
  //       'code': 'class8',
  //       'translations': null,
  //       'name': 'Class 8',
  //       'description': 'Class 8',
  //       'index': 8,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class9',
  //       'code': 'class9',
  //       'translations': null,
  //       'name': 'Class 9',
  //       'description': 'Class 9',
  //       'index': 9,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class10',
  //       'code': 'class10',
  //       'translations': null,
  //       'name': 'Class 10',
  //       'description': 'Class 10',
  //       'index': 10,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class11',
  //       'code': 'class11',
  //       'translations': null,
  //       'name': 'Class 11',
  //       'description': 'Class 11',
  //       'index': 11,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     },
  //     {
  //       'identifier': 'ekstep_ncert_k-12_gradelevel_class12',
  //       'code': 'class12',
  //       'translations': null,
  //       'name': 'Class 12',
  //       'description': 'Class 12',
  //       'index': 12,
  //       'category': 'gradeLevel',
  //       'status': 'Live'
  //     }
  //   ],
  //   'translations': null,
  //   'status': 'Live',
  //   'association': true,
  //   'validation': [{
  //     'type': 'max',
  //     'message': 'Input is Exceeded',
  //     'value': '1000'
  //   }]
  // },
  // {
  //   'code': 'primaryCategory',
  //   'dataType': 'text',
  //   'description': 'Collection Type',
  //   'depends': [
  //     'additionalCategories'
  //   ],
  //   'editable': false,
  //   'index': 0,
  //   'inputType': 'select',
  //   'label': 'Collection Type',
  //   'name': 'Collection Type',
  //   'placeholder': '',
  //   'required': true,
  //   'visible': true,
  //   'range': [
  //     {
  //         'value': 'andhra',
  //         'label': 'andhra'
  //     },
  //     {
  //         'value': 'karnataka',
  //         'label': 'karnataka'
  //     }
  // ],
  // },
  // {
  //   'code': 'additionalCategories',
  //   'dataType': 'text',
  //   'description': 'Additonal Category of the Content',
  //   'editable': true,
  //   'index': 5,
  //   'inputType': 'select',
  //   'label': 'Additional Category',
  //   'name': 'Additional Category',
  //   'placeholder': 'Select Additional Category',
  //   'renderingHints': {

  //   },
  //   'range': '',
  //   'required': false,
  //   'visible': true
  // },
  // {
  //   'code': 'licenseTerms',
  //   'dataType': 'text',
  //   'description': 'licenseTerms',
  //   'editable': true,
  //   'index': 5,
  //   'inputType': 'select',
  //   'label': 'licenseTerms',
  //   'name': 'licenseTerms',
  //   'placeholder': 'Select licenseTerms',
  //   'renderingHints': {

  //   },
  //   'range': '',
  //   'required': false,
  //   'visible': true
  // },
];


export const formConfigWithClass = [
  {
    'name': '',
    'fields': [{
      'code': 'appicon',
      'visible': true,
      'editable': true,
      'dataType': 'url',
      'renderingHints': {
        'class': 'col-start-1 col-end-2'
      },
      'name': 'Icon',
      'description': 'Icon',
      'index': 0,
      'inputType': 'file',
      'label': 'Icon',
      'placeholder': 'Icon',
      'required': true
    },
    {
      'code': 'name',
      'visible': true,
      'editable': true,
      'dataType': 'text',
      'renderingHints': {
        'class': 'col-span-2'
      },
      'name': 'Name',
      'description': 'Name of the content',
      'inputType': 'text',
      'index': 1,
      'label': 'Name',
      'placeholder': 'Name',
      'required': true,
      'validation': [{
        'type': 'max',
        'message': 'Input is Exceded',
        'value': '120'
      }]
    }, {
      'code': 'description',
      'visible': true,
      'editable': true,
      'dataType': 'text',
      'renderingHints': {
        'class': 'col-span-2'
      },
      'name': 'Description',
      'index': 2,
      'description': 'Brief description',
      'inputType': 'textarea',
      'label': 'Description',
      'placeholder': 'Description',
      'required': false,
      'validation': [{
        'type': 'max',
        'message': 'Input is Exceded',
        'value': '1000'
      }],
      'section': {
        'index': 1,
        'name': ''
      }
    }, {
      'code': 'keywords',
      'visible': true,
      'editable': true,
      'dataType': 'list',
      'name': 'Keywords',
      'renderingHints': {
        'class': 'col-span-2'
      },
      'index': 3,
      'description': 'Keywords for the content',
      'inputType': 'keywordsuggestion',
      'label': 'keywords',
      'placeholder': 'Enter Keywords',
      'required': false,
      'section': {
        'index': 1,
        'name': ''
      }
    }, {
      'code': 'primaryCategory',
      'dataType': 'text',
      'description': 'Collection Type',
      'editable': false,
      'index': 4,
      'renderingHints': {

      },
      'inputType': 'text',
      'label': 'Collection Type',
      'name': 'Collection Type',
      'placeholder': '',
      'required': true,
      'visible': true,
      'section': {
        'index': 2,
        'name': ''
      }
    }, {
      'code': 'additionalCategories',
      'dataType': 'list',
      'description': 'Additonal Category of the Content',
      'editable': true,
      'index': 5,
      'inputType': 'multiselect',
      'label': 'Additional Category',
      'name': 'Additional Category',
      'placeholder': 'Select Additional Category',
      'renderingHints': {

      },
      'range': [
        'Classroom Teaching Video',
        'Concept Map',
        'Curiosity Question Set',
        'Textbook',
        'Experiential Resource',
        'Explanation Video',
        'Focus Spot',
        'Learning Outcome Definition',
        'Marking Scheme Rubric',
        'Pedagogy Flow',
        'Lesson Plan',
        'Previous Board Exam Papers',
        'TV Lesson'
      ],
      'required': false,
      'visible': true,
      'section': {
        'index': 2,
        'name': ''
      }
    }, {
      'code': 'board',
      'visible': true,
      'depends': ['gradeLevel', 'medium', 'subject', 'topic'],
      'editable': true,
      'dataType': 'text',
      'renderingHints': {

      },
      'description': 'Board',
      'index': 6,
      'label': 'Board/Syllabus',
      'required': true,
      'name': 'Board/Syllabus',
      'inputType': 'select',
      'placeholder': 'Select Board/Syllabus',
      'section': {
        'index': 3,
        'name': ''
      }
    }, {
      'code': 'medium',
      'visible': true,
      'depends': ['gradeLevel', 'subject', 'topic'],
      'editable': true,
      'dataType': 'list',
      'renderingHints': {

      },
      'description': '',
      'index': 7,
      'label': 'Medium',
      'required': true,
      'name': 'Medium',
      'inputType': 'multiselect',
      'placeholder': 'Select Medium',
      'section': {
        'index': 3,
        'name': ''
      }
    }, {
      'code': 'gradeLevel',
      'visible': true,
      'depends': ['subject', 'topic'],
      'editable': true,
      'dataType': 'list',
      'renderingHints': {

      },
      'description': 'Class',
      'index': 8,
      'label': 'Class',
      'required': true,
      'name': 'Class',
      'inputType': 'multiselect',
      'placeholder': 'Select Class',
      'section': {
        'index': 3,
        'name': ''
      }
    }, {
      'code': 'subject',
      'visible': true,
      'depends': ['topic'],
      'editable': true,
      'dataType': 'list',
      'renderingHints': {

      },
      'description': '',
      'index': 9,
      'label': 'Subject',
      'required': true,
      'name': 'Subject',
      'inputType': 'multiselect',
      'placeholder': 'Select Subject',
      'section': {
        'index': 3,
        'name': ''
      }
    }, {
      'code': 'dialcode',
      'visible': true,
      'editable': true,
      'dataType': 'list',
      'renderingHints': {},
      'name': 'QR Code',
      'description': 'QR Code',
      'index': 10,
      'inputType': 'dialcode',
      'label': 'QR Code',
      'placeholder': 'Enter QR Code',
      'required': false,
      'section': {
        'index': 3,
        'name': ''
      }
    }, {
      'code': 'topic',
      'visible': true,
      'editable': true,
      'dataType': 'list',
      'renderingHints': {},
      'name': 'Topic',
      'description': 'Choose a Topics',
      'index': 11,
      'inputType': 'topicselector',
      'label': 'Topics',
      'placeholder': 'Choose Topics',
      'required': false,
      'section': {
        'index': 3,
        'name': ''
      }
    }, {
      'code': 'year',
      'visible': true,
      'editable': false,
      'dataType': 'text',
      'renderingHints': {},
      'name': 'Year',
      'description': '',
      'index': 12,
      'inputType': 'select',
      'label': 'Year',
      'placeholder': 'Select Year',
      'required': false,
      'section': {
        'index': 4,
        'name': ''
      }
    }, {
      'code': 'publisher',
      'visible': true,
      'editable': true,
      'dataType': 'text',
      'renderingHints': {},
      'description': 'Publication',
      'index': 12,
      'label': 'Publisher',
      'required': false,
      'name': 'Publisher',
      'inputType': 'text',
      'placeholder': 'Publication',
      'validation': [{
        'type': 'max',
        'message': 'Input is exceded',
        'value': '180'
      }],
      'section': {
        'index': 4,
        'name': ''
      }
    }, {
      'code': 'audience',
      'visible': true,
      'editable': false,
      'dataType': 'list',
      'renderingHints': {},
      'description': '',
      'index': 14,
      'range': ['Student', 'Teacher', 'Administrator'],
      'label': 'Audience',
      'required': false,
      'name': 'Audience',
      'inputType': 'multiselect',
      'placeholder': 'Select Audience',
      'section': {
        'index': 4,
        'name': ''
      }
    }, {
      'code': 'author',
      'visible': true,
      'editable': true,
      'dataType': 'text',
      'renderingHints': {},
      'name': 'Author',
      'description': 'Original Author',
      'index': 15,
      'inputType': 'text',
      'label': 'Original Author',
      'placeholder': 'Author',
      'required': false,
      'section': {
        'index': 4,
        'name': ''
      }
    }, {
      'code': 'attributions',
      'visible': true,
      'editable': true,
      'dataType': 'list',
      'renderingHints': {},
      'name': 'attribution',
      'description': 'Attributions',
      'index': 16,
      'inputType': 'text',
      'label': 'Attributions',
      'placeholder': 'Attributions',
      'required': false,
      'section': {
        'index': 4,
        'name': ''
      }
    }, {
      'code': 'copyright',
      'visible': true,
      'editable': true,
      'dataType': 'text',
      'renderingHints': {},
      'name': 'Copyright',
      'description': 'Copyright',
      'index': 17,
      'inputType': 'text',
      'label': 'Copyright',
      'placeholder': 'Copyright',
      'required': false,
      'section': {
        'index': 4,
        'name': ''
      }
    }, {
      'code': 'copyrightYear',
      'visible': true,
      'editable': true,
      'dataType': 'list',
      'renderingHints': {},
      'description': 'Year of Creation',
      'index': 18,
      'label': 'Year of Creation',
      'required': true,
      'name': 'Year of Creation',
      'inputType': 'number',
      'placeholder': 'Enter Year of Creation',
      'validation': [{
        'type': 'min',
        'message': 'Maximum length of the year should be 4',
        'value': '4'
      }, {
        'type': 'max',
        'message': 'Minimum length of the year should be 4',
        'value': '4'
      }],
      'section': {
        'index': 4,
        'name': ''
      }
    }, {
      'code': 'license',
      'visible': true,
      'editable': true,
      'dataType': 'text',
      'renderingHints': {},
      'name': 'license',
      'description': 'License of the content',
      'index': 19,
      'inputType': 'licenses',
      'label': 'license',
      'placeholder': 'license',
      'required': true,
      'section': {
        'index': 4,
        'name': ''
      }
    }, {
      'code': 'licenseterms',
      'visible': true,
      'editable': true,
      'defaultValue': 'By creating any type of content (resources, books, courses etc.) on DIKSHA, you consent to publish it under the Creative Commons License Framework. Please choose the applicable creative commons license you wish to apply to your content.',
      'dataType': 'text',
      'renderingHints': {
        'value': {
          'video/x-youtube': 'By linking or uploading YouTube videos on DIKSHA, you consent to publishing it as per the terms of the YouTube video license. DIKSHA accepts only videos with YouTube Standard License or Creative Commons License.'
        },
      },
      'description': 'licenseterms',
      'index': 20,
      'label': 'License Terms',
      'required': false,
      'name': 'licenseterms',
      'inputType': 'label',
      'placeholder': 'license',
      'section': {
        'index': 5,
        'name': ''
      }
    }]
  }
];


export const formConfigWithSection = [
  {
    'name': 'Content Details',
    'fields': [
      {
        'code': 'appicon',
        'visible': true,
        'editable': true,
        'dataType': 'url',
        'renderingHints': {
          'class': 'col-start-1 col-end-2'
        },
        'name': 'Icon',
        'description': 'Icon',
        'index': 0,
        'inputType': 'file',
        'label': 'Icon',
        'placeholder': 'Icon',
        'required': true
      },
      {
        'code': 'name',
        'visible': true,
        'editable': true,
        'dataType': 'text',
        'renderingHints': {
          'class': 'col-span-2'
        },
        'name': 'Name',
        'description': 'Name of the content',
        'inputType': 'text',
        'index': 1,
        'label': 'Name',
        'placeholder': 'Name',
        'required': true,
        'validation': [{
          'type': 'max',
          'message': 'Input is Exceded',
          'value': '120'
        }],
      },
      {
        'code': 'description',
        'visible': true,
        'editable': true,
        'dataType': 'text',
        'renderingHints': {
          'class': 'col-span-2'
        },
        'name': 'Description',
        'index': 2,
        'description': 'Brief description',
        'inputType': 'textarea',
        'label': 'Description',
        'placeholder': 'Description',
        'required': false,
        'validation': [{
          'type': 'max',
          'message': 'Input is Exceded',
          'value': '1000'
        }]
      },
      {
        'code': 'keywords',
        'visible': true,
        'editable': true,
        'dataType': 'list',
        'name': 'Keywords',
        'renderingHints': {
          'class': 'col-span-2'
        },
        'index': 3,
        'description': 'Keywords for the content',
        'inputType': 'keywordsuggestion',
        'label': 'keywords',
        'placeholder': 'Enter Keywords',
        'required': false
      },
      {
        'code': 'primaryCategory',
        'dataType': 'text',
        'description': 'Collection Type',
        'editable': false,
        'index': 4,
        'renderingHints': {

        },
        'inputType': 'text',
        'label': 'Collection Type',
        'name': 'Collection Type',
        'placeholder': '',
        'required': true,
        'visible': true
      },
      {
        'code': 'additionalCategories',
        'dataType': 'list',
        'description': 'Additonal Category of the Content',
        'editable': true,
        'index': 5,
        'inputType': 'multiselect',
        'label': 'Additional Category',
        'name': 'Additional Category',
        'placeholder': 'Select Additional Category',
        'renderingHints': {

        },
        'range': [
          {
              'value': 'andhra',
              'label': 'andhra'
          },
          {
              'value': 'karnataka',
              'label': 'karnataka'
          }
      ],
        'required': false,
        'visible': true
      },
      {
        'code': 'year',
        'visible': true,
        'editable': false,
        'dataType': 'text',
        'renderingHints': {},
        'name': 'Year',
        'description': '',
        'index': 12,
        'inputType': 'select',
        'label': 'Year',
        'placeholder': 'Select Year',
        'required': false
      },
      {
        'code': 'publisher',
        'visible': true,
        'editable': true,
        'dataType': 'text',
        'renderingHints': {},
        'description': 'Publication',
        'index': 12,
        'label': 'Publisher',
        'required': false,
        'name': 'Publisher',
        'inputType': 'text',
        'placeholder': 'Publication',
        'validation': [{
          'type': 'max',
          'message': 'Input is exceded',
          'value': '180'
        }]
      },
      {
        'code': 'audience',
        'visible': true,
        'editable': false,
        'dataType': 'list',
        'renderingHints': {},
        'description': '',
        'index': 14,
        'range': ['Student', 'Teacher', 'Administrator'],
        'label': 'Audience',
        'required': false,
        'name': 'Audience',
        'inputType': 'multiselect',
        'placeholder': 'Select Audience'
      },
      {
        'code': 'attributions',
        'visible': true,
        'editable': true,
        'dataType': 'list',
        'renderingHints': {},
        'name': 'attribution',
        'description': 'Attributions',
        'index': 16,
        'inputType': 'text',
        'label': 'Attributions',
        'placeholder': 'Attributions',
        'required': false
      },
      {
        'code': 'author',
        'visible': true,
        'editable': true,
        'dataType': 'text',
        'renderingHints': {},
        'name': 'Author',
        'description': 'Original Author',
        'index': 15,
        'inputType': 'text',
        'label': 'Original Author',
        'placeholder': 'Author',
        'required': false
      },
      {
        'code': 'copyright',
        'visible': true,
        'editable': true,
        'dataType': 'text',
        'renderingHints': {},
        'name': 'Copyright',
        'description': 'Copyright',
        'index': 17,
        'inputType': 'text',
        'label': 'Copyright',
        'placeholder': 'Copyright',
        'required': false
      },
      {
        'code': 'copyrightYear',
        'visible': true,
        'editable': true,
        'dataType': 'list',
        'renderingHints': {},
        'description': 'Year of Creation',
        'index': 18,
        'label': 'Year of Creation',
        'required': true,
        'name': 'Year of Creation',
        'inputType': 'number',
        'placeholder': 'Enter Year of Creation',
        'validation': [{
          'type': 'min',
          'message': 'Maximum length of the year should be 4',
          'value': '4'
        }, {
          'type': 'max',
          'message': 'Minimum length of the year should be 4',
          'value': '4'
        }]
      },
      {
        'code': 'license',
        'visible': true,
        'editable': true,
        'dataType': 'text',
        'renderingHints': {},
        'name': 'license',
        'description': 'License of the content',
        'index': 19,
        'inputType': 'licenses',
        'label': 'license',
        'placeholder': 'license',
        'required': true
      }, {
        'code': 'licenseterms',
        'visible': true,
        'editable': true,
        'defaultValue': 'By creating any type of content (resources, books, courses etc.) on DIKSHA, you consent to publish it under the Creative Commons License Framework. Please choose the applicable creative commons license you wish to apply to your content.',
        'dataType': 'text',
        'renderingHints': {
          'value': {
            'video/x-youtube': 'By linking or uploading YouTube videos on DIKSHA, you consent to publishing it as per the terms of the YouTube video license. DIKSHA accepts only videos with YouTube Standard License or Creative Commons License.'
          },
        },
        'description': 'licenseterms',
        'index': 20,
        'label': 'License Terms',
        'required': false,
        'name': 'licenseterms',
        'inputType': 'label',
        'placeholder': 'license'
      }
    ]
  },
  {
    'name': 'Org Framework Deatils',
    'fields': [
      {
        'code': 'board',
        'dataType': 'text',
        'description': 'Board',
        'editable': true,
        'index': 7,
        'inputType': 'select',
        'label': 'Board/Syllabus',
        'name': 'Board/Syllabus',
        'placeholder': 'Select Board/Syllabus',
        'depends': [
          'gradeLevel',
          'medium',
          'subject',
          'topic'
        ],
        'renderingHints': {
          'class': 'col-span-2'
        },
        'required': true,
        'visible': true
      },
      {
        'code': 'medium',
        'visible': true,
        'depends': ['gradeLevel', 'subject', 'topic'],
        'editable': true,
        'dataType': 'list',
        'renderingHints': {

        },
        'description': '',
        'index': 7,
        'label': 'Medium',
        'required': true,
        'name': 'Medium',
        'inputType': 'multiselect',
        'placeholder': 'Select Medium'
      },
      {
        'code': 'gradeLevel',
        'visible': true,
        'depends': ['subject', 'topic'],
        'editable': true,
        'dataType': 'list',
        'renderingHints': {

        },
        'description': 'Class',
        'index': 8,
        'label': 'Class',
        'required': true,
        'name': 'Class',
        'inputType': 'multiselect',
        'placeholder': 'Select Class'
      },
      {
        'code': 'subject',
        'visible': true,
        'depends': ['topic'],
        'editable': true,
        'dataType': 'list',
        'renderingHints': {

        },
        'description': '',
        'index': 9,
        'label': 'Subject',
        'required': true,
        'name': 'Subject',
        'inputType': 'multiselect',
        'placeholder': 'Select Subject'
      },
      {
        'code': 'topic',
        'visible': true,
        'editable': true,
        'dataType': 'list',
        'renderingHints': {},
        'name': 'Topic',
        'description': 'Choose a Topics',
        'index': 11,
        'inputType': 'topicselector',
        'label': 'Topics',
        'placeholder': 'Choose Topics',
        'required': false
      }
    ]
  },
  {
    'name': 'Target Framework Details',
    'fields': [
      {
        'code': 'board',
        'visible': true,
        'depends': ['gradeLevel', 'medium', 'subject', 'topic'],
        'editable': true,
        'dataType': 'text',
        'renderingHints': {

        },
        'description': 'Board',
        'index': 6,
        'label': 'Board/Syllabus',
        'required': true,
        'name': 'Board/Syllabus',
        'inputType': 'select',
        'placeholder': 'Select Board/Syllabus'
      },
      {
        'code': 'medium',
        'visible': true,
        'depends': ['gradeLevel', 'subject', 'topic'],
        'editable': true,
        'dataType': 'list',
        'renderingHints': {

        },
        'description': '',
        'index': 7,
        'label': 'Medium',
        'required': true,
        'name': 'Medium',
        'inputType': 'multiselect',
        'placeholder': 'Select Medium'
      },
      {
        'code': 'gradeLevel',
        'visible': true,
        'depends': ['subject', 'topic'],
        'editable': true,
        'dataType': 'list',
        'renderingHints': {

        },
        'description': 'Class',
        'index': 8,
        'label': 'Class',
        'required': true,
        'name': 'Class',
        'inputType': 'multiselect',
        'placeholder': 'Select Class'
      },
      {
        'code': 'subject',
        'visible': true,
        'depends': ['topic'],
        'editable': true,
        'dataType': 'list',
        'renderingHints': {

        },
        'description': '',
        'index': 9,
        'label': 'Subject',
        'required': true,
        'name': 'Subject',
        'inputType': 'multiselect',
        'placeholder': 'Select Subject'
      },
      {
        'code': 'topic',
        'visible': true,
        'editable': true,
        'dataType': 'list',
        'renderingHints': {},
        'name': 'Topic',
        'description': 'Choose a Topics',
        'index': 11,
        'inputType': 'topicselector',
        'label': 'Topics',
        'placeholder': 'Choose Topics',
        'required': false
      }
    ]
  }
];