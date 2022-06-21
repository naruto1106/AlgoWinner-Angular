agmNgModuleWrapper('agms.chart')
    .ngApp
    .constant('smartchartOptions', {
    defaultOption : {
        customClass: ['iqchart-alike'],
        rulers: {
            west: {
                style: {
                    width: '0px'
                }
            },
            east: {
                style: {
                    width: '50px',
                    height: '100%',
                    top: '0px',
                    right: '0px',
                    borderLeft: '1px solid #778'
                }
            },
            north: {
                style: {
                    height: '0px'
                }
            },
            south: {
                style: {
                    height: '50px',
                    borderTop: '1px solid #778'

                }
            }
        }
    }
});