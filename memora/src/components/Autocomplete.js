import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';

const config = require("../assets/destinations.json");

const filterOptions = createFilterOptions({
  ignoreCase: true,
  matchFrom: "any",
  limit: 10,
});


export default function CountrySelect({ onCountrySelect }) {
  const country_name_code = config.map((item) => {
    return {label:item.term, uid:item.uid}
  }).filter((item) => {
    return item.label != null && item.uid != null
  });

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      filterOptions={filterOptions}
      options={country_name_code}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange = {(event, newValue) => {
        if (newValue && newValue.uid) {
          onCountrySelect(newValue.uid, newValue.label);
        }
      }}

      renderOption = {(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            {...optionProps}
          >
            {option.label}
          </Box>
        );
      }}

      renderInput = {(params) => (
        <TextField
          {...params}
            label="Choose a country"
            inputProps={{
            ...params.inputProps,
            autoComplete: 'off', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}